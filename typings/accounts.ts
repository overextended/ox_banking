export interface Account {
  accountId: number;
  label: string;
  owner?: string;
  group?: string;
  balance: number;
  isDefault: boolean;
  type: 'personal' | 'shared' | 'group';
}

export type DatabaseAccount = {
  id: number
  accountId: number
  balance: number
  isDefault: boolean
  label: string
  owner?: number
  group?: string
}
