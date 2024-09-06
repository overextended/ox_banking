import React from 'react';
import CharacterAccounts from '@/layouts/bank/pages/accounts/components/CharacterAccounts';
import ActiveAccountContainer from './components/ActiveAccountContainer';
import { queryClient } from '@/main';

const Accounts: React.FC = () => {
  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['accounts'] }).then();
  }, []);

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2">
        <CharacterAccounts />
        <ActiveAccountContainer />
      </div>
    </React.Suspense>
  );
};

export default Accounts;
