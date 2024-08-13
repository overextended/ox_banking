import { OxAccountPermissions, OxAccountRoles } from '@overextended/ox_core';
import { DateRange } from 'react-day-picker';

export type AccountRole = OxAccountRoles;
export type AccountPermissions = OxAccountPermissions;
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

export interface RawLogItem {
  id: number;
  toId: number;
  name: string;
  message: string;
  amount: number;
  date: string;
  fromBalance?: number;
  toBalance?: number;
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
