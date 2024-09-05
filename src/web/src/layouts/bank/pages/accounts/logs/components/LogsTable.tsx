import React from 'react';
import { useLogs } from '@/state/accounts';
import LogsTableHead from './LogsTableHead';
import LogsTableBody from './LogsTableBody';
import LogsTableSkeleton from './LogsTableSkeleton';
import { useIsLogsFiltersDebouncing } from '@/state/accounts';
import Pagination from '@/layouts/bank/components/Pagination';
import { useLogsFilters, useSetLogsFiltersDebounce } from '@/state/accounts';

const LogsTable: React.FC<{ accountId: number }> = ({ accountId }) => {
  const [maxPages, setMaxPages] = React.useState(0);
  const { data, isLoading } = useLogs();
  const isDebouncing = useIsLogsFiltersDebouncing();
  const filters = useLogsFilters();
  const setFilters = useSetLogsFiltersDebounce();

  React.useEffect(() => {
    setMaxPages((prev) => data?.numberOfPages ?? prev);
  }, [data]);

  return (
    <div className="flex h-full flex-col justify-between">
      {isLoading || isDebouncing ? (
        <LogsTableSkeleton />
      ) : (
        <LogsTableBody accountId={accountId} logs={data?.logs ?? []} />
      )}
      <Pagination
        maxPages={maxPages}
        page={filters.page}
        setPage={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};

export default LogsTable;
