import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatNumber } from '@/utils/formatNumber';
import { FileCheck, FileX } from 'lucide-react';

interface Props {
  paid: boolean;
  amount: number;
  issuer: string;
  date: string;
}

const InvoiceItem: React.FC<Props> = (props) => {
  return (
    <div className='flex items-center'>
      <Avatar className='h-9 w-9'>
        <AvatarFallback>{props.paid ? <FileCheck /> : <FileX />}</AvatarFallback>
      </Avatar>
      <div className='ml-4 space-y-1'>
        <p className='text-sm font-medium leading-none'>{props.issuer}</p>
        <p className='text-xs text-muted-foreground'>
          {props.date}
        </p>
      </div>
      <div className='ml-auto font-medium'>{formatNumber(props.amount)}</div>
    </div>
  );
};

export default InvoiceItem;
