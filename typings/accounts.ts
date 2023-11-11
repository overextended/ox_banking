export interface Account {
  id: number;
  label: string;
  owner?: string;
  group?: string;
  balance: number;
  isDefault: boolean;
  type: 'personal' | 'shared' | 'group';
}

export type DatabaseAccount = {
  id: number
  balance: number
  isDefault: boolean
  label: string
  owner?: number
  group?: string
}
