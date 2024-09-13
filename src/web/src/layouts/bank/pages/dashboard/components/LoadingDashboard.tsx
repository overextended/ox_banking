import React from 'react';
import { Banknote, FileStack, LineChart, PiggyBank, Repeat } from 'lucide-react';
import locales from '@/locales';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingDashboard: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <div className="flex justify-between gap-2">
        <BaseCard icon={PiggyBank} title={locales.account_money} className="flex-1">
          <Skeleton className="h-9 w-full" />
        </BaseCard>
        <BaseCard icon={Banknote} title={locales.cash_balance} className="flex-1">
          <Skeleton className="h-9 w-full" />
        </BaseCard>
      </div>
      <BaseCard title={locales.weekly_overview} icon={LineChart}>
        <Skeleton className="h-60 w-full" />
      </BaseCard>
      <div className="flex flex-1 gap-2">
        <BaseCard title={locales.recent_transactions} icon={Repeat} className="flex-1">
          {Array.from({ length: 5 }).map((item, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </BaseCard>
        <BaseCard title={locales.recent_invoices} icon={FileStack} className="flex-1">
          {Array.from({ length: 5 }).map((item, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </BaseCard>
      </div>
    </div>
  );
};

export default LoadingDashboard;
