import { atom, selector } from 'recoil';

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
export const selectedAccountAtom = atom<number | null>({ key: 'selectedAccount', default: null });
export const defaultAccountAtom = selector({
  key: 'defaultAccount',
  get: ({ get }) => {
    const account = get(accountsAtom).find((account) => account.isDefault);
    if (account) return account;
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
