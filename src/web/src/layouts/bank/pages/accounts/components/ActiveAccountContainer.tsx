import React from 'react';
import AccountSettings from './AccountSettings';
import { useActiveAccount } from '@/state/accounts';
import AccountDetails from './AccountDetails';
import { ServerOff } from 'lucide-react';
import locales from '@/locales';

const ActiveAccountContainer: React.FC = () => {
  const activeAccount = useActiveAccount();

  return (
    <>
      {activeAccount ? (
        <div className="flex w-full gap-2">
          <AccountDetails />
          <AccountSettings />
        </div>
      ) : (
        <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center">
          <ServerOff size={32} />
          <p className="text-xl">{locales.no_account_selected}</p>
        </div>
      )}
    </>
  );
};

export default ActiveAccountContainer;
