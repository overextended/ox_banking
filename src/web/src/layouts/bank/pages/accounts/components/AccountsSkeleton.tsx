import React from 'react';
import { ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { Skeleton } from '@/components/ui/skeleton';

const AccountsSkeleton: React.FC = () => {
  return (
    <BaseCard title={locales.accounts} icon={CreditCard} className="overflow-visible">
      <div className="flex w-full items-center justify-center gap-4">
        <Button size="icon" className="rounded-full" disabled>
          <ChevronLeft />
        </Button>
        <div className="flex flex-1 justify-start gap-4">
          {Array.from({ length: 4 }).map((item, index) => (
            <Skeleton key={index} className="h-[110px] w-[250px]" />
          ))}
        </div>
        <Button size="icon" className="rounded-full" disabled>
          <ChevronRight />
        </Button>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <div className={'bg-muted h-[5px] w-[5px] rounded-full transition-colors duration-500'} />
        <div className={'bg-muted h-[5px] w-[5px] rounded-full transition-colors duration-500'} />
        <div className={'bg-muted h-[5px] w-[5px] rounded-full transition-colors duration-500'} />
      </div>
    </BaseCard>
  );
};

export default AccountsSkeleton;
