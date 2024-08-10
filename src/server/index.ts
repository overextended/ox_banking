import { onClientCallback } from '@overextended/ox_lib/server';
import type { AccessTableData, Account, DashboardData, LogsFilters, RawLogItem, Transaction } from '../common/typings';
import { oxmysql } from '@overextended/oxmysql';
import { Ox, GetPlayer } from '@overextended/ox_core/server';

onClientCallback('ox_banking:getAccounts', async (playerId): Promise<Account[]> => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const accessAccounts = await player.getAccounts(true);

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

  return await Ox.CreateAccount(charId, name, shared);
});

onClientCallback('ox_banking:deleteAccount', async (playerId, accountId: number) => {
  const player = GetPlayer(playerId);
  const account = await Ox.GetAccountById(accountId);

  if (!account || !player) return;

  if (account.balance > 0) return;

  const hasPermission = await player.hasAccountPermission(accountId, 'closeAccount');

  if (!hasPermission) return;

  return await Ox.DeleteAccount(accountId);
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
  const response = await Ox.DepositMoney(playerId, accountId, amount);
  //@todo notify
  return response === true;
});

onClientCallback('ox_banking:withdrawMoney', async (playerId, { accountId, amount }: UpdateBalance) => {
  console.log(accountId, amount);
  const response = await Ox.WithdrawMoney(playerId, accountId, amount);
  //@todo notify
  return response === true;
});

onClientCallback(
  'ox_banking:transferMoney',
  async (playerId, { fromAccountId, target, transferType, amount }: TransferBalance) => {
    const player = GetPlayer(playerId);

    if (!(await player?.hasAccountPermission(fromAccountId, 'withdraw'))) return;

    const targetAccountId =
      transferType === 'account' ? (target as number) : (await Ox.GetCharacterAccount(target))?.id;

    if (targetAccountId) {
      const response = await Ox.TransferAccountBalance({
        fromId: fromAccountId,
        toId: targetAccountId,
        amount: amount,
        actorId: player.charId,
      });
      //@todo notify
      return response === true;
    }
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
      DAYNAME(d.date) as day,
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
    [account.id, account.id, account.id, account.id]
  );

  const lastTransactions = await oxmysql.rawExecute<
    {
      amount: number;
      date: string;
      toId?: number;
      fromId?: number;
      message?: string;
    }[]
  >(
    `
    SELECT amount, DATE_FORMAT(date, '%Y-%m-%d %H:%i') as date, toId, fromId, message
    FROM accounts_transactions
    WHERE toId = ? OR fromId = ?
    ORDER BY id DESC
    LIMIT 5
    `,
    [account.id, account.id]
  );

  const transactions: Transaction[] = lastTransactions.map((transaction) => {
    return {
      amount: transaction.amount,
      date: transaction.date,
      message: transaction.message,
      type: transaction.toId === account.id ? 'inbound' : 'outbound',
    };
  });

  return {
    balance: account.balance,
    overview,
    transactions,
    invoices: [],
  };
});

onClientCallback(
  'ox_banking:getAccountUsers',
  async (
    playerId,
    data: {
      accountId: number;
      page: number;
      search?: string;
    }
  ): Promise<AccessTableData> => {
    const { accountId, page, search } = data;
    const player = GetPlayer(playerId);

    if (!player) return;
    if (!(await player.hasAccountPermission(accountId, 'manageUser'))) return;

    const wildcard = `%${search}%`;

    const users = await oxmysql.rawExecute<AccessTableData['users']>(
      `
      SELECT c.stateId, a.role, CONCAT(c.firstName, " ", c.lastName) AS \`name\` FROM \`accounts_access\` a
      LEFT JOIN \`characters\` c ON c.charId = a.charId
      WHERE a.accountId = ?
      AND CONCAT(c.firstName, " ", c.lastName) LIKE ?
      ORDER BY a.role DESC
      LIMIT 7
      OFFSET ?
      `,
      [accountId, wildcard, page * 7]
    );

    const usersCount = await oxmysql.prepare<number>(
      'SELECT COUNT(*) FROM `accounts_access` ac LEFT JOIN characters c ON c.charId = ac.charId WHERE accountId = ? AND CONCAT(c.firstName, " ", c.lastName) LIKE ?',
      [accountId, wildcard]
    );

    return {
      numberOfPages: Math.ceil(usersCount / 7),
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
      role: string;
    }
  ) => {
    const player = GetPlayer(playerId);

    if (!(await player?.hasAccountPermission(accountId, 'addUser'))) return;

    const success = await oxmysql.prepare('SELECT 1 FROM `characters` WHERE `stateId` = ?', [stateId]);

    if (!success) return 'state_id_not_exists';

    return await Ox.SetAccountAccess(accountId, stateId, role);
  }
);

onClientCallback(
  'ox_banking:manageUser',
  async (
    playerId,
    data: {
      accountId: number;
      targetStateId: string;
      values: { role: string };
    }
  ): Promise<boolean> => {
    const player = GetPlayer(playerId);

    if (!(await player?.hasAccountPermission(data.accountId, 'manageUser'))) return;

    return (await Ox.SetAccountAccess(data.accountId, data.targetStateId, data.values.role)) > 0;
  }
);

onClientCallback('ox_banking:removeUser', async (playerId, data: { targetStateId: string; accountId: number }) => {
  const player = GetPlayer(playerId);

  if (!(await player?.hasAccountPermission(data.accountId, 'removeUser'))) return;

  return await Ox.RemoveAccountAccess(data.accountId, data.targetStateId);
});

onClientCallback(
  'ox_banking:transferOwnership',
  async (
    playerId,
    data: {
      targetStateId: string;
      accountId: number;
    }
  ): Promise<true | 'state_id_not_exists'> => {
    const player = GetPlayer(playerId);

    if (!(await player?.hasAccountPermission(data.accountId, 'transferOwnership'))) return;

    const targetCharId = await oxmysql.prepare<number | null>('SELECT `charId` FROM `characters` WHERE `stateId` = ?', [
      data.targetStateId,
    ]);

    if (!targetCharId) return 'state_id_not_exists';

    await oxmysql.prepare(
      "INSERT INTO `accounts_access` (`accountId`, `charId`, `role`) VALUES (?, ?, 'owner') ON DUPLICATE KEY UPDATE `role` = 'owner'",
      [data.accountId, targetCharId]
    );

    await oxmysql.prepare('UPDATE `accounts` SET `owner` = ? WHERE `id` = ?', [targetCharId, data.accountId]);

    await oxmysql.prepare("UPDATE `accounts_access` SET `role` = 'manager' WHERE `accountId` = ? AND `charId` = ?", [
      data.accountId,
      player.charId,
    ]);

    return true;
  }
);

onClientCallback('ox_banking:renameAccount', async (playerId, data: { accountId: number; name: string }) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const hasPermission = await player.hasAccountPermission(data.accountId, 'manageAccount');
  if (!hasPermission) return false;

  await oxmysql.prepare('UPDATE `accounts` SET `label` = ? WHERE `id` = ?', [data.name, data.accountId]);

  return true;
});

onClientCallback('ox_banking:convertAccountToShared', async (playerId, data: { accountId: number }) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const account = await Ox.GetAccountById(data.accountId);

  if (account.type !== 'personal') return;
  if (account.owner !== player.charId) return;

  await oxmysql.prepare('UPDATE `accounts` SET `type` = ? WHERE `id` = ?', ['shared', data.accountId]);

  return true;
});

onClientCallback('ox_banking:getLogs', async (playerId, data: { accountId: number; filters: LogsFilters }) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const hasPermission = await player.hasAccountPermission(data.accountId, 'viewHistory');

  if (!hasPermission) return;

  const { accountId, filters } = data;

  const search = `%${filters.search}%`;

  let dateSearchString = '';
  let queryParams: any[] = [accountId, accountId, search, search];

  if (filters.date) {
    // Dates from filters are all set to midnight, so we set all the dates we fetch from the DB to be 1 minute after
    // midnight to fit into the BETWEEN scope
    dateSearchString = `AND (DATE_FORMAT(ac.date, '%Y-%m-%dT00:01.000Z') BETWEEN ? AND ?)`;
    console.log(JSON.stringify(filters.date, null, 2));
    queryParams.push(filters.date.from, filters.date.to ?? filters.date.from);
  }

  queryParams.push(filters.page * 9);

  const queryData = await oxmysql.rawExecute<RawLogItem[]>(
    `
          SELECT ac.id, ac.toId, ac.fromBalance, ac.toBalance, ac.message, ac.amount, DATE_FORMAT(ac.date, '%Y-%m-%d %H:%i') AS date, CONCAT(c.firstName, ' ', c.lastName) AS name
          FROM accounts_transactions ac
          LEFT JOIN characters c ON c.charId = ac.actorId
          WHERE (fromId = ? OR toId = ?) AND (ac.message LIKE ? OR CONCAT(c.firstName, ' ', c.lastName) LIKE ?) ${dateSearchString}
          ORDER BY ac.id DESC
          LIMIT 9
          OFFSET ?
        `,
    queryParams
  );

  const totalLogsCount = await oxmysql.prepare(
    `
          SELECT COUNT(*)
          FROM accounts_transactions ac
          LEFT JOIN characters c ON c.charId = ac.actorId
          WHERE (ac.toId = ? OR ac.fromId = ?) AND (ac.message LIKE ? OR CONCAT(c.firstName, ' ', c.lastName) LIKE ?)
        `,
    [accountId, accountId, search, search]
  );

  return {
    numberOfPages: Math.ceil(totalLogsCount / 9),
    logs: queryData,
  };
});
