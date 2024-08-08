import React from 'react';
import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { Edit, Plus, Shield, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AccessTable from './components/AccessTable';
import { useParams } from 'react-router-dom';
import { useModal } from '@/components/ModalsProvider';
import NewAccountUserModal from './modals/NewAccountUserModal';
import AccessTableSearch from './components/AccessTableSearch';

const ManageAccess: React.FC = () => {
  const modal = useModal();
  const { accountId } = useParams();

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <BaseCard title={locales.manage_access} icon={Shield} className="h-full">
        <div className="flex gap-2">
          <AccessTableSearch />
          <Button
            className="flex items-center gap-2"
            onClick={() =>
              modal.open({
                title: locales.new_account_user,
                children: <NewAccountUserModal accountId={+accountId!} />,
              })
            }
          >
            <Plus size={20} />
            {locales.new_account_user}
          </Button>
        </div>
        <AccessTable accountId={+accountId!} />
      </BaseCard>
    </div>
  );
};

export default ManageAccess;
