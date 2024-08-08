import React from 'react';
import { useLogs } from '@/state/accounts';
import LogsTableHead from './LogsTableHead';
import LogsTableBody from './LogsTableBody';
import LogsTableFooter from './LogsTableFooter';
import LogsTableSkeleton from './LogsTableSkeleton';
import { useIsLogsFiltersDebouncing } from '@/state/accounts';

const LogsTable: React.FC<{ accountId: number }> = ({ accountId }) => {
  const [maxPages, setMaxPages] = React.useState(0);
  const { data, isLoading } = useLogs();
  const isDebouncing = useIsLogsFiltersDebouncing();

  React.useEffect(() => {
    setMaxPages((prev) => data?.numberOfPages ?? prev);
  }, [data]);

  return (
    <div className="flex h-full flex-col justify-between">
      {isLoading || isDebouncing ? (
        <LogsTableSkeleton />
      ) : (
        <div>
          <LogsTableHead />
          <LogsTableBody logs={data?.logs ?? []} />
        </div>
      )}
      <LogsTableFooter maxPages={maxPages} />
    </div>
  );
};

export default LogsTable;
