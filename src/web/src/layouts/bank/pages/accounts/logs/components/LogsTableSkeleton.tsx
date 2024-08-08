import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LogsTableSkeleton: React.FC = () => {
  return (
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
  );
};

export default LogsTableSkeleton;
