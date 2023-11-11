import { oxmysql } from '@overextended/oxmysql';

export const createDefaultAccount = async (charId: number) => {
  await oxmysql.prepare<number>('INSERT INTO `accounts` (`label`, `owner`, `isDefault`) VALUES (?, ?, ?)', ['Personal', charId, true]);
};

export const createNewAccount = async (charId: number, name: string) => {
  return await oxmysql.prepare<number>('INSERT INTO `accounts` (`label`, `owner`) VALUES (?, ?)', [name, charId]);
};
