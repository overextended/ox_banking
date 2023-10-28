import React from 'react';
import { LucideIcon, PiggyBank } from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber';

interface Props {
  label: string;
  amount: number;
  icon: LucideIcon;
}

const AccountCard: React.FC<Props> = (props) => {
  return (
    <div className='border flex flex-1 flex-col gap-4 p-4 rounded-lg shadow'>
      <div className='flex justify-between items-center text-muted-foreground'>
        <h2 className='font-bold'>{props.label}</h2>
        <props.icon />
      </div>
      <p className='text-3xl'>{formatNumber(props.amount)}</p>
    </div>
  );
};

export default AccountCard;
