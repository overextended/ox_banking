import React from 'react';
import CharacterAccounts from '@/layouts/bank/pages/accounts/components/CharacterAccounts';
import ActiveAccountContainer from './components/ActiveAccountContainer';
import { queryClient } from '@/main';

const Accounts: React.FC = () => {
  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['accounts'] }).then();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <React.Suspense fallback={<p>Loading...</p>}>
        <CharacterAccounts />
      </React.Suspense>
      <React.Suspense fallback={<p>Account loading...</p>}>
        <ActiveAccountContainer />
      </React.Suspense>
    </div>
  );
};

export default Accounts;
