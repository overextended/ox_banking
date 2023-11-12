import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { cn } from '@/lib/utils';
import { useSetActiveAccount } from '@/state/accounts';
import { Account } from '@/typings';
import locales from '@/locales';

interface Props {
  account: Account;
  active: boolean;
}

const AccountCard: React.FC<Props> = ({ account, active }) => {
  const setActiveAccount = useSetActiveAccount();

  return (
    <div
      onClick={() => {
        setActiveAccount(account);
      }}
      className={cn(
        'flex w-[250px] flex-col rounded-lg border bg-background p-4 shadow transition-all hover:-translate-y-1 hover:scale-105 hover:cursor-pointer hover:bg-secondary',
        active &&
          'border-transparent bg-primary text-primary-foreground hover:transform-none hover:cursor-auto hover:bg-primary dark:bg-primary/20'
      )}
    >
      <h2 className="line-clamp-1">{account.label}</h2>
      <p className={cn('mb-4 text-sm text-muted-foreground', active && 'text-primary-foreground')}>
        {account.type === 'personal'
          ? locales.personal_account
          : account.type === 'shared'
          ? locales.shared_account
          : locales.group_account}
      </p>
      <div className="flex items-center justify-between">
        <p className={cn('text-xs text-muted-foreground', active && 'text-primary-foreground')}>
          {formatNumber(account.balance)}
        </p>
        <p className={cn('text-xs text-muted-foreground', active && 'text-primary-foreground')}>{account.id}</p>
      </div>
    </div>
  );
};

export default React.memo(AccountCard);
