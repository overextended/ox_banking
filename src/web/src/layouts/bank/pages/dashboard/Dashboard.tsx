import React from 'react';
import { Banknote, FileStack, LineChart, PiggyBank, Repeat } from 'lucide-react';
import AccountCard from '@/layouts/bank/pages/dashboard/components/AccountCard';
import OverviewChart from '@/layouts/bank/pages/dashboard/components/OverviewChart';
import TransactionItem from '@/layouts/bank/pages/dashboard/components/TransactionItem';
import InvoiceItem from '@/layouts/bank/pages/dashboard/components/InvoiceItem';
import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { useCharacter } from '@/state/character';
import { useQuery } from '@tanstack/react-query';
import { fetchNui } from '@/utils/fetchNui';
import type { DashboardData } from '~/src/common/typings';
import LoadingDashboard from '@/layouts/bank/pages/dashboard/components/LoadingDashboard';

const MOCK_DASHBOARD: DashboardData = {
  balance: 56320,
  overview: [
    {
      day: 'Mon',
      income: Math.floor(Math.random() * 5000) + 1000,
      expenses: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      day: 'Tue',
      income: Math.floor(Math.random() * 5000) + 1000,
      expenses: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      day: 'Wed',
      income: Math.floor(Math.random() * 5000) + 1000,
      expenses: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      day: 'Thu',
      income: Math.floor(Math.random() * 5000) + 1000,
      expenses: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      day: 'Fri',
      income: Math.floor(Math.random() * 5000) + 1000,
      expenses: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      day: 'Sat',
      income: Math.floor(Math.random() * 5000) + 1000,
      expenses: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      day: 'Sun',
      income: Math.floor(Math.random() * 5000) + 1000,
      expenses: Math.floor(Math.random() * 5000) + 1000,
    },
  ],
  invoices: [
    {
      amount: 1500,
      label: 'SomeCompany LLC',
      id: 0,
      dueDate: '2024/08/28 13:00',
      status: 'overdue',
    },
    {
      amount: 5000,
      label: 'SomeCompany LLC',
      id: 1,
      dueDate: '2024/08/28 13:00',
      paidAt: '2024/08/25 09:07',
      status: 'paid',
    },
    {
      amount: 5000,
      label: 'SomeCompany LLC',
      id: 2,
      dueDate: '2024/08/28 13:00',
      paidAt: '2024/08/25 09:07',
      status: 'unpaid',
    },
  ],
  transactions: [
    { id: 0, amount: 1500, message: 'Salary', date: '28/10/2023', type: 'inbound' },
    { id: 1, amount: 2900, message: 'Salary', date: '28/10/2023', type: 'inbound' },
    { id: 2, amount: 12700, message: 'Withdraw', date: '28/10/2023', type: 'outbound' },
    { id: 3, amount: 3500, message: 'Deposit', date: '28/10/2023', type: 'inbound' },
    { id: 4, amount: 3500, message: 'Deposit', date: '28/10/2023', type: 'inbound' },
  ],
};

const Dashboard: React.FC = () => {
  const character = useCharacter();
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const resp = await fetchNui<DashboardData>('getDashboardData', null, {
        data: MOCK_DASHBOARD,
        delay: 1500,
      });

      return resp;
    },
  });

  if (isLoading) return <LoadingDashboard />;

  if (!data) return null;

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <div className="flex justify-between gap-2">
        <AccountCard label={locales.account_money} amount={data.balance} icon={PiggyBank} />
        <AccountCard label={locales.cash_balance} amount={character.cash} icon={Banknote} />
      </div>
      <BaseCard title={locales.weekly_overview} icon={LineChart}>
        <OverviewChart data={data?.overview} />
      </BaseCard>
      <div className="flex flex-1 gap-2">
        <BaseCard title={locales.recent_transactions} icon={Repeat} className="flex-1">
          {data.transactions?.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              amount={transaction.amount}
              message={transaction.message}
              date={transaction.date}
              type={transaction.type}
            />
          ))}
        </BaseCard>
        <BaseCard title={locales.recent_invoices} icon={FileStack} className="flex-1">
          {data.invoices?.map((invoice) => <InvoiceItem key={invoice.id} invoice={invoice} />)}
        </BaseCard>
      </div>
    </div>
  );
};

export default Dashboard;
