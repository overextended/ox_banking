import React from 'react';
import { DateRangePicker } from '@/components/DateRangePicker';
import { useSetLogsFiltersDebounce } from '@/state/accounts';
import LogsTypeSelect from './LogsTypeSelect';

const LogsFilters: React.FC = () => {
  const setFilters = useSetLogsFiltersDebounce();

  return (
    <div className="flex items-center gap-2">
      <DateRangePicker setValue={(date) => setFilters((prev) => ({ ...prev, date, page: 0 }))} />
      <LogsTypeSelect />
    </div>
  );
};

export default LogsFilters;
