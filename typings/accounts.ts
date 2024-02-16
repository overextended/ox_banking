import { AccountRole } from './nui';

type AccountType = 'personal' | 'shared' | 'group';

export interface Account {
  id: number;
  label: string;
  owner?: string;
  group?: string;
  balance: number;
  isDefault?: boolean;
  type: AccountType;
  role: AccountRole;
}

export type DatabaseAccount = {
  id: number;
  balance: number;
  isDefault?: boolean;
  label: string;
  owner?: number;
  group?: string;
  type: AccountType;
};
