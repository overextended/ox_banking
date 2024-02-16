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
    <div className='flex w-full h-full p-2 gap-2 flex-col'>
      <BaseCard title={locales.manage_access} icon={Shield} className='h-full'>
        <div className='flex gap-2'>
          <AccessTableSearch />
          <Button className='flex gap-2 items-center'
                  onClick={() => modal.open({
                    title: locales.new_account_user,
                    children: <NewAccountUserModal accountId={+accountId!} />,
                  })}>
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
