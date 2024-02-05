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
import type { DashboardData } from '~/typings';
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
      date: '28/10/2023',
      issuer: 'John Doe',
      paid: false,
    },
    {
      amount: 8200,
      date: '28/10/2023',
      issuer: 'Bobby Smith',
      paid: false,
    },
    {
      amount: 13999,
      date: '28/10/2023',
      issuer: 'Michael Jackson',
      paid: true,
    },
    {
      amount: 300,
      date: '28/10/2023',
      issuer: 'Some Body',
      paid: true,
    },
    {
      amount: 300,
      date: '28/10/2023',
      issuer: 'Some Body',
      paid: true,
    },
  ],
  transactions: [
    { amount: 1500, firstName: 'Olivia', lastName: 'Martin', date: '28/10/2023', type: 'inbound' },
    { amount: 2900, firstName: 'Jack', lastName: 'Sparrow', date: '28/10/2023', type: 'inbound' },
    { amount: 12700, firstName: 'John', lastName: 'Doe', date: '28/10/2023', type: 'outbound' },
    { amount: 3500, firstName: 'Svetozar', lastName: 'Miletić', date: '28/10/2023', type: 'inbound' },
    { amount: 3500, firstName: 'Svetozar', lastName: 'Miletić', date: '28/10/2023', type: 'inbound' },
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
    <div className='flex h-full w-full flex-col gap-2 p-2'>
      <div className='flex justify-between gap-2'>
        <AccountCard label={locales.account_money} amount={data.balance} icon={PiggyBank} />
        <AccountCard label={locales.cash_balance} amount={character.cash} icon={Banknote} />
      </div>
      <BaseCard title={locales.weekly_overview} icon={LineChart}>
        <OverviewChart data={data?.overview} />
      </BaseCard>
      <div className='flex flex-1 gap-2'>
        <BaseCard title={locales.recent_transactions} icon={Repeat} className='flex-1'>
          {data.transactions?.map((transaction) => (
            <TransactionItem
              key={`${transaction.firstName}-${transaction.date}`}
              amount={transaction.amount}
              firstName={transaction.firstName}
              lastName={transaction.lastName}
              date={transaction.date}
              type={transaction.type}
            />
          ))}
        </BaseCard>
        <BaseCard title={locales.recent_invoices} icon={FileStack} className='flex-1'>
          {data.invoices?.map((invoice) => (
            <InvoiceItem
              // Potentially duplicate key, need to convert date to timestamp
              key={`${invoice.issuer}-${invoice.date}`}
              amount={invoice.amount}
              date={invoice.date}
              issuer={invoice.issuer}
              paid={invoice.paid}
            />
          ))}
        </BaseCard>
      </div>
    </div>
  );
};

export default Dashboard;
