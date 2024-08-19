import React from 'react';
import { ReceiptText, SearchIcon } from 'lucide-react';
import locales from '@/locales';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/DateRangePicker';
import InvoiceTypeButtons from './components/InvoiceTypeButtons';
import Pagination from '@/layouts/bank/components/Pagination';
import UnpaidInvoicesTable from './components/UnpaidInvoicesTable';
import PaidInvoicesTable from './components/PaidInvoicesTable';
import SentInvoicesTable from './components/SentInvoicesTable';

type BaseInvoice = {
  id: number;
  type: 'paid' | 'unpaid';
  amount: number;
  message: string;
  date: string;
  target: number;
};

const DEBUG_INVOICES = [
  {
    id: 0,
    type: 'paid',
    amount: 3000,
    to: 'Some account',
    message: '',
    date: '11/11/1111',
  },
];

const Invoices: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [tab, setTab] = React.useState<'unpaid' | 'paid' | 'sent'>('unpaid');

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <BaseCard title={locales.invoices} icon={ReceiptText} className="h-full gap-4">
        <div>
          <Input placeholder="Search..." startIcon={SearchIcon} />
        </div>
        <div className="flex items-center justify-between">
          <DateRangePicker />
          <InvoiceTypeButtons tab={tab} setTab={setTab} />
        </div>
        <div className="flex h-full flex-col justify-between">
          {tab === 'unpaid' && <UnpaidInvoicesTable />}
          {tab === 'paid' && <PaidInvoicesTable />}
          {tab === 'sent' && <SentInvoicesTable />}
          <Pagination maxPages={3} page={page} setPage={(page) => setPage(page)} />
        </div>
      </BaseCard>
    </div>
  );
};

export default Invoices;
