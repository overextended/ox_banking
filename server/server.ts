import { onClientCallback } from '@overextended/ox_lib/server';
import type { Account, DatabaseAccount } from '../typings';
import { createDefaultAccount, createNewAccount } from './utils';
import { oxmysql } from '@overextended/oxmysql';
import { GetPlayer } from '@overextended/ox_core/server';

type GetAccountsReponse = {
  id: Account['id'],
  label?: Account['label'],
  group?: Account['group'],
  balance: Account['balance'],
  isDefault?: Account['isDefault'],
  firstName: string;
  lastName: string;
}

onClientCallback('getAccounts', async (playerId): Promise<Account[]> => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const dbAccounts = await oxmysql.rawExecute<GetAccountsReponse[]>('SELECT a.id, a.label, a.group, a.balance, a.isDefault, b.firstName, b.lastName  FROM `accounts` a LEFT JOIN `characters` b ON a.owner = b.charId WHERE charId = ?', [player.charId]);

  const accounts: Account[] = dbAccounts.map(account => ({
    group: account.group,
    id: account.id,
    label: account.label,
    isDefault: account.isDefault,
    balance: account.balance,
    type: 'personal',
    owner: `${account.firstName} ${account.lastName}`,
  }));

  return accounts;
});

onClientCallback('createAccount', async (playerId: number, data: { name: string; shared: boolean }) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const { name, shared } = data;

  return await createNewAccount(player.charId, name);
});

onClientCallback('deleteAccount', async (playerId: number, accountId: number) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const account = await oxmysql.prepare('SELECT 1 FROM `accounts` WHERE `id` = ? AND `owner` = ?', [accountId, player.charId]);

  if (!account) return;

  await oxmysql.prepare('DELETE FROM `accounts` WHERE id = ?', [accountId]);

  return true;
});

onClientCallback('depositMoney', async (playerId: number, data: { accountId: number; amount: number }) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const { accountId, amount } = data;
  const playerCash: number = exports.ox_inventory.Search(playerId, 'count', 'money');

  if (amount > playerCash) return;

  const account = await oxmysql.prepare('SELECT 1 FROM `accounts` WHERE `id` = ? AND `owner` = ?', [accountId, player.charId]);

  if (!account) return;

  return await exports.ox_core.AddAccountBalance(accountId, amount);
});

onClientCallback('withdrawMoney', async (playerId: number, data: { accountId: number; amount: number }) => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const { accountId, amount } = data;

  const balance = await oxmysql.prepare<number>('SELECT `balance` FROM `accounts` WHERE `id` = ? AND `owner` = ?', [accountId, player.charId]);

  if (balance === undefined || balance === null) return;

  if (amount > balance) return;

  const success = await exports.ox_core.RemoveAccountBalance(accountId, amount);

  if (!success) return;

  exports.ox_inventory.AddItem(playerId, 'money', amount);

  return true;
});


on('ox:playerLoaded', async (source: number, userId: number, charId: number) => {
  const charAccounts: DatabaseAccount[] = await exports.ox_core.GetCharacterAccounts(charId);
  const defaultAccounts = charAccounts.filter(account => account.isDefault);

  if (defaultAccounts.length > 0) return;

  await createDefaultAccount(charId);
});
