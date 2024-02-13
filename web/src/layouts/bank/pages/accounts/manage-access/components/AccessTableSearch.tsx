import React from 'react';
import { Input } from '@/components/ui/input';
import { useAccessTableSearch, useSetAccessTableDebounce } from '@/state/manage-access/search';

const AccessTableSearch: React.FC = () => {
  const value = useAccessTableSearch();
  const setDebounce = useSetAccessTableDebounce();

  return (
    <Input placeholder='Search...' value={value} onChange={(e) => setDebounce(e.target.value)} />
  );
};

export default AccessTableSearch;
