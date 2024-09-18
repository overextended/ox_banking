import React from 'react';
import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ManageAccessContainer from './components/ManageAccessContainer';
import { useModal } from '@/components/ModalsProvider';
import NewAccountUserModal from './modals/NewAccountUserModal';
import ManageAccessSearch from './components/ManageAccessSearch';
import { useActiveAccount } from '@/state/accounts';

const ManageAccess: React.FC = () => {
  const modal = useModal();
  const activeAccount = useActiveAccount()!;

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <BaseCard title={locales.manage_access} icon={Shield} className="h-full">
        <div className="flex justify-between gap-2">
          <ManageAccessSearch />
          {activeAccount.type !== 'group' && (
            <Button
              className="flex items-center gap-2"
              onClick={() =>
                modal.open({
                  title: locales.new_account_user,
                  children: <NewAccountUserModal accountId={activeAccount.id} />,
                })
              }
            >
              <Plus size={20} />
              {locales.new_account_user}
            </Button>
          )}
        </div>
        <ManageAccessContainer accountId={activeAccount.id} />
      </BaseCard>
    </div>
  );
};

export default ManageAccess;
