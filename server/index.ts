import { onClientCallback } from '@overextended/ox_lib/server';
import type { AccessTableData, Account, DashboardData } from '../typings';
import { oxmysql } from '@overextended/oxmysql';
import { GetPlayer } from '@overextended/ox_core/server';

type GetAccountsReponse = {
  id: Account['id'];
  label?: Account['label'];
  group?: Account['group'];
  balance: Account['balance'];
  isDefault?: Account['isDefault'];
  owner: number;
  type: Account['type'];
  firstName: string;
  lastName: string;
};

onClientCallback('ox_banking:getAccounts', async (playerId): Promise<Account[]> => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const personalAccounts = await oxmysql.rawExecute<GetAccountsReponse[]>(
    `
    SELECT a.id, a.label, a.owner, a.group, a.balance, a.isDefault, a.type, b.firstName, b.lastName
    FROM \`accounts\` a
    LEFT JOIN \`characters\` b ON a.owner = b.charId
    WHERE b.charId = ? AND type = 'personal'
    `,

    [player.charId]
  );

  const accessAccounts = await oxmysql.rawExecute<GetAccountsReponse[]>(
    `
    SELECT a.id, a.label, a.owner, a.group, a.balance, a.isDefault, a.type, b.firstName, b.lastName
    FROM \`accounts_access\` c
    LEFT JOIN accounts a ON a.id = c.accountId
    LEFT JOIN characters b ON b.charId = a.owner
    WHERE c.stateId = ?
    `,
    [player.stateId]
  );

  const rawAccounts = [...accessAccounts, ...personalAccounts];

  const accounts: Account[] = rawAccounts.map((account) => ({
    group: account.group,
    id: account.id,
    label: account.label,
    isDefault: player.charId === account.owner ? account.isDefault : false,
    balance: account.balance,
    type: account.type,
    owner: `${account.firstName} ${account.lastName}`,
  }));

  return accounts;
});

onClientCallback('ox_banking:createAccount', async (playerId, { name, shared }: { name: string; shared: boolean }) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const accountId: number = await exports.ox_core.CreateAccount(player.charId, name, shared);

  if (shared) {
    await oxmysql.prepare('INSERT INTO `accounts_access` (`accountId`, `stateId`, `role`) VALUE (?, ?, ?)', [
      accountId,
      player.stateId,
      'owner',
    ]);
  }

  return true;
});

onClientCallback('ox_banking:deleteAccount', async (playerId, accountId: number) => {
  if (!(await exports.ox_core.IsAccountOwner(playerId, accountId))) return;

  return await oxmysql.prepare('DELETE FROM `accounts` WHERE id = ?', [accountId]);
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
  return exports.ox_core.DepositMoney(playerId, accountId, amount);
});

onClientCallback('ox_banking:withdrawMoney', async (playerId, { accountId, amount }: UpdateBalance) => {
  return exports.ox_core.WithdrawMoney(playerId, accountId, amount);
});

onClientCallback(
  'ox_banking:transferMoney',
  async (playerId, { fromAccountId, target, transferType, amount }: TransferBalance) => {
    if (!(await exports.ox_core.IsAccountOwner(playerId, fromAccountId))) return;

    const targetAccountId =
      transferType === 'account' ? target : (await exports.ox_core.GetCharacterAccount(target))?.id;

    if (targetAccountId) {
      //@todo notify
      return await exports.ox_core.TransferAccountBalance(fromAccountId, targetAccountId, amount);
    }
  }
);

onClientCallback('ox_banking:getDashboardData', async (playerId): Promise<DashboardData> => {
  const playerAccount = await exports.ox_core.GetPlayerAccount(playerId);

  if (!playerAccount) return;

  return {
    balance: playerAccount.balance,
    overview: [],
    transactions: [],
    invoices: [],
  };
});

onClientCallback('ox_banking:getAccountUsers', async (playerId, accountId: number): Promise<AccessTableData[]> => {
  const result = await oxmysql.rawExecute<AccessTableData[]>(
    'SELECT a.stateId, a.role, CONCAT(c.firstName, " ", c.lastName) AS `name` FROM `accounts_access` a LEFT JOIN `characters` c ON c.stateId = a.stateId WHERE a.accountId = ?',
    [accountId]
  );

  console.log(JSON.stringify(result, null, 2));

  return result;
});

onClientCallback(
  'ox_banking:addUserToAccount',
  async (
    playerId,
    data: {
      accountId: string;
      stateId: string;
      role: string;
    }
  ) => {
    const { accountId, stateId, role } = data;

    // todo: allow manager to add user
    if (!(await exports.ox_core.IsAccountOwner(playerId, accountId))) return;

    const success = await oxmysql.prepare('SELECT 1 FROM `characters` WHERE `stateId` = ?', [stateId]);

    if (!success) return 'No person with provided state id found.';

    await oxmysql.prepare('INSERT INTO `accounts_access` (`accountId`, `stateId`, `role`) VALUES (?, ?, ?)', [
      accountId,
      stateId,
      role,
    ]);

    return true;
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
    const isAccountOwner: boolean = await exports.ox_core.IsAccountOwner(playerId, data.accountId);

    if (!isAccountOwner) return false;

    const success = await oxmysql.prepare(
      'UPDATE `accounts_access` SET `role` = ? WHERE `accountId` = ? AND `stateId` = ?',
      [data.values.role, data.accountId, data.targetStateId]
    );

    return success;
  }
);

onClientCallback('ox_banking:removeUser', async (playerId, data: { targetStateId: string; accountId: number }) => {
  const isAccountOwner: boolean = await exports.ox_core.IsAccountOwner(playerId, data.accountId);

  // todo: allow manager to remove people
  if (!isAccountOwner) return false;

  const success = await oxmysql.prepare('DELETE FROM `accounts_access` WHERE `accountId` = ? AND `stateId` = ?', [
    data.accountId,
    data.targetStateId,
  ]);

  return success;
});
