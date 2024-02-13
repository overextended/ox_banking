import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react';
import AccessTableUserItem from '@/layouts/bank/pages/accounts/manage-access/components/AccessTableUserItem';
import { AccessTableData } from '~/typings';
import { useQuery } from '@tanstack/react-query';
import { fetchNui } from '@/utils/fetchNui';
import SpinningLoader from '@/components/SpinningLoader';
import { useDebouncedAccessTableSearch, useIsAccessTableSearchDebouncing } from '@/state/manage-access/search';
import { cn } from '@/lib/utils';

const AccessTable: React.FC<{ accountId: number }> = ({ accountId }) => {
  const [page, setPage] = React.useState(0);
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const search = useDebouncedAccessTableSearch();
  const isSearchDebouncing = useIsAccessTableSearchDebouncing();
  const { data, isLoading } = useQuery<AccessTableData>({
    queryKey: ['account-access', page, search], queryFn: async () => {
      const resp = await fetchNui<AccessTableData>('getAccountUsers', {
        accountId: +accountId!, page, search,
      }, {
        data: {
          role: 'manager',
          numberOfPages: 2,
          users: [
            {
              name: 'Place Holder',
              stateId: 'LF23312',
              role: 'manager',
            },
          ],
        },
        delay: 2500,
      });

      setNumberOfPages(resp.numberOfPages);

      return resp;
    },
  });

  // todo: runs the query twice
  React.useEffect(() => setPage(0), [search]);

  const spinnerVisible = isLoading || isSearchDebouncing;

  return (
    <div
      className='flex flex-col justify-between h-full border border-border rounded-lg p-4'>

      {!spinnerVisible ? <div>
        <div className='grid grid-cols-4 place-items-center text-sm'>
          <p>Name</p>
          <p>Role</p>
          <p>State ID</p>
          <p></p>
        </div>
        {data?.users.map(user => (
          <AccessTableUserItem key={user.stateId} characterRole={data.role} accountId={accountId} name={user.name}
                               stateId={user.stateId}
                               role={user.role} />
        ))}
      </div> : (
        <div className='flex items-center justify-center h-full'>
          <SpinningLoader variant='primary' />
        </div>
      )}
      <div className='flex gap-4 items-center justify-end'>
        <Button size='icon' onClick={() => setPage(prev => --prev)} disabled={page <= 0 || spinnerVisible}>
          <ChevronLeft size={20} />
        </Button>
        <p>Page {page + 1} of {spinnerVisible ? '?' : numberOfPages}</p>
        <Button size='icon' onClick={() => setPage(prev => ++prev)}
                disabled={page >= numberOfPages - 1 || spinnerVisible}>
          <ChevronRight size={20} />
        </Button>
      </div>

    </div>
  );
};

export default AccessTable;
