import { Button } from '@/components/ui/button';
import React from 'react';
import { DateRangePicker } from '@/components/DateRangePicker';
import { useLogsFilters, useSetLogsFiltersDebounce } from '@/state/accounts';
import LogsTypeSelect from './LogsTypeSelect';

const LogsFilters: React.FC = () => {
  const filters = useLogsFilters();
  const setFilters = useSetLogsFiltersDebounce();

  return (
    <div className="flex items-center gap-2">
      <DateRangePicker />
      <LogsTypeSelect />
    </div>
  );
};

export default LogsFilters;
