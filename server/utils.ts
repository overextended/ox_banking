import { oxmysql } from '@overextended/oxmysql';

export const createDefaultAccount = async (charId: number) => {
  await oxmysql.prepare<number>('INSERT INTO `accounts` (`label`, `owner`, `isDefault`) VALUES (?, ?, ?)', ['Personal', charId, true]);
};

export const createNewAccount = async (charId: number, name: string, shared?: boolean) => {
  const _type = shared ? 'shared' : 'personal';

  return await oxmysql.prepare<number>('INSERT INTO `accounts` (`label`, `owner`, `type`) VALUES (?, ?, ?)', [name, charId, _type]);
};
