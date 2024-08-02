import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { Account } from '@/typings';
import { queryClient } from '@/main';
import { fetchNui } from '@/utils/fetchNui';

const [accountsDataAtom] = atomsWithQuery<{ numberOfPages: number; accounts: Account[] }>(
  () => ({
    queryKey: ['accounts'],
    queryFn: async () => {
      const accounts = await fetchNui<Account[]>('getAccounts', null, {
        data: [
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
          {
            id: 932125,
            balance: 132032,
            label: 'Some name',
            owner: 'Some owner',
            type: 'shared',
            role: 'manager',
          },
          {
            id: 932126,
            balance: 132032,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
            role: 'owner',
          },
          {
            id: 932127,
            balance: 132032,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
            role: 'owner',
          },
          {
            id: 932128,
            balance: 132032,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
            role: 'owner',
          },
        ],
      });

      return {
        accounts,
        numberOfPages: Math.ceil((accounts.length + 1) / 4),
      };
    },
  }),
  () => queryClient
);

const activeAccountAtom = atom<Account | null>(null);

export const useAccounts = () => useAtomValue(accountsDataAtom);
export const useActiveAccount = () => useAtomValue(activeAccountAtom);
export const useSetActiveAccount = () => useSetAtom(activeAccountAtom);

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
