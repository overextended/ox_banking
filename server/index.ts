import { onClientCallback } from '@overextended/ox_lib/server';
import type { Account, DatabaseAccount } from '../typings';
import { createDefaultAccount, createNewAccount, isAccountOwner } from './utils';
import { oxmysql } from '@overextended/oxmysql';
import { GetPlayer } from '@overextended/ox_core/server';

type GetAccountsReponse = {
  id: Account['id'];
  label?: Account['label'];
  group?: Account['group'];
  balance: Account['balance'];
  isDefault?: Account['isDefault'];
  type: Account['type'];
  firstName: string;
  lastName: string;
};

onClientCallback('getAccounts', async (playerId): Promise<Account[]> => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const dbAccounts = await oxmysql.rawExecute<GetAccountsReponse[]>(
    'SELECT a.id, a.label, a.group, a.balance, a.isDefault, a.type, b.firstName, b.lastName  FROM `accounts` a LEFT JOIN `characters` b ON a.owner = b.charId WHERE charId = ?',
    [player.charId]
  );

  const accounts: Account[] = dbAccounts.map((account) => ({
    group: account.group,
    id: account.id,
    label: account.label,
    isDefault: account.isDefault,
    balance: account.balance,
    type: account.type,
    owner: `${account.firstName} ${account.lastName}`,
  }));

  return accounts;
});

onClientCallback('createAccount', async (playerId, { name, shared }: { name: string; shared: boolean }) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  return await createNewAccount(player.charId, name, shared);
});

onClientCallback('deleteAccount', async (playerId, accountId: number) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  if (!(await isAccountOwner(accountId, player.charId))) return;

  await oxmysql.prepare('DELETE FROM `accounts` WHERE id = ?', [accountId]);

  return true;
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

onClientCallback('depositMoney', async (playerId, { accountId, amount }: UpdateBalance) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  if (!(await isAccountOwner(accountId, player.charId))) return;

  if (amount > exports.ox_inventory.GetItemCount(playerId, 'money')) return;

  if (!(await exports.ox_core.AddAccountBalance(accountId, amount))) return;

  return exports.ox_inventory.RemoveItem(playerId, 'money', amount) ? true : false;
});

onClientCallback('withdrawMoney', async (playerId, { accountId, amount }: UpdateBalance) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const balance = await oxmysql.prepare<number>('SELECT `balance` FROM `accounts` WHERE `id` = ? AND `owner` = ?', [
    accountId,
    player.charId,
  ]);

  if (balance == null) return;

  if (amount > balance) return;

  if (!(await exports.ox_core.RemoveAccountBalance(accountId, amount))) return;

  return exports.ox_inventory.AddItem(playerId, 'money', amount) ? true : false;
});

onClientCallback(
  'transferMoney',
  async (playerId, { fromAccountId, target, transferType, amount }: TransferBalance) => {
    const targetAccountId =
      transferType === 'account' ? target : (await exports.ox_core.GetCharacterAccount(target))?.id;

    if (targetAccountId) {
      //@todo notify
      return await exports.ox_core.TransferAccountBalance(fromAccountId, targetAccountId, amount);
    }
  }
);

on('ox:playerLoaded', async (source: number, userId: number, charId: number) => {
  const charAccounts: DatabaseAccount[] = await exports.ox_core.GetCharacterAccounts(charId);
  const defaultAccounts = charAccounts.filter((account) => account.isDefault);

  if (defaultAccounts.length > 0) return;

  await createDefaultAccount(charId);
});
