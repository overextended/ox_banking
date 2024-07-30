import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AccessTableUserItem from '@/layouts/bank/pages/accounts/manage-access/components/AccessTableUserItem';
import { AccessTableData } from '~/src/common/typings';
import { useQuery } from '@tanstack/react-query';
import { fetchNui } from '@/utils/fetchNui';
import SpinningLoader from '@/components/SpinningLoader';
import {
  useDebouncedAccessTableFilters,
  useIsAccessTableFiltersDebouncing,
  useSetAccessTableFiltersDebounce,
} from '@/state/manage-access/tableFilters';
import locales from '@/locales';
import { useActiveAccount } from '@/state/accounts';

const AccessTable: React.FC<{ accountId: number }> = ({ accountId }) => {
  const [numberOfPages, setNumberOfPages] = React.useState(0);
  const tableFilter = useDebouncedAccessTableFilters();
  const setTableFilter = useSetAccessTableFiltersDebounce();
  const isSearchDebouncing = useIsAccessTableFiltersDebouncing();
  const { role: characterRole } = useActiveAccount()!;

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

      setNumberOfPages(resp.numberOfPages);

      return resp;
    },
  });

  const spinnerVisible = isLoading || isSearchDebouncing;

  return (
    <div className="border-border flex h-full flex-col justify-between rounded-lg border p-4">
      {!spinnerVisible ? (
        <div>
          <div className="grid grid-cols-4 place-items-center text-sm">
            <p>{locales.name}</p>
            <p>{locales.role}</p>
            <p>{locales.state_id}</p>
            <p></p>
          </div>
          {data?.users.map((user) => (
            <AccessTableUserItem
              key={user.stateId}
              characterRole={characterRole}
              accountId={accountId}
              name={user.name}
              stateId={user.stateId}
              role={user.role}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <SpinningLoader variant="primary" />
        </div>
      )}
      <div className="flex items-center justify-end gap-4">
        <Button
          size="icon"
          onClick={() => setTableFilter((prev) => ({ ...prev, page: --prev.page }))}
          disabled={tableFilter.page <= 0 || spinnerVisible}
        >
          <ChevronLeft size={20} />
        </Button>
        <p>{locales.current_page.format(tableFilter.page + 1, spinnerVisible ? '?' : numberOfPages)}</p>
        <Button
          size="icon"
          onClick={() => setTableFilter((prev) => ({ ...prev, page: ++prev.page }))}
          disabled={tableFilter.page >= numberOfPages - 1 || spinnerVisible}
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AccessTable;
