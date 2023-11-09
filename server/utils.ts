import { oxmysql } from '@overextended/oxmysql';

export const generateAccountNumber = () => {
  const min = 100000;
  const max = 999999;

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getAvailableAccountId = async () => {
  while (true) {
    const accountNumber = generateAccountNumber();

    const isNumberTaken = await oxmysql.scalar<boolean>('SELECT 1 FROM `accounts` WHERE `accountId` = ?', [accountNumber]);

    if (isNumberTaken) continue;

    return accountNumber;
  }
};

export const createDefaultAccount = async (charId: number) => {
  const accountId = await getAvailableAccountId();

  await oxmysql.prepare<number>('INSERT INTO `accounts` (`accountId`, `label`, `owner`, `isDefault`) VALUES (?, ?, ?, ?)', [accountId, 'Personal', charId, true]);
};

export const createNewAccount = async (charId: number, name: string) => {
  const accountId = await getAvailableAccountId();

  await oxmysql.prepare('INSERT INTO `accounts` (`accountId`, `label`, `owner`) VALUES (?, ?, ?)', [accountId, name, charId]);

  return accountId;
};
