import React from 'react';
import { useModal } from '@/components/ModalsProvider';
import CharacterAccounts from '@/layouts/bank/pages/accounts/components/CharacterAccounts';
import AccountDetails from '@/layouts/bank/pages/accounts/components/AccountDetails';
import AccountSettings from '@/layouts/bank/pages/accounts/components/AccountSettings';
import { useActiveAccountId } from '@/state/accounts/accounts';
import { ServerOff } from 'lucide-react';

const Accounts: React.FC = () => {
  const modal = useModal();
  const activeAccountId = useActiveAccountId();

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <CharacterAccounts />
      {activeAccountId ? (
        <div className="flex w-full gap-2">
          <AccountDetails />
          <AccountSettings />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground">
          <ServerOff size={32} />
          <p className="text-xl">No account selected</p>
        </div>
      )}
    </div>
  );
};

export default Accounts;
