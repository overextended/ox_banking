import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatNumber } from '@/utils/formatNumber';
import { cn } from '@/lib/utils';

interface Props {
  firstName: string;
  lastName: string;
  date: string;
  amount: number;
  type: 'inbound' | 'outbound';
}

const TransactionItem: React.FC<Props> = (props) => {
  return (
    <div className='flex items-center'>
      <Avatar className='h-9 w-9'>
        <AvatarFallback>{`${props.firstName.charAt(0)}${props.lastName.charAt(0)}`}</AvatarFallback>
      </Avatar>
      <div className='ml-4 space-y-1'>
        <p className='text-sm font-medium leading-none'>{`${props.firstName} ${props.lastName}`}</p>
        <p className='text-xs text-muted-foreground'>
          {props.date}
        </p>
      </div>
      <div
        className={cn('ml-auto font-medium', props.type === 'outbound' && 'text-destructive')}>{`${props.type === 'inbound' ? '+' : '-'}`}{formatNumber(props.amount)}</div>
    </div>
  );
};

export default TransactionItem;
