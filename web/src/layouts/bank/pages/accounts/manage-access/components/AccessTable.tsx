import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react';
import AccessTableUser from '@/layouts/bank/pages/accounts/manage-access/components/AccessTableUser';
import { AccessTableData } from '~/typings';

const AccessTable: React.FC<{ data?: AccessTableData[] }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className='flex flex-col justify-between h-full'>
      <div>
        <div className='grid grid-cols-4 place-items-center'>
          <p>Name</p>
          <p>Role</p>
          <p>State ID</p>
          <p></p>
        </div>
        {data.map(user => (
          <AccessTableUser name={user.name} stateId={user.stateId} role={user.role} />
        ))}
      </div>
      <div className='flex gap-4 items-center justify-end'>
        <Button size='icon'>
          <ChevronLeft size={20} />
        </Button>
        <p>Page 1 of X</p>
        <Button size='icon'>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AccessTable;
