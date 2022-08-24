import { selector } from 'recoil';
import { fetchNui } from '../utils/fetchNui';
import { selectedLogsAccountAtom } from './account';

interface Invoice {
  from: string;
  date: string;
  amount: number;
  description?: string;
}

export const invoicesAtom = selector<Invoice[] | undefined>({
  key: 'accountInvoices',
  get: async ({ get }) => {
    try {
      const { invoices } = await fetchNui<{ invoices: Invoice[] }>('getAccountLogs', get(selectedLogsAccountAtom));
      return invoices;
    } catch (e) {
      return [
        { from: 'Karen', date: '01/01/1999', amount: 7500 },
        { from: 'Jean', date: '01/01/1999', amount: 13500 },
        { from: 'Christoph', date: '01/01/1999', amount: 28500 },
      ];
    }
  },
});
