import { selector } from 'recoil';
import { fetchNui } from '../utils/fetchNui';
import { selectedLogsAccountAtom } from './account';

export interface TransactionProps {
  type: 'inbound' | 'outbound';
  amount: number;
  accountId: string;
  accountOwner: string;
  date: string;
  message?: string;
}

export const transactionsAtom = selector<TransactionProps[] | undefined>({
  key: 'accountTransactions',
  get: async ({ get }) => {
    try {
      const { transactions } = await fetchNui<{ transactions: TransactionProps[] }>(
        'getAccountLogs',
        get(selectedLogsAccountAtom)
      );
      return transactions;
    } catch (e) {
      return [
        { type: 'inbound', amount: 3500, accountId: '1962134879551', accountOwner: 'Billy Bob', date: '01/01/1999' },
        { type: 'outbound', amount: 7995, accountId: '5979846231541', accountOwner: 'Police', date: '19/08/2022' },
        { type: 'inbound', amount: 19120, accountId: '9261979951215', accountOwner: 'John Smith', date: '31/02/2000' },
        {
          type: 'inbound',
          amount: 3500,
          accountId: '3261949632187',
          accountOwner: 'Janice Ortega',
          date: '01/01/1999',
        },
        {
          type: 'outbound',
          amount: 7995,
          accountId: '1962134879551',
          accountOwner: 'Manraj Howard',
          date: '19/08/2022',
        },
      ];
    }
  },
});
