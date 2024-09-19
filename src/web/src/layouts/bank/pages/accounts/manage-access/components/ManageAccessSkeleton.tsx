import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ManageAccessSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="h-[4.875rem] w-full"></Skeleton>
      ))}
    </div>
  );
};

export default ManageAccessSkeleton;
