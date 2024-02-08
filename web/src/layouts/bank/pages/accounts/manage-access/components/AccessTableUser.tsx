import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { AccessTableData } from '~/typings';

const ROLES = {
  'owner': 'Owner',
  'manager': 'Manager',
  'contributor': 'Contributor',
};

const AccessTableUser: React.FC<AccessTableData> = ({ name, role, stateId }) => {
  return (
    <div className='grid rounded-tl-lg rounded-tr-lg grid-cols-4 py-4 place-items-center'>
      <p>{name}</p>
      <p>{ROLES[role]}</p>
      <p>{stateId}</p>
      <div className='flex gap-2 items-center'>
        <Button size='icon'>
          <Edit size={20} />
        </Button>
        <Button size='icon' variant='destructive'>
          <Trash size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AccessTableUser;
