import { oxmysql } from '@overextended/oxmysql';

export const createDefaultAccount = async (charId: number) => {
  await oxmysql.prepare<number>('INSERT INTO `accounts` (`label`, `owner`, `isDefault`) VALUES (?, ?, ?)', ['Personal', charId, true]);
};

export const createNewAccount = async (charId: number, name: string, shared?: boolean) => {
  const _type = shared ? 'shared' : 'personal';

  return await oxmysql.prepare<number>('INSERT INTO `accounts` (`label`, `owner`, `type`) VALUES (?, ?, ?)', [name, charId, _type]);
};

export const isAccountOwner = async (accountId: number, charId: number) => {
  return await oxmysql.prepare<boolean>('SELECT 1 FROM `accounts` WHERE `id` = ? AND `owner` = ?', [accountId, charId]);
};
