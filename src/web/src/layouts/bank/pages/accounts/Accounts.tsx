import React from 'react';
import CharacterAccounts from '@/layouts/bank/pages/accounts/components/CharacterAccounts';
import ActiveAccountContainer from './components/ActiveAccountContainer';
import { queryClient } from '@/main';
import ActiveAccountSkeleton from './components/ActiveAccountSkeleton';
import AccountsSkeleton from './components/AccountsSkeleton';

const Accounts: React.FC = () => {
  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['accounts'] }).then();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <React.Suspense fallback={<AccountsSkeleton />}>
        <CharacterAccounts />
      </React.Suspense>
      <React.Suspense fallback={<ActiveAccountSkeleton />}>
        <ActiveAccountContainer />
      </React.Suspense>
    </div>
  );
};

export default Accounts;
