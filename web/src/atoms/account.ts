import { atom, selector, useRecoilValue } from 'recoil';
import selectedAccount from '../layouts/bank/views/accounts/components/SelectedAccount';

export interface Account {
  id: string;
  owner: string;
  name: string;
  balance: number;
  type: 'personal' | 'group' | 'shared';
  isDefault?: boolean;
}

const mockAccounts: Account[] = [
  {
    id: '9261979951215',
    owner: '1',
    name: 'Personal',
    balance: 163210,
    type: 'personal',
    isDefault: true,
  },
  {
    id: '3261949632187',
    owner: '1',
    name: 'Paycheck',
    balance: 0,
    type: 'personal',
  },
  {
    id: '1962134879551',
    owner: '10',
    name: 'SomeCompany LCC',
    balance: 23650,
    type: 'shared',
  },
  {
    id: '5979846231541',
    owner: 'police',
    name: 'LSPD',
    balance: 36400,
    type: 'group',
  },
];

export const accountsAtom = atom<Account[]>({ key: 'accounts', default: mockAccounts });

export const accountSearchAtom = atom<string>({
  key: 'accountSearch',
  default: '',
});

export const selectedAccountIndexAtom = atom<number | null>({ key: 'selectedAccountIndex', default: null });

export const filteredAccountsAtom = selector({
  key: 'filteredAccounts',
  get: ({ get }) => {
    const search = get(accountSearchAtom);
    const accounts = get(accountsAtom);
    if (search === '') return accounts;

    const searchedAccounts = accounts.filter((account) => {
      const regEx = new RegExp(search, 'gi');
      console.log(!account.name.match(regEx));
      if (!account.name.match(regEx) && !account.id.match(regEx)) return false;

      return true;
    });

    return searchedAccounts;
  },
});

export const useAccounts = () => useRecoilValue(filteredAccountsAtom);

export const selectedAccountAtom = selector({
  key: 'selectedAccount',
  get: ({ get }) => {
    const index = get(selectedAccountIndexAtom);
    if (index === null) return null;
    return get(accountsAtom)[index];
  },
});

export const useSelectedAccount = () => useRecoilValue(selectedAccountAtom);

export const logsAccountsAtom = selector<{ label: string; value: string }[]>({
  key: 'logsAccounts',
  get: ({ get }) => {
    const logsAccounts = get(accountsAtom).map((account) => ({ value: account.id, label: account.name }));
    return logsAccounts;
  },
});

export const selectedLogsAccountAtom = atom<string | null>({
  key: 'selectedLogsAccount',
  default: selector({
    key: 'defaultLogsAccount',
    get: ({ get }) => get(logsAccountsAtom)[0].value,
  }),
});

export const defaultAccountAtom = selector({
  key: 'defaultAccount',
  get: ({ get }) => {
    const account = get(accountsAtom).find((account) => account.isDefault);
    if (account) return account;
    // debug data for web
    return {
      id: '9261979951215',
      owner: '1',
      name: 'Personal',
      balance: 163210,
      type: 'personal',
      isDefault: true,
    } as Account;
  },
});
