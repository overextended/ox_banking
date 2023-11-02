import { atom, useAtomValue, useSetAtom } from 'jotai';

const activeAccountIdAtom = atom<number | null>(null);

export const useActiveAccountId = () => useAtomValue(activeAccountIdAtom);
export const useSetActiveAccountId = () => useSetAtom(activeAccountIdAtom);
