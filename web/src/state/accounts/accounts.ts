import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { Account } from '@/typings/accounts';
import { queryClient } from '@/main';
import { fetchNui } from '@/utils/fetchNui';

const activeAccountIdAtom = atom<number | null>(null);

const [accountsDataAtom] = atomsWithQuery<{ numberOfPages: number; accounts: Account[] }>(
  () => ({
    queryKey: ['accounts'],
    queryFn: async () => {
      const accounts = await fetchNui<Account[]>('getAccounts', null, {
        data: [
          {
            id: 932122,
            balance: 132032,
            isDefault: true,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
          },
          {
            id: 932123,
            balance: 132032,
            isDefault: true,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
          },
          {
            id: 932124,
            balance: 132032,
            isDefault: true,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
          },
          {
            id: 932125,
            balance: 132032,
            isDefault: true,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
          },
          {
            id: 932126,
            balance: 132032,
            isDefault: true,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
          },
          {
            id: 932127,
            balance: 132032,
            isDefault: true,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
          },
          {
            id: 932128,
            balance: 132032,
            isDefault: true,
            label: 'Some name',
            owner: 'Some owner',
            type: 'personal',
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

export const useAccounts = () => useAtomValue(accountsDataAtom);
export const useActiveAccountId = () => useAtomValue(activeAccountIdAtom);
export const useSetActiveAccountId = () => useSetAtom(activeAccountIdAtom);
