import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { isEnvBrowser } from '@/utils/misc';

const bankVisibilityAtom = atom(false);

export const useSetBankVisibility = () => useSetAtom(bankVisibilityAtom);
export const useBankVisibility = () => useAtomValue(bankVisibilityAtom);
export const useBankVisibilityState = () => useAtom(bankVisibilityAtom);
