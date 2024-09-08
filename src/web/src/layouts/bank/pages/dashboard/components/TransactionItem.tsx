import React from 'react';
import { ArrowUpRight, ArrowDownRight, FileCheck, FileClock, FileText } from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber';
import { cn } from '@/lib/utils';
import { Transaction } from '~/src/common/typings';
import { formatDate } from '@/utils/formatDate';

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          'bg-secondary text-secondary-foreground flex h-9 w-9 items-center justify-center rounded-lg',
          transaction.type === 'inbound' && 'bg-green-400/20 text-green-700 dark:bg-green-500/20 dark:text-green-500',
          transaction.type === 'outbound' && 'bg-red-400/20 text-red-700 dark:bg-red-500/20 dark:text-red-500'
        )}
      >
        {transaction.type === 'inbound' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
      </div>
      <div className="ml-4 space-y-1">
        <p className="line-clamp-1 text-sm font-medium leading-none">{transaction.message}</p>
        <p className="text-muted-foreground text-xs">{formatDate(transaction.date)}</p>
      </div>
      <div className={cn('ml-auto font-medium', transaction.type === 'outbound' && 'text-destructive')}>
        {transaction.type === 'inbound' ? '+' : '-'}
        {formatNumber(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionItem;
