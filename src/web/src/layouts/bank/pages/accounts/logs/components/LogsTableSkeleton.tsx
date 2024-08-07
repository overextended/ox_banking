import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogsTableFooter from './LogsTableFooter';

interface Props {
  page: number;
  maxPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const LogsTableSkeleton: React.FC<Props> = ({ page, maxPages, setPage }) => {
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
        <div className="flex flex-col gap-1">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-[calc(52px-0.25rem)] w-full p-2" />
          ))}
        </div>
      </div>

      <LogsTableFooter page={page} setPage={setPage} maxPages={maxPages} />
    </div>
  );
};

export default LogsTableSkeleton;
