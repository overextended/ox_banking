import { atom, selector } from 'recoil';
import { fetchNui } from '../utils/fetchNui';
import { selectedLogsAccountAtom } from './account';

interface Transaction {
  type: 'inbound' | 'outbound';
  amount: number;
  account: string;
  date: string;
  message?: string;
}

export const transactionsAtom = selector<Transaction[]>({
  key: 'accountTransactions',
  get: async ({ get }) => {
    try {
      const transactions = await fetchNui('getAccountLogs', get(selectedLogsAccountAtom));
      return transactions;
    } catch (e) {
      return [
        { type: 'inbound', amount: 3500, account: 'Billy', date: '01/01/1999' },
        { type: 'outbound', amount: 7995, account: 'Bob', date: '19/08/2022' },
        { type: 'inbound', amount: 19120, account: 'Billy', date: '31/02/2000' },
        { type: 'inbound', amount: 3500, account: 'Billy', date: '01/01/1999' },
        { type: 'outbound', amount: 7995, account: 'Bob', date: '19/08/2022' },
      ];
    }
  },
});
