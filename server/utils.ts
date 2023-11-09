import { oxmysql } from '@overextended/oxmysql';

export const generateAccountNumber = () => {
  const min = 100000;
  const max = 999999;

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createDefaultAccount = async (charId: number) => {
  while (true) {
    const accountNumber = generateAccountNumber();

    const isNumberTaken = await oxmysql.scalar<boolean>('SELECT 1 FROM `accounts` WHERE `accountId` = ?', [accountNumber]);

    if (isNumberTaken) continue;

    // todo: locale for label
    await oxmysql.prepare<number>('INSERT INTO `accounts` (`accountId`, `label` `owner`, `balance`, `isDefault`) VALUES (?, ?, ?, ?)', [accountNumber, 'Personal', charId, 0, true]);

    break;
  }
};
