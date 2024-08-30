import React from 'react';
import UnpaidInvoicesContainer from './UnpaidInvoicesContainer';
import PaidInvoicesContainer from './PaidInvoicesContainer';
import SentInvoicesContainer from './SentInvoicesContainer';
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
import SkeletonInvoices from './SkeletonInvoices';

const InvoicesContainer: React.FC<{ accountId: number }> = ({ accountId }) => {
  const debouncedFilters = useDebouncedInvoicesFilters();
  const filters = useInvoicesFilters();
  const setFilters = useSetInvoicesFiltersDebounce();
  const isDebouncing = useIsInvoicesFiltersDebouncing();

  const [maxPages, setMaxPages] = React.useState(0);

  const query = useQuery<{ invoices: Array<UnpaidInvoice | PaidInvoice | SentInvoice>; numberOfPages: number }>(
    {
      queryKey: ['invoices', accountId, debouncedFilters],
      gcTime: 0,
      staleTime: 0,
      queryFn: async () => {
        const data = await fetchNui<{
          invoices: Array<UnpaidInvoice | PaidInvoice | SentInvoice>;
          numberOfPages: number;
        }>(
          'getInvoices',
          { accountId, filters: debouncedFilters },
          {
            data: {
              numberOfPages: 1,
              invoices: [
                {
                  id: 0,
                  type: 'unpaid',
                  label: 'SomeOtherAccount LLC',
                  message: 'Bill',
                  amount: 3000,
                  dueDate: '2024/08/28 13:00',
                },
                {
                  id: 1,
                  type: 'unpaid',
                  label: 'SomeOtherAccount LLC',
                  message: 'Bill',
                  amount: 3000,
                  dueDate: '2024/08/28 13:00',
                },
              ] satisfies UnpaidInvoice[],
            },
            delay: 3000,
          }
        );

        setMaxPages(data.numberOfPages);

        return data;
      },
    },
    queryClient
  );

  return (
    <div className="flex h-full flex-col justify-between">
      {query.isLoading || isDebouncing ? (
        <SkeletonInvoices />
      ) : (
        <>
          {filters.type === 'unpaid' && <UnpaidInvoicesContainer invoices={query.data!.invoices as UnpaidInvoice[]} />}
          {filters.type === 'paid' && <PaidInvoicesContainer invoices={query.data!.invoices as PaidInvoice[]} />}
          {filters.type === 'sent' && <SentInvoicesContainer invoices={query.data!.invoices as SentInvoice[]} />}
        </>
      )}
      <Pagination
        maxPages={maxPages}
        page={filters.page}
        setPage={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
};

export default InvoicesContainer;
