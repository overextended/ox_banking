import React from 'react';
import { Input } from '@/components/ui/input';
import { useLogsFilters, useSetLogsFiltersDebounce } from '@/state/accounts';
import locales from '@/locales';
import { SearchIcon } from 'lucide-react';

const LogsSearch: React.FC = () => {
  const filters = useLogsFilters();
  const setFilters = useSetLogsFiltersDebounce();

  return (
    <div>
      <Input
        startIcon={SearchIcon}
        placeholder={locales.logs_search}
        value={filters.search}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value, page: 0 }))}
      />
    </div>
  );
};

export default LogsSearch;
