import { selector } from 'recoil';
import { fetchNui } from '../utils/fetchNui';
import { selectedLogsAccountAtom } from './account';

export interface InvoiceProps {
  from: string;
  date: string;
  amount: number;
  description?: string;
  isPaid: boolean;
}

export const invoicesAtom = selector<InvoiceProps[] | undefined>({
  key: 'accountInvoices',
  get: async ({ get }) => {
    try {
      const { invoices } = await fetchNui<{ invoices: InvoiceProps[] }>('getAccountLogs', get(selectedLogsAccountAtom));
      return invoices;
    } catch (e) {
      return [
        { from: 'Karen', date: '01/01/1999', amount: 7500, isPaid: false },
        { from: 'Jean', date: '01/01/1999', amount: 13500, isPaid: true },
        { from: 'Christoph', date: '01/01/1999', amount: 28500, isPaid: true },
      ];
    }
  },
});
