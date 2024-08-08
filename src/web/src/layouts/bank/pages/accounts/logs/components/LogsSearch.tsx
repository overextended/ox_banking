import React from 'react';
import { Input } from '@/components/ui/input';
import { useLogsFilters, useSetLogsFiltersDebounce } from '@/state/accounts';

const LogsSearch: React.FC = () => {
  const filters = useLogsFilters();
  const setFilters = useSetLogsFiltersDebounce();

  return (
    <div>
      <Input
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value, page: 0 }))}
      />
    </div>
  );
};

export default LogsSearch;
