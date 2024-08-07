import React from 'react';
import LogsTableItem from './LogsTableItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLogs } from '@/state/accounts';
import { Button } from '@/components/ui/button';

const LogsTable: React.FC<{ accountId: number }> = ({ accountId }) => {
  const [page, setPage] = React.useState(0);
  const { data } = useLogs(accountId, page);

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="text-muted-foreground mb-2 grid grid-cols-[36px,repeat(5,1fr)] gap-2 border-b py-2 text-center text-sm">
          <p></p>
          <p>Name</p>
          <p>Message</p>
          <p>Amount</p>
          <p>New balance</p>
          <p>Timestamp</p>
        </div>
        {data.logs.map((transaction) => (
          <LogsTableItem key={transaction.id} {...transaction} />
        ))}
      </div>
      <div className="nd flex items-center gap-4 self-end">
        <Button size="icon" onClick={() => setPage((prev) => --prev)} disabled={page === 0}>
          <ChevronLeft size={20} />
        </Button>
        <p>
          {page + 1} / {data.numberOfPages}
        </p>
        <Button size="icon" onClick={() => setPage((prev) => ++prev)} disabled={page + 1 === data.numberOfPages}>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default LogsTable;
