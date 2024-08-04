import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { isEnvBrowser } from '@/utils/misc';

const bankVisibilityAtom = atom(false);
const atmVisibilityAtom = atom(false);

export const useSetBankVisibility = () => useSetAtom(bankVisibilityAtom);
export const useBankVisibility = () => useAtomValue(bankVisibilityAtom);
export const useBankVisibilityState = () => useAtom(bankVisibilityAtom);

export const useSetAtmVisibility = () => useSetAtom(atmVisibilityAtom);
export const useAtmVisibility = () => useAtomValue(atmVisibilityAtom);
export const useAtmVisibilityState = () => useAtom(atmVisibilityAtom);
