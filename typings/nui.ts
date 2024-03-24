export type AccountRole = 'contributor' | 'manager' | 'owner';
export type AccessTableUser = {
  name: string;
  role: AccountRole;
  stateId: string;
};

export interface Transaction {
  date: string;
  amount: number;
  type: 'inbound' | 'outbound';
  message?: string;
}

export interface DashboardData {
  balance: number;
  overview?: {
    day: string;
    income: number;
    expenses: number;
  }[];
  transactions?: Transaction[];
  invoices?: {
    paid: boolean;
    amount: number;
    issuer: string;
    date: string;
  }[];
}

export interface AccessTableData {
  numberOfPages: number;
  users: AccessTableUser[];
}
