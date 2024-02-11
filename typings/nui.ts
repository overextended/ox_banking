export type AccountRole = 'contributor' | 'manager' | 'owner';
export type AccessTableUser = {
  name: string;
  role: AccountRole;
  stateId: string;
};

export interface DashboardData {
  balance: number;
  overview?: {
    day: string;
    income: number;
    expenses: number;
  }[];
  transactions?: {
    firstName: string;
    lastName: string;
    date: string;
    amount: number;
    type: 'inbound' | 'outbound';
  }[];
  invoices?: {
    paid: boolean;
    amount: number;
    issuer: string;
    date: string;
  }[];
}

export interface AccessTableData {
  role: AccountRole;
  numberOfPages: number;
  users: AccessTableUser[];
}
