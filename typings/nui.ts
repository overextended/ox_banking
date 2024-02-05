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
