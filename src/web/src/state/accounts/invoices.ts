import type { InvoicesFilters } from '~/src/common/typings';
import atomWithDebounce from '@/utils/atomWithDebounce';
import { useAtomValue, useSetAtom } from 'jotai/index';

export const invoicesDebounceAtom = atomWithDebounce<InvoicesFilters>({
  search: '',
  date: undefined,
  page: 0,
  type: 'unpaid',
});

export const useInvoicesFilters = () => useAtomValue(invoicesDebounceAtom.currentValueAtom);
export const useIsInvoicesFiltersDebouncing = () => useAtomValue(invoicesDebounceAtom.isDebouncingAtom);
export const useSetInvoicesFiltersDebounce = () => useSetAtom(invoicesDebounceAtom.debouncedValueAtom);
export const useDebouncedInvoicesFilters = () => useAtomValue(invoicesDebounceAtom.debouncedValueAtom);
