import { OxAccountPermissions, OxAccountRole } from '@communityox/ox_core';
import { DateRange } from 'react-day-picker';

export type AccountRole = OxAccountRole;
export type AccountPermissions = OxAccountPermissions;
export type AccessTableUser = {
  name: string;
  role: AccountRole;
  stateId: string;
};

export interface Transaction {
  id: number;
  date: number;
  amount: number;
  type: 'inbound' | 'outbound';
  message?: string;
}

export interface Invoice {
  id: number;
  amount: number;
  dueDate: number;
  paidAt?: number;
  label: string;
  status: 'paid' | 'unpaid' | 'overdue';
}

export interface DashboardData {
  balance: number;
  overview?: {
    day: string;
    income: number;
    expenses: number;
  }[];
  transactions?: Transaction[];
  invoices: Invoice[];
}

export interface AccessTableData {
  numberOfPages: number;
  users: AccessTableUser[];
}

export interface RawLogItem {
  id: number;
  fromId: number;
  toId: number;
  name: string;
  message: string;
  amount: number;
  date: number;
  fromAccountLabel?: string;
  toAccountLabel?: string;
}

export type LogItem = RawLogItem & {
  type: 'inbound' | 'outbound';
  newBalance: number;
};

export type LogsFilters = {
  search: string;
  page: number;
  date?: DateRange;
  type?: 'inbound' | 'outbound' | 'combined';
};

export type InvoicesFilters = {
  search: string;
  page: number;
  type: 'unpaid' | 'paid' | 'sent';
  date?: DateRange;
};

export type BaseInvoice = {
  id: number;
  type: 'unpaid' | 'paid' | 'sent';
  label: string;
  message: string;
  amount: number;
  dueDate: number;
  sentBy?: string;
  sentAt: number;
};

export type UnpaidInvoice = BaseInvoice & {
  type: 'unpaid';
};

export type PaidInvoice = BaseInvoice & {
  type: 'paid';
  paidBy: string;
  paidAt: number;
};

export type SentInvoice = BaseInvoice & {
  type: 'sent';
  status: 'paid' | 'sent' | 'overdue';
};
