import { Button } from '@/components/ui/button';
import React from 'react';
import { useInvoicesFilters, useSetInvoicesFiltersDebounce } from '@/state/accounts/invoices';

const InvoiceTypeButtons: React.FC = () => {
  const filters = useInvoicesFilters();
  const setFilters = useSetInvoicesFiltersDebounce();

  return (
    <div className="rounded-lg border shadow-sm">
      <Button
        onClick={() => setFilters((prev) => ({ ...prev, type: 'unpaid', page: 0 }))}
        className="h-[34px] rounded-br-none rounded-tr-none"
        variant={filters.type === 'unpaid' ? 'default' : 'ghost'}
      >
        Unpaid invoices
      </Button>
      <Button
        onClick={() => setFilters((prev) => ({ ...prev, type: 'paid', page: 0 }))}
        className="h-[34px] rounded-none"
        variant={filters.type === 'paid' ? 'default' : 'ghost'}
      >
        Paid invoices
      </Button>
      <Button
        onClick={() => setFilters((prev) => ({ ...prev, type: 'sent', page: 0 }))}
        className="h-[34px] rounded-bl-none rounded-tl-none"
        variant={filters.type === 'sent' ? 'default' : 'ghost'}
      >
        Sent invoices
      </Button>
    </div>
  );
};

export default InvoiceTypeButtons;
