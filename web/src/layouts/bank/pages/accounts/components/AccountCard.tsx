import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';
import { useSetActiveAccountId } from '@/state/accounts/accounts';

interface Props {
  name: string;
  id: number;
  amount: number;
  type: 'personal' | 'shared' | 'group';
  active: boolean;
}

const AccountCard: React.FC<Props> = ({ name, id, amount, type, active }) => {
  const setActiveAccountId = useSetActiveAccountId();

  return (
    <div
      onClick={() => setActiveAccountId(id)}
      className={cn(
        'flex w-[250px] flex-col rounded-lg border bg-background p-4 shadow transition-all hover:-translate-y-1 hover:scale-105 hover:cursor-pointer hover:bg-secondary',
        active && 'bg-primary text-primary-foreground hover:transform-none hover:cursor-auto hover:bg-primary'
      )}
    >
      <h2>{name}</h2>
      <p className="mb-4 text-sm text-muted-foreground">{`${
        type === 'personal' ? 'Personal' : type === 'shared' ? 'Shared' : 'Group'
      } account`}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{formatNumber(amount)}</p>
        <p className="text-xs text-muted-foreground">{id}</p>
      </div>
    </div>
  );
};

export default React.memo(AccountCard);
