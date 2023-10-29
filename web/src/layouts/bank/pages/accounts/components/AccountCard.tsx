import React from 'react';
import { formatNumber } from '@/utils/formatNumber';

interface Props {
  name: string;
  id: number;
  amount: number;
  type: 'personal' | 'shared' | 'group';
}

const AccountCard: React.FC<Props> = ({ name, id, amount, type }) => {
  return (
    <div
      className='p-4 rounded-lg bg-background border flex flex-col shadow w-[250px] hover:bg-secondary hover:scale-105 transition-all hover:cursor-pointer hover:-translate-y-1'>
      <h2>{name}</h2>
      <p
        className='text-muted-foreground text-sm mb-4'>{`${type === 'personal' ? 'Personal' : type === 'shared' ? 'Shared' : 'Group'} account`}</p>
      <div className='flex justify-between items-center'>
        <p className='text-xs text-muted-foreground'>{formatNumber(amount)}</p>
        <p className='text-xs text-muted-foreground'>{id}</p>
      </div>
    </div>
  );
};

export default AccountCard;
