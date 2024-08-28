import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useInvoicesFilters } from '@/state/accounts/invoices';
import { useSetInvoicesFiltersDebounce } from '@/state/accounts/invoices';
import locales from '@/locales';

const InvoicesSearch: React.FC = () => {
  const filters = useInvoicesFilters();
  const setFilters = useSetInvoicesFiltersDebounce();

  return (
    <div>
      <Input
        placeholder={
          filters.type === 'unpaid'
            ? locales.unpaid_invoices_search
            : filters.type === 'paid'
              ? locales.paid_invoices_search
              : locales.sent_invoices_search
        }
        startIcon={SearchIcon}
        value={filters.search}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value, page: 0 }))}
      />
    </div>
  );
};

export default InvoicesSearch;
