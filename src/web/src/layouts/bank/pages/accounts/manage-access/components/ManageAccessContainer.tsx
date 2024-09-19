import React from 'react';
import ManageAccessUserItem from '@/layouts/bank/pages/accounts/manage-access/components/ManageAccessUserItem';
import { AccessTableData } from '~/src/common/typings';
import { useQuery } from '@tanstack/react-query';
import { fetchNui } from '@/utils/fetchNui';
import {
  useDebouncedAccessTableFilters,
  useIsAccessTableFiltersDebouncing,
  useSetAccessTableFiltersDebounce,
} from '@/state/manage-access/tableFilters';
import Pagination from '../../../../components/Pagination';
import ManageAccessSkeleton from './ManageAccessSkeleton';
import { delay } from '@/utils/misc';

const ManageAccessContainer: React.FC<{ accountId: number }> = ({ accountId }) => {
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const tableFilter = useDebouncedAccessTableFilters();
  const setTableFilter = useSetAccessTableFiltersDebounce();
  const isSearchDebouncing = useIsAccessTableFiltersDebouncing();

  const { data, isLoading } = useQuery<AccessTableData>({
    queryKey: ['account-access', tableFilter.page, tableFilter.search],
    queryFn: async () => {
      const resp = await fetchNui<AccessTableData>(
        'getAccountUsers',
        {
          accountId: +accountId!,
          page: tableFilter.page,
          search: tableFilter.search,
        },
        {
          data: {
            numberOfPages: 2,
            users: [
              {
                name: 'Place Holder',
                stateId: 'LF23312',
                role: 'manager',
              },
              {
                name: 'Place Holder',
                stateId: 'LF23312',
                role: 'owner',
              },
              {
                name: 'Place Holder',
                stateId: 'LF23312',
                role: 'contributor',
              },
            ],
          },
          delay: 2500,
        }
      );

      await delay(500);

      setNumberOfPages(resp.numberOfPages);

      return resp;
    },
  });

  const spinnerVisible = isLoading || isSearchDebouncing;

  return (
    <div className="flex h-full flex-col justify-between rounded-lg">
      {!spinnerVisible ? (
        <div className="grid grid-cols-2 gap-2">
          {data?.users.map((user) => (
            <ManageAccessUserItem key={user.stateId} name={user.name} stateId={user.stateId} role={user.role} />
          ))}
        </div>
      ) : (
        <ManageAccessSkeleton />
      )}
      <Pagination
        maxPages={numberOfPages}
        page={tableFilter.page}
        setPage={(page) => setTableFilter((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};

export default ManageAccessContainer;
