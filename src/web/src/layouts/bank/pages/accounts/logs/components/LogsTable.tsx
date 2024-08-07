import React from 'react';
import { useLogs } from '@/state/accounts';
import LogsTableHead from './LogsTableHead';
import LogsTableBody from './LogsTableBody';
import LogsTableFooter from './LogsTableFooter';
import LogsTableSkeleton from './LogsTableSkeleton';

const LogsTable: React.FC<{ accountId: number }> = ({ accountId }) => {
  const [page, setPage] = React.useState(0);
  const [maxPages, setMaxPages] = React.useState(0);
  const { data, isLoading } = useLogs(accountId, page);

  React.useEffect(() => {
    setMaxPages((prev) => data?.numberOfPages ?? prev);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col justify-between">
        <LogsTableSkeleton page={page} maxPages={maxPages} setPage={setPage} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <LogsTableHead />
        <LogsTableBody logs={data?.logs ?? []} />
      </div>
      <LogsTableFooter page={page} setPage={setPage} maxPages={maxPages} />
    </div>
  );
};

export default LogsTable;
