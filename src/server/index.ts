import type { OxAccountRole, OxAccountUserMetadata } from '@communityox/ox_core';
import { CreateAccount, GetAccount, GetCharacterAccount, GetPlayer } from '@communityox/ox_core/server';
import { onClientCallback, versionCheck, checkDependency } from '@communityox/ox_lib/server';
import { oxmysql } from '@communityox/oxmysql';
import type { DateRange } from 'react-day-picker';
import type {
  AccessTableData,
  AccessTableUser,
  Account,
  DashboardData,
  Invoice,
  InvoicesFilters,
  LogsFilters,
  RawLogItem,
  Transaction,
} from '../common/typings';

versionCheck('communityox/ox_banking');

const coreDepCheck: true | [false, string] = checkDependency('ox_core', '1.1.0');

if (coreDepCheck !== true) {
  setInterval(() => {
    console.error(coreDepCheck[1]);
  }, 1000);
}

onClientCallback('ox_banking:getAccounts', async (playerId): Promise<Account[]> => {
  const player = GetPlayer(playerId);

  if (!player.charId) return;

  const accessAccounts = await oxmysql.rawExecute<OxAccountUserMetadata[]>(
    `
    SELECT DISTINCT
      COALESCE(access.role, gg.accountRole) AS role,
      account.*,
      COALESCE(c.fullName, g.label) AS ownerName
    FROM
      accounts account
    LEFT JOIN characters c ON account.owner = c.charId
    LEFT JOIN ox_groups g
      ON account.group = g.name
    LEFT JOIN character_groups cg
      ON cg.charId = ?
      AND cg.name = account.group
    LEFT JOIN ox_group_grades gg
      ON account.group = gg.group
      AND cg.grade = gg.grade
    LEFT JOIN accounts_access access
      ON account.id = access.accountId
      AND access.charId = ?
    WHERE
      account.type != 'inactive'
      AND (
        access.charId = ?
        OR (
          account.group IS NOT NULL
          AND gg.accountRole IS NOT NULL
        )
      )
    GROUP BY
      account.id
    ORDER BY
      account.owner = ? DESC,
      account.isDefault DESC
    `,
    [player.charId, player.charId, player.charId, player.charId]
  );

  const accounts: Account[] = accessAccounts.map((account) => ({
    group: account.group,
    id: account.id,
    label: account.label,
    isDefault: player.charId === account.owner ? account.isDefault : false,
    balance: account.balance,
    type: account.type,
    owner: account.ownerName,
    role: account.role,
  }));

  return accounts;
});

onClientCallback('ox_banking:createAccount', async (playerId, { name, shared }: { name: string; shared: boolean }) => {
  const { charId } = GetPlayer(playerId);

  if (!charId) return;

  const account = await CreateAccount(charId, name);

  if (shared) await account.setShared();

  return account.accountId;
});

onClientCallback('ox_banking:deleteAccount', async (playerId, accountId: number) => {
  const account = await GetAccount(accountId);
  const balance = await account?.get('balance');

  if (balance !== 0) return;

  const hasPermission = await account.playerHasPermission(playerId, 'closeAccount');

  if (!hasPermission) return;

  return await account.deleteAccount();
});

interface UpdateBalance {
  accountId: number;
  amount: number;
}

interface TransferBalance {
  fromAccountId: number;
  target: string | number;
  transferType: 'account' | 'person';
  amount: number;
}

onClientCallback('ox_banking:depositMoney', async (playerId, { accountId, amount }: UpdateBalance) => {
  const account = await GetAccount(accountId);
  return await account.depositMoney(playerId, amount);
});

onClientCallback('ox_banking:withdrawMoney', async (playerId, { accountId, amount }: UpdateBalance) => {
  const account = await GetAccount(accountId);
  return await account.withdrawMoney(playerId, amount);
});

onClientCallback(
  'ox_banking:transferMoney',
  async (playerId, { fromAccountId, target, transferType, amount }: TransferBalance) => {
    const account = await GetAccount(fromAccountId);
    const hasPermission = await account?.playerHasPermission(playerId, 'withdraw');

    if (!hasPermission) return;

    target = typeof(target) == "string" ? Number.parseInt(target) : target
    let targetAccountId = 0;

    try {
      targetAccountId =
        transferType === 'account'
          ? (await GetAccount(target as number))?.accountId
          : (await GetCharacterAccount(target))?.accountId;
    } catch (e) {
      return {
        success: false,
        message: 'account_id_not_exists',
      };
    }

    if (transferType === 'person' && !targetAccountId)
      return {
        success: false,
        message: 'state_id_not_exists',
      };

    if (!targetAccountId)
      return {
        success: false,
        message: 'account_id_not_exists',
      };

    if (account.accountId === targetAccountId)
      return {
        success: false,
        message: 'same_account_transfer',
      };

    const player = GetPlayer(playerId);
    return await account.transferBalance({
      toId: targetAccountId,
      amount: amount,
      actorId: player.charId,
    });
  }
);

onClientCallback('ox_banking:getDashboardData', async (playerId): Promise<DashboardData> => {
  const account = await GetPlayer(playerId)?.getAccount();

  if (!account) return;

  const overview = await oxmysql.rawExecute<
    {
      day: string;
      income: number;
      expenses: number;
    }[]
  >(
    `
    SELECT
      LOWER(DAYNAME(d.date)) as day,
      CAST(COALESCE(SUM(CASE WHEN at.toId = ? THEN at.amount ELSE 0 END), 0) AS UNSIGNED) as income,
      CAST(COALESCE(SUM(CASE WHEN at.fromId = ? THEN at.amount ELSE 0 END), 0) AS UNSIGNED) as expenses
    FROM (
      SELECT CURDATE() as date
      UNION ALL SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      UNION ALL SELECT DATE_SUB(CURDATE(), INTERVAL 2 DAY)
      UNION ALL SELECT DATE_SUB(CURDATE(), INTERVAL 3 DAY)
      UNION ALL SELECT DATE_SUB(CURDATE(), INTERVAL 4 DAY)
      UNION ALL SELECT DATE_SUB(CURDATE(), INTERVAL 5 DAY)
      UNION ALL SELECT DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    ) d
    LEFT JOIN accounts_transactions at ON d.date = DATE(at.date) AND (at.toId = ? OR at.fromId = ?)
    GROUP BY d.date
    ORDER BY d.date ASC
    `,
    [account.accountId, account.accountId, account.accountId, account.accountId]
  );

  const transactions = await oxmysql.rawExecute<Transaction[]>(
    `
    SELECT id, amount, UNIX_TIMESTAMP(date) as date, toId, fromId, message,
    CASE
      WHEN toId = ? THEN 'inbound'
      ELSE 'outbound'
    END AS 'type'
    FROM accounts_transactions
    WHERE toId = ? OR fromId = ?
    ORDER BY id DESC
    LIMIT 5
    `,
    [account.accountId, account.accountId, account.accountId]
  );

  const invoices = await oxmysql.rawExecute<Invoice[]>(
    `
     SELECT ai.id, ai.amount, UNIX_TIMESTAMP(ai.dueDate) as dueDate, UNIX_TIMESTAMP(ai.paidAt) as paidAt, CONCAT(a.label, ' - ', IFNULL(co.fullName, g.label)) AS label,
     CASE
        WHEN ai.payerId IS NOT NULL THEN 'paid'
        WHEN NOW() > ai.dueDate THEN 'overdue'
        ELSE 'unpaid'
     END AS status
     FROM accounts_invoices ai
     LEFT JOIN accounts a ON a.id = ai.fromAccount
     LEFT JOIN characters co ON (a.owner IS NOT NULL AND co.charId = a.owner)
     LEFT JOIN ox_groups g ON (a.owner IS NULL AND g.name = a.group)
     WHERE ai.toAccount = ?
     ORDER BY ai.id DESC
     LIMIT 5
     `,
    [account.accountId]
  );

  return {
    balance: await account.get('balance'),
    overview,
    transactions,
    invoices,
  };
});

onClientCallback(
  'ox_banking:getAccountUsers',
  async (
    playerId,
    {
      accountId,
      page,
      search,
    }: {
      accountId: number;
      page: number;
      search?: string;
    }
  ): Promise<AccessTableData> => {
    const account = await GetAccount(accountId);
    const hasPermission = await account?.playerHasPermission(playerId, 'manageUser');

    if (!hasPermission) return;

    const wildcard = sanitizeSearch(search);
    let searchStr = '';

    const accountGroup = await account.get('group');

    const queryParams: any[] = [accountId];

    if (wildcard) {
      searchStr += 'AND MATCH(c.fullName) AGAINST (? IN BOOLEAN MODE)';
      queryParams.push(wildcard);
    }

    if (accountGroup) {
      const params: any[] = [accountGroup];

      const usersQuery = `
        SELECT c.stateId, c.fullName AS name, gg.accountRole AS role FROM character_groups cg
        LEFT JOIN accounts a ON cg.name = a.group
        LEFT JOIN characters c ON c.charId = cg.charId
        LEFT JOIN ox_group_grades gg ON (cg.name = gg.group AND cg.grade = gg.grade)
        WHERE cg.name = ? ${searchStr}
        ORDER BY role DESC
        LIMIT 12
        OFFSET ?
      `;

      const countQuery = `
        SELECT COUNT(*) FROM character_groups cg
        LEFT JOIN accounts a ON cg.name = a.group
        LEFT JOIN characters c ON c.charId = cg.charId
        LEFT JOIN ox_group_grades gg ON (cg.name = gg.group AND cg.grade = gg.grade)
        WHERE cg.name = ?
      `;

      const count = await oxmysql.prepare(countQuery, params);

      if (wildcard) params.push(wildcard);
      params.push(page * 12);

      const users = await oxmysql.rawExecute<AccessTableUser[]>(usersQuery, params);

      return {
        numberOfPages: count,
        users,
      };
    }

    const usersCount = await oxmysql.prepare<number>(
      `SELECT COUNT(*) FROM \`accounts_access\` aa LEFT JOIN characters c ON c.charId = aa.charId WHERE accountId = ? ${searchStr}`,
      queryParams
    );

    queryParams.push(page * 12);

    const users = usersCount
      ? await oxmysql.rawExecute<AccessTableData['users']>(
          `
      SELECT c.stateId, a.role, c.fullName AS \`name\` FROM \`accounts_access\` a
      LEFT JOIN \`characters\` c ON c.charId = a.charId
      WHERE a.accountId = ?
      ${searchStr}
      ORDER BY a.role DESC
      LIMIT 12
      OFFSET ?
      `,
          queryParams
        )
      : [];

    return {
      numberOfPages: Math.ceil(usersCount / 12) || 1,
      users,
    };
  }
);

onClientCallback(
  'ox_banking:addUserToAccount',
  async (
    playerId,
    {
      accountId,
      stateId,
      role,
    }: {
      accountId: number;
      stateId: string;
      role: OxAccountRole;
    }
  ) => {
    const account = await GetAccount(accountId);
    const hasPermission = await account?.playerHasPermission(playerId, 'addUser');

    if (!hasPermission) return false;

    const currentRole = await account.getCharacterRole(stateId);

    if (currentRole) return { success: false, message: 'invalid_input' };

    return (await account.setCharacterRole(stateId, role)) || { success: false, message: 'state_id_not_exists' };
  }
);

onClientCallback(
  'ox_banking:manageUser',
  async (
    playerId,
    {
      accountId,
      targetStateId,
      values,
    }: {
      accountId: number;
      targetStateId: string;
      values: { role: OxAccountRole };
    }
  ) => {
    const account = await GetAccount(accountId);
    const hasPermission = await account?.playerHasPermission(playerId, 'manageUser');

    if (!hasPermission) return false;

    return await account.setCharacterRole(targetStateId, values.role);
  }
);

onClientCallback(
  'ox_banking:removeUser',
  async (playerId, { targetStateId, accountId }: { targetStateId: string; accountId: number }) => {
    const account = await GetAccount(accountId);
    const hasPermission = await account?.playerHasPermission(playerId, 'removeUser');

    if (!hasPermission) return false;

    return await account.setCharacterRole(targetStateId, null);
  }
);

onClientCallback(
  'ox_banking:transferOwnership',
  async (
    playerId,
    {
      targetStateId,
      accountId,
    }: {
      targetStateId: string;
      accountId: number;
    }
  ): Promise<{ success: boolean; message?: string }> => {
    const account = await GetAccount(accountId);
    const hasPermission = await account?.playerHasPermission(playerId, 'transferOwnership');

    if (!hasPermission)
      return {
        success: false,
        message: 'no_permission',
      };

    const targetCharId = await oxmysql.prepare<number | null>('SELECT `charId` FROM `characters` WHERE `stateId` = ?', [
      targetStateId,
    ]);

    if (!targetCharId)
      return {
        success: false,
        message: 'state_id_not_exists',
      };

    const accountOwner = await account.get('owner');

    if (accountOwner === targetCharId)
      return {
        success: false,
        message: 'invalid_input',
      };

    const player = GetPlayer(playerId);

    await oxmysql.prepare(
      "INSERT INTO `accounts_access` (`accountId`, `charId`, `role`) VALUES (?, ?, 'owner') ON DUPLICATE KEY UPDATE `role` = 'owner'",
      [accountId, targetCharId]
    );

    await oxmysql.prepare('UPDATE `accounts` SET `owner` = ? WHERE `id` = ?', [targetCharId, accountId]);
    await oxmysql.prepare("UPDATE `accounts_access` SET `role` = 'manager' WHERE `accountId` = ? AND `charId` = ?", [
      accountId,
      player.charId,
    ]);

    return {
      success: true,
    };
  }
);

onClientCallback(
  'ox_banking:renameAccount',
  async (playerId, { accountId, name }: { accountId: number; name: string }) => {
    const account = await GetAccount(accountId);
    const hasPermission = await account?.playerHasPermission(playerId, 'manageAccount');

    if (!hasPermission) return;

    await oxmysql.prepare('UPDATE `accounts` SET `label` = ? WHERE `id` = ?', [name, accountId]);

    return true;
  }
);

onClientCallback('ox_banking:convertAccountToShared', async (playerId, { accountId }: { accountId: number }) => {
  const player = GetPlayer(playerId);

  if (!player.charId) return;

  const account = await GetAccount(accountId);

  if (!account) return;

  const { type, owner } = await account.get(['type', 'owner']);

  if (type !== 'personal' || owner !== player.charId) return;

  return await account.setShared();
});

onClientCallback(
  'ox_banking:getLogs',
  async (playerId, { accountId, filters }: { accountId: number; filters: LogsFilters }) => {
    const account = await GetAccount(accountId);
    const hasPermission = await account?.playerHasPermission(playerId, 'viewHistory');

    if (!hasPermission) return;

    const search = sanitizeSearch(filters.search);

    let dateSearchString = '';
    let queryParams: any[] = [accountId, accountId, accountId, accountId, accountId, accountId, accountId, accountId];

    let typeQueryString = ``;

    let queryWhere = `WHERE (at.fromId = ? OR at.toId = ?)`;

    if (search) {
      queryWhere +=
        ' AND (MATCH(c.fullName) AGAINST (? IN BOOLEAN MODE) OR MATCH(at.message) AGAINST (? IN BOOLEAN MODE)) ';
      queryParams.push(search, search);
    }

    if (filters.type && filters.type !== 'combined') {
      typeQueryString += 'AND (';
      filters.type === 'outbound' ? (typeQueryString += 'at.fromId = ?)') : (typeQueryString += 'at.toId = ?)');

      queryParams.push(accountId);
    }

    if (filters.date) {
      const date = getFormattedDates(filters.date);

      dateSearchString = `AND (DATE(at.date) BETWEEN ? AND ?)`;
      queryParams.push(date.from, date.to);
    }

    queryWhere += `${typeQueryString} ${dateSearchString}`;

    const countQueryParams = [...queryParams].slice(2, queryParams.length);

    queryParams.push(filters.page * 6);

    const queryData = await oxmysql
      .rawExecute<RawLogItem[]>(
        `
          SELECT
            at.id,
            at.fromId,
            at.toId,
            at.message,
            at.amount,
            CONCAT(fa.id, ' - ', IFNULL(cf.fullName, ogf.label)) AS fromAccountLabel,
            CONCAT(ta.id, ' - ', IFNULL(ct.fullName, ogt.label)) AS toAccountLabel,
            UNIX_TIMESTAMP(at.date) AS date,
            c.fullName AS name,
            CASE
              WHEN at.toId = ? THEN 'inbound'
              ELSE 'outbound'
            END AS 'type',
            CASE
                WHEN at.toId = ? THEN at.toBalance
                ELSE at.fromBalance
            END AS newBalance
          FROM accounts_transactions at
          LEFT JOIN characters c ON c.charId = at.actorId
          LEFT JOIN accounts ta ON ta.id = at.toId
          LEFT JOIN accounts fa ON fa.id = at.fromId
          LEFT JOIN characters ct ON (ta.owner IS NOT NULL AND at.fromId = ? AND ct.charId = ta.owner)
          LEFT JOIN characters cf ON (fa.owner IS NOT NULL AND at.toId = ? AND cf.charId = fa.owner)
          LEFT JOIN ox_groups ogt ON (ta.owner IS NULL AND at.fromId = ? AND ogt.name = ta.group)
          LEFT JOIN ox_groups ogf ON (fa.owner IS NULL AND at.toId = ? AND ogf.name = fa.group)
          ${queryWhere}
          ORDER BY at.id DESC
          LIMIT 6
          OFFSET ?
        `,
        queryParams
      )
      .catch((e) => console.log(e));

    const totalLogsCount = await oxmysql
      .prepare(
        `
          SELECT COUNT(*)
          FROM accounts_transactions at
          LEFT JOIN characters c ON c.charId = at.actorId
          LEFT JOIN accounts ta ON ta.id = at.toId
          LEFT JOIN accounts fa ON fa.id = at.fromId
          LEFT JOIN characters ct ON (ta.owner IS NOT NULL AND at.fromId = ? AND ct.charId = ta.owner)
          LEFT JOIN characters cf ON (fa.owner IS NOT NULL AND at.toId = ? AND cf.charId = fa.owner)
          LEFT JOIN ox_groups ogt ON (ta.owner IS NULL AND at.fromId = ? AND ogt.name = ta.group)
          LEFT JOIN ox_groups ogf ON (fa.owner IS NULL AND at.toId = ? AND ogf.name = fa.group)
          ${queryWhere}
        `,
        countQueryParams
      )
      .catch((e) => console.log(e));

    return {
      numberOfPages: Math.ceil(totalLogsCount / 6),
      logs: queryData,
    };
  }
);

onClientCallback(
  'ox_banking:getInvoices',
  async (playerId, { accountId, filters }: { accountId: number; filters: InvoicesFilters }) => {
    const account = await GetAccount(accountId);
    const hasPermission = await account?.playerHasPermission(playerId, 'payInvoice');

    if (!hasPermission) return;

    const search = sanitizeSearch(filters.search);

    let queryParams: any[] = [];

    let dateSearchString = '';
    let columnSearchString = '';
    let typeSearchString = '';

    let query = '';
    let queryJoins = '';

    switch (filters.type) {
      case 'unpaid':
        typeSearchString = '(ai.toAccount = ? AND ai.paidAt IS NULL)';

        queryParams.push(accountId);

        if (search) {
          columnSearchString =
            'AND (MATCH(a.label) AGAINST (? IN BOOLEAN MODE) OR MATCH(ai.message) AGAINST (? IN BOOLEAN MODE))';
          queryParams.push(search, search);
        }

        queryJoins = `
        LEFT JOIN accounts a ON ai.fromAccount = a.id
        LEFT JOIN characters c ON ai.actorId = c.charId
        LEFT JOIN characters co ON (a.owner IS NOT NULL AND co.charId = a.owner)
        LEFT JOIN ox_groups g ON (a.owner IS NULL AND g.name = a.group)
      `;

        query = `
          SELECT
            ai.id,
            c.fullName as sentBy,
            CONCAT(a.id, ' - ', IFNULL(co.fullName, g.label)) AS label,
            ai.amount,
            ai.message,
            UNIX_TIMESTAMP(ai.sentAt) AS sentAt,
            UNIX_TIMESTAMP(ai.dueDate) as dueDate,
            'unpaid' AS type
          FROM accounts_invoices ai
          ${queryJoins}
      `;

        break;
      case 'paid':
        typeSearchString = '(ai.toAccount = ? AND ai.paidAt IS NOT NULL)';

        queryParams.push(accountId);

        if (search) {
          columnSearchString = `AND (MATCH(c.fullName) AGAINST (? IN BOOLEAN MODE) OR MATCH(ai.message) AGAINST (? IN BOOLEAN MODE) OR MATCH(a.label) AGAINST (? IN BOOLEAN MODE))`;
          queryParams.push(search, search, search);
        }

        queryJoins = `
        LEFT JOIN accounts a ON ai.fromAccount = a.id
        LEFT JOIN characters c ON ai.payerId = c.charId
        LEFT JOIN characters ca ON ai.actorId = ca.charId
        LEFT JOIN characters co ON (a.owner IS NOT NULL AND co.charId = a.owner)
        LEFT JOIN ox_groups g ON (a.owner IS NULL AND g.name = a.group)
      `;

        query = `
        SELECT
          ai.id,
          c.fullName as paidBy,
          ca.fullName as sentBy,
          CONCAT(a.id, ' - ', IFNULL(co.fullName, g.label)) AS label,
          ai.amount,
          ai.message,
          UNIX_TIMESTAMP(ai.sentAt) AS sentAt,
          UNIX_TIMESTAMP(ai.dueDate) AS dueDate,
          UNIX_TIMESTAMP(ai.paidAt) AS paidAt,
          'paid' AS type
        FROM accounts_invoices ai
        ${queryJoins}
      `;

        break;
      case 'sent':
        typeSearchString = '(ai.fromAccount = ?)';

        queryParams.push(accountId);

        if (search) {
          columnSearchString = `AND (MATCH(c.fullName) AGAINST (? IN BOOLEAN MODE) OR MATCH (ai.message) AGAINST (? IN BOOLEAN MODE) OR MATCH (a.label) AGAINST (? IN BOOLEAN MODE))`;
          queryParams.push(search, search, search);
        }

        queryJoins = `
        LEFT JOIN accounts a ON ai.toAccount = a.id
        LEFT JOIN characters c ON ai.actorId = c.charId
        LEFT JOIN characters co ON (a.owner IS NOT NULL AND co.charId = a.owner)
        LEFT JOIN ox_groups g ON (a.owner IS NULL AND g.name = a.group)
      `;

        query = `
        SELECT
          ai.id,
          c.fullName as sentBy,
          CONCAT(a.id, ' - ', IFNULL(co.fullName, g.label)) AS label,
          ai.amount,
          ai.message,
          UNIX_TIMESTAMP(ai.sentAt) AS sentAt,
          UNIX_TIMESTAMP(ai.dueDate) AS dueDate,
          CASE
            WHEN ai.payerId IS NOT NULL THEN 'paid'
            WHEN NOW() > ai.dueDate THEN 'overdue'
            ELSE 'sent'
          END AS status,
          'sent' AS type
        FROM accounts_invoices ai
        ${queryJoins}
      `;

        break;
    }

    if (filters.date) {
      const date = getFormattedDates(filters.date);
      const dateCol = filters.type === 'unpaid' ? 'ai.dueDate' : filters.type === 'paid' ? 'ai.paidAt' : 'ai.sentAt';

      dateSearchString = `AND (DATE(${dateCol}) BETWEEN ? AND ?)`;
      queryParams.push(date.from, date.to);
    }

    const whereStatement = `WHERE ${typeSearchString} ${columnSearchString} ${dateSearchString}`;

    queryParams.push(filters.page * 6);

    const result = await oxmysql
      .rawExecute(
        `
    ${query}
    ${whereStatement}
    ORDER BY ai.id DESC
    LIMIT 6
    OFFSET ?
  `,
        queryParams
      )
      .catch((e) => console.log(e));

    queryParams.pop();
    const totalInvoices = await oxmysql
      .prepare(
        `
        SELECT COUNT(*)
        FROM accounts_invoices ai
        ${queryJoins}
        ${whereStatement}`,
        queryParams
      )
      .catch((e) => console.log(e));
    const numberOfPages = Math.ceil(totalInvoices / 6);

    return {
      invoices: result,
      numberOfPages,
    };
  }
);

onClientCallback('ox_banking:payInvoice', async (playerId, data: { invoiceId: number }) => {
  const player = GetPlayer(playerId);

  if (!player.charId) return;

  return await player.payInvoice(data.invoiceId);
});

function getFormattedDates(date: DateRange) {
  const rawDates = {
    from: new Date(date.from),
    to: new Date(date.to ?? date.from),
  };

  const formattedDates = {
    from: new Date(
      Date.UTC(rawDates.from.getFullYear(), rawDates.from.getMonth(), rawDates.from.getDate(), 0, 0, 0)
    ).toISOString(),
    to: new Date(
      Date.UTC(rawDates.to.getFullYear(), rawDates.to.getMonth(), rawDates.to.getDate(), 23, 59, 59)
    ).toISOString(),
  };

  return formattedDates;
}

function sanitizeSearch(search: string) {
  const str: string[] = [];

  search.split(/\s+/).forEach((word) => {
    str.push('+');
    str.push(word.replace(/[\p{P}\p{C}]/gu, ''));
    str.push('*');
  });

  if (str.length > 3) {
    str.splice(2, 1);
  }

  search = str.join('');

  return search === '+*' ? null : search;
}
