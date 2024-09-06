import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { Account } from '@/typings';
import { queryClient } from '@/main';
import { fetchNui } from '@/utils/fetchNui';

const DEBUG_ACCOUNTS: Account[] = [
  {
    id: 932122,
    balance: 132032,
    label: 'Some name',
    owner: 'Some owner',
    type: 'personal',
    role: 'owner',
  },
  {
    id: 932123,
    balance: 0,
    label: 'Some name',
    owner: 'Some owner',
    type: 'shared',
    role: 'viewer',
  },
  {
    id: 932124,
    balance: 132032,
    label: 'My Account',
    isDefault: true,
    owner: 'Some owner',
    type: 'personal',
    role: 'owner',
  },
];

const [accountsDataAtom] = atomsWithQuery<{ numberOfPages: number; accounts: Account[] }>(
  () => ({
    queryKey: ['accounts'],
    refetchOnMount: false,
    queryFn: async () => {
      const accounts = await fetchNui<Account[]>('getAccounts', null, {
        data: DEBUG_ACCOUNTS,
        delay: 3000,
      });

      const defaultAccount = accounts.find((account) => account.isDefault)!;

      return {
        accounts: [defaultAccount, ...accounts.filter((account) => !account.isDefault)],
        numberOfPages: Math.ceil((accounts.length + 1) / 4),
      };
    },
  }),
  () => queryClient
);

const activeAccountIdAtom = atom<number | null>(null);

const activeAccountAtom = atom<Promise<Account | null>>(async (get) => {
  const accountId = get(activeAccountIdAtom);
  const { accounts } = await get(accountsDataAtom);

  if (!accounts || accounts.length === 0) return null;

  return accounts.find((account) => account.id === accountId) || null;
});

export const useAccounts = () => useAtomValue(accountsDataAtom);
export const useActiveAccount = () => useAtomValue(activeAccountAtom);
export const useSetActiveAccountId = () => useSetAtom(activeAccountIdAtom);
export const useActiveAccountId = () => useAtomValue(activeAccountIdAtom);

export function updateAccountProperty<K extends keyof Account>(
  accountId: number,
  propertyKey: K,
  propertyValue: Account[K]
) {
  queryClient.setQueriesData(
    { queryKey: ['accounts'] },
    (data: { numberOfPages: number; accounts: Account[] } | undefined) => {
      if (!data) return;

      const targetAccount = data.accounts.find((acc) => acc.id === accountId);

      if (!targetAccount) return;

      const account = { ...targetAccount, [propertyKey]: propertyValue } as Account;

      return { ...data, accounts: data.accounts.map((acc) => (acc.id === account.id ? account : acc)) };
    }
  );
}
