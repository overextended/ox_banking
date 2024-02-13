import atomWithDebounce from '@/utils/atomWithDebounce';
import { useAtomValue, useSetAtom } from 'jotai';

export const accessTableSearchAtoms = atomWithDebounce('');

export const useAccessTableSearch = () => useAtomValue((accessTableSearchAtoms.currentValueAtom));
export const useIsAccessTableSearchDebouncing = () => useAtomValue(accessTableSearchAtoms.isDebouncingAtom);
export const useSetAccessTableDebounce = () => useSetAtom(accessTableSearchAtoms.debouncedValueAtom);
export const useDebouncedAccessTableSearch = () => useAtomValue(accessTableSearchAtoms.debouncedValueAtom);
