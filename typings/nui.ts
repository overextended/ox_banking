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
    date: string;
    amount: number;
    reason: string;
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
  numberOfPages: number;
  users: AccessTableUser[];
}
