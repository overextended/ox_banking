import React from 'react';
import { useModal } from '@/components/ModalsProvider';
import CharacterAccounts from '@/layouts/bank/pages/accounts/components/CharacterAccounts';
import AccountDetails from '@/layouts/bank/pages/accounts/components/AccountDetails';
import AccountSettings from '@/layouts/bank/pages/accounts/components/AccountSettings';

const Accounts: React.FC = () => {
  const modal = useModal();

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <CharacterAccounts />
      <div className="flex w-full gap-2">
        <AccountDetails />
        <AccountSettings />
      </div>
    </div>
  );
};

export default Accounts;
