import { atom, useAtomValue, useSetAtom } from 'jotai';
import { isEnvBrowser } from '@/utils/misc';

const bankVisibilityAtom = atom(isEnvBrowser());

export const useSetBankVisibility = () => useSetAtom(bankVisibilityAtom);
export const useBankVisibility = () => useAtomValue(bankVisibilityAtom);
