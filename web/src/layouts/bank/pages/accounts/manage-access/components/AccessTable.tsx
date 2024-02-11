import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react';
import AccessTableUserItem from '@/layouts/bank/pages/accounts/manage-access/components/AccessTableUserItem';
import { AccessTableData } from '~/typings';

const AccessTable: React.FC<{ data?: AccessTableData; accountId: number }> = ({ data, accountId }) => {
  if (!data) return null;

  return (
    <div className='flex flex-col justify-between h-full border border-border rounded-lg p-4'>
      <div>
        <div className='grid grid-cols-4 place-items-center text-sm'>
          <p>Name</p>
          <p>Role</p>
          <p>State ID</p>
          <p></p>
        </div>
        {data.users.map(user => (
          <AccessTableUserItem key={user.stateId} characterRole={data.role} accountId={accountId} name={user.name}
                               stateId={user.stateId}
                               role={user.role} />
        ))}
      </div>
      <div className='flex gap-4 items-center justify-end'>
        <Button size='icon'>
          <ChevronLeft size={20} />
        </Button>
        <p>Page 1 of {data.numberOfPages}</p>
        <Button size='icon'>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AccessTable;
