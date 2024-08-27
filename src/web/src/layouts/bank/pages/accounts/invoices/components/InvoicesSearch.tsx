import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useInvoicesFilters } from '@/state/accounts/invoices';
import { useSetInvoicesFiltersDebounce } from '@/state/accounts/invoices';

const InvoicesSearch: React.FC = () => {
  const filters = useInvoicesFilters();
  const setFilters = useSetInvoicesFiltersDebounce();

  return (
    <div>
      <Input
        placeholder="Search..."
        startIcon={SearchIcon}
        value={filters.search}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value, page: 0 }))}
      />
    </div>
  );
};

export default InvoicesSearch;
