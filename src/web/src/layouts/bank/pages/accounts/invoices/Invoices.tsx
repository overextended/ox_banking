import React from 'react';
import { ReceiptText } from 'lucide-react';
import locales from '@/locales';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { DateRangePicker } from '@/components/DateRangePicker';
import InvoiceTypeButtons from './components/InvoiceTypeButtons';
import { useSetInvoicesFiltersDebounce, useInvoicesFilters } from '@/state/accounts/invoices';
import { useActiveAccount } from '@/state/accounts';
import { useNavigate } from 'react-router-dom';
import InvoicesContainer from './components/InvoicesContainer';
import InvoicesSearch from './components/InvoicesSearch';

const Invoices: React.FC = () => {
  const account = useActiveAccount()!;
  const navigate = useNavigate();

  if (!account) {
    navigate('/accounts');
    return null;
  }

  const setFilters = useSetInvoicesFiltersDebounce();
  const filters = useInvoicesFilters();

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <BaseCard title={locales.invoices} icon={ReceiptText} className="h-full gap-4">
        <InvoicesSearch />
        <div className="flex items-center justify-between">
          <DateRangePicker
            date={filters.date}
            setValue={(date) => setFilters((prev) => ({ ...prev, date, page: 0 }))}
            placeholder={
              filters.type === 'unpaid'
                ? locales.invoice_pick_due_date
                : filters.type === 'paid'
                  ? locales.invoice_pick_paid_date
                  : locales.invoice_pick_sent_date
            }
          />
          <InvoiceTypeButtons />
        </div>
        <InvoicesContainer accountId={account.id} />
      </BaseCard>
    </div>
  );
};

export default Invoices;
