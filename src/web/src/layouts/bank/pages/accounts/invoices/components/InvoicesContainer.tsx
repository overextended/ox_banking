import React from 'react';
import UnpaidInvoicesTable from './UnpaidInvoicesTable';
import PaidInvoicesTable from './PaidInvoicesTable';
import SentInvoicesTable from './SentInvoicesTable';
import {
  useInvoicesFilters,
  useSetInvoicesFiltersDebounce,
  useDebouncedInvoicesFilters,
} from '@/state/accounts/invoices';
import Pagination from '@/layouts/bank/components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/main';
import { PaidInvoice, SentInvoice, UnpaidInvoice } from '~/src/common/typings';
import { fetchNui } from '@/utils/fetchNui';
import { useIsInvoicesFiltersDebouncing } from '@/state/accounts/invoices';

const InvoicesContainer: React.FC<{ accountId: number }> = ({ accountId }) => {
  const debouncedFilters = useDebouncedInvoicesFilters();
  const filters = useInvoicesFilters();
  const setFilters = useSetInvoicesFiltersDebounce();
  const isDeboucing = useIsInvoicesFiltersDebouncing();

  const query = useQuery<Array<UnpaidInvoice | PaidInvoice | SentInvoice>>(
    {
      queryKey: ['invoices', accountId, debouncedFilters],
      gcTime: 0,
      staleTime: 0,
      queryFn: async () => {
        return await fetchNui<Array<UnpaidInvoice | PaidInvoice | SentInvoice>>(
          'getInvoices',
          {
            accountId,
            filters: debouncedFilters,
          },
          {
            data: [
              {
                id: 0,
                type: 'unpaid',
                label: 'SomeOtherAccount LLC',
                message: 'Bill',
                amount: 3000,
                dueDate: '2024/08/28 13:00',
              },
            ] satisfies UnpaidInvoice[],
            delay: 3000,
          }
        );
      },
    },
    queryClient
  );

  if (query.isLoading || isDeboucing) return <>Loading...</>;

  return (
    <div className="flex h-full flex-col justify-between">
      {filters.type === 'unpaid' && <UnpaidInvoicesTable invoices={query.data as UnpaidInvoice[]} />}
      {filters.type === 'paid' && <PaidInvoicesTable invoices={query.data as PaidInvoice[]} />}
      {filters.type === 'sent' && <SentInvoicesTable invoices={query.data as SentInvoice[]} />}
      <Pagination maxPages={3} page={filters.page} setPage={(page) => setFilters((prev) => ({ ...prev, page }))} />
    </div>
  );
};

export default InvoicesContainer;
