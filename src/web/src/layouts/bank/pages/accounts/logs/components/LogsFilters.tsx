import { Button } from '@/components/ui/button';
import React from 'react';
import { DateRangePicker } from '@/components/DateRangePicker';
import { useLogsFilters, useSetLogsFiltersDebounce } from '@/state/accounts';
import { DateRange } from 'react-day-picker';

const LogsFilters: React.FC = () => {
  const filters = useLogsFilters();
  const setFilters = useSetLogsFiltersDebounce();

  return (
    <div className="flex items-center gap-2">
      <DateRangePicker />
      <Button>Type</Button>
    </div>
  );
};

export default LogsFilters;
