import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { cn } from '@/lib/utils';
import { useSetActiveAccountId } from '@/state/accounts/accounts';
import { Account } from '@/typings/accounts';

interface Props {
  account: Account;
  active: boolean;
}

const AccountCard: React.FC<Props> = ({ account, active }) => {
  const setActiveAccountId = useSetActiveAccountId();

  return (
    <div
      onClick={() => setActiveAccountId(account.id)}
      className={cn(
        'flex w-[250px] flex-col rounded-lg border bg-background p-4 shadow transition-all hover:-translate-y-1 hover:scale-105 hover:cursor-pointer hover:bg-secondary',
        active && 'bg-primary text-primary-foreground hover:transform-none hover:cursor-auto hover:bg-primary'
      )}
    >
      <h2>{account.owner}</h2>
      <p className="mb-4 text-sm text-muted-foreground">{`${
        account.type === 'personal' ? 'Personal' : account.type === 'shared' ? 'Shared' : 'Group'
      } account`}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{formatNumber(account.balance)}</p>
        <p className="text-xs text-muted-foreground">{account.id}</p>
      </div>
    </div>
  );
};

export default React.memo(AccountCard);
