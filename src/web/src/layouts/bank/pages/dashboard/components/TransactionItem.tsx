import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber';
import { cn } from '@/lib/utils';
import locales from '@/locales';

interface Props {
  date: string;
  amount: number;
  type: 'inbound' | 'outbound';
  message?: string;
}

const TransactionItem: React.FC<Props> = (props) => {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarFallback>
          {props.type === 'outbound' ? (
            <ArrowDownRight className="text-destructive" />
          ) : (
            <ArrowUpRight className="text-primary" />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{props.message ?? locales.no_message}</p>
        <p className="text-muted-foreground text-xs">{props.date}</p>
      </div>
      <div className={cn('ml-auto font-medium', props.type === 'outbound' && 'text-destructive')}>
        {`${props.type === 'inbound' ? '+' : '-'}`}
        {formatNumber(props.amount)}
      </div>
    </div>
  );
};

export default TransactionItem;
