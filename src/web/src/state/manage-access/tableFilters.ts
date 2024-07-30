import atomWithDebounce from '@/utils/atomWithDebounce';
import { useAtomValue, useSetAtom } from 'jotai';

export const accessTableFiltersAtoms = atomWithDebounce({
  search: '',
  page: 0,
});

export const useAccessTableFilters = () => useAtomValue((accessTableFiltersAtoms.currentValueAtom));
export const useIsAccessTableFiltersDebouncing = () => useAtomValue(accessTableFiltersAtoms.isDebouncingAtom);
export const useSetAccessTableFiltersDebounce = () => useSetAtom(accessTableFiltersAtoms.debouncedValueAtom);
export const useDebouncedAccessTableFilters = () => useAtomValue(accessTableFiltersAtoms.debouncedValueAtom);
