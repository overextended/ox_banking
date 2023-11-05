import React from 'react';
import CharacterAccounts from '@/layouts/bank/pages/accounts/components/CharacterAccounts';
import AccountDetails from '@/layouts/bank/pages/accounts/components/AccountDetails';
import AccountSettings from '@/layouts/bank/pages/accounts/components/AccountSettings';
import { useActiveAccount } from '@/state/accounts/accounts';
import { ServerOff } from 'lucide-react';
import locales from '@/locales';

const Accounts: React.FC = () => {
  const activeAccount = useActiveAccount();

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <React.Suspense fallback={<p>Loading...</p>}>
        <CharacterAccounts />
      </React.Suspense>
      {activeAccount ? (
        <div className="flex w-full gap-2">
          <AccountDetails />
          <AccountSettings />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
          <ServerOff size={32} />
          <p className="text-xl">{locales.no_account_selected}</p>
        </div>
      )}
    </div>
  );
};

export default Accounts;
