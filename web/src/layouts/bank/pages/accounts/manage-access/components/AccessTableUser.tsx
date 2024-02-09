import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, UserCog, UserMinus } from 'lucide-react';
import { AccessTableData } from '~/typings';
import { useModal } from '@/components/ModalsProvider';
import ManageUserModal from '@/layouts/bank/pages/accounts/manage-access/modals/ManageUserModal';
import RemoveUserModal from '@/layouts/bank/pages/accounts/manage-access/modals/RemoveUserModal';

const ROLES = {
  'owner': 'Owner',
  'manager': 'Manager',
  'contributor': 'Contributor',
};

const AccessTableUser: React.FC<AccessTableData & { accountId: number }> = ({ name, role, stateId, accountId }) => {
  const modal = useModal();

  return (
    <div className='grid grid-cols-4 py-4 place-items-center border-t border-border'>
      <p>{name}</p>
      <p>{ROLES[role]}</p>
      <p>{stateId}</p>
      <div className='flex gap-2 items-center'>
        <Button size='icon' onClick={() => modal.open({
          title: 'Manage user',
          children: <ManageUserModal accountId={accountId} targetStateId={stateId} defaultRole={role} />,
        })}>
          <UserCog size={20} />
        </Button>
        <Button size='icon' variant='destructive' onClick={() => modal.open({
          title: 'Remove user',
          children: <RemoveUserModal targetStateId={stateId} accountId={accountId} />,
        })}>
          <UserMinus size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AccessTableUser;
