import React from 'react';
import { Input } from '@/components/ui/input';
import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { Edit, Plus, Shield, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AccessTable from './components/AccessTable';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AccessTableData } from '~/typings';
import { useModal } from '@/components/ModalsProvider';
import NewAccountUserModal from './modals/NewAccountUserModal';
import { fetchNui } from '@/utils/fetchNui';

const ManageAccess: React.FC = () => {
  const modal = useModal();
  const { accountId } = useParams();
  const { data, isLoading } = useQuery<AccessTableData[]>({
    queryKey: ['account-access', accountId], queryFn: async () => {
      const resp = await fetchNui<AccessTableData[]>('getAccountUsers', +accountId!, {
        data: [
          {
            name: 'Place Holder',
            stateId: 'LF23312',
            role: 'contributor',
          },
        ],
      });

      return resp;
    },
  });

  return (
    <div className='flex w-full h-full p-2 gap-2 flex-col'>
      <BaseCard title={locales.manage_access} icon={Shield} className='h-full'>
        <div className='flex gap-2'>
          <Input placeholder='Search...' />
          <Button className='flex gap-2 items-center'
                  onClick={() => modal.open({
                    title: 'New account user',
                    children: <NewAccountUserModal accountId={+accountId!} />,
                  })}>
            <Plus size={20} />
            New account user
          </Button>
        </div>
        <AccessTable data={data} />
      </BaseCard>
    </div>
  );
};

export default ManageAccess;
