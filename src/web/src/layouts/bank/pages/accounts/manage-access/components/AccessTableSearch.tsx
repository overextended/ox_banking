import React from 'react';
import { Input } from '@/components/ui/input';
import { useAccessTableFilters, useSetAccessTableFiltersDebounce } from '@/state/manage-access/tableFilters';
import locales from '@/locales';
import { SearchIcon } from 'lucide-react';

const AccessTableSearch: React.FC = () => {
  const value = useAccessTableFilters();
  const setDebounce = useSetAccessTableFiltersDebounce();

  return (
    <Input
      placeholder={locales.search_names}
      value={value.search}
      onChange={(e) => setDebounce({ search: e.target.value, page: 0 })}
      startIcon={SearchIcon}
    />
  );
};

export default AccessTableSearch;
