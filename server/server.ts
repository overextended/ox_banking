import { onClientCallback } from '@overextended/ox_lib/server';
import type { Account, DatabaseAccount } from '../typings';
import { createDefaultAccount } from './utils';
import { oxmysql } from '@overextended/oxmysql';
import { GetPlayer } from '@overextended/ox_core/server';

type GetAccountsReponse = {
  accountId: Account['accountId'],
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

  const dbAccounts = await oxmysql.rawExecute<GetAccountsReponse[]>('SELECT a.accountId, a.label, a.group, a.balance, a.isDefault, b.firstName, b.lastName  FROM `accounts` a LEFT JOIN `characters` b ON a.owner = b.charId WHERE charId = ?', [player.charId]);

  const accounts: Account[] = dbAccounts.map(account => ({
    group: account.group,
    accountId: account.accountId,
    label: account.label,
    isDefault: account.isDefault,
    balance: account.balance,
    type: 'personal',
    owner: `${account.firstName} ${account.lastName}`,
  }));

  return accounts;
});

on('ox:playerLoaded', async (source: number, userId: number, charId: number) => {
  const charAccounts: DatabaseAccount[] = await exports.ox_core.GetCharacterAccounts(charId);
  const defaultAccounts = charAccounts.filter(account => account.isDefault);

  if (defaultAccounts.length > 0) return;

  await createDefaultAccount(charId);
});
