import React from 'react';
import { Briefcase, FileStack, LineChart, PiggyBank, Repeat } from 'lucide-react';
import AccountCard from '@/layouts/bank/pages/dashboard/components/AccountCard';
import OverviewChart from '@/layouts/bank/pages/dashboard/components/OverviewChart';
import TransactionItem from '@/layouts/bank/pages/dashboard/components/TransactionItem';
import InvoiceItem from '@/layouts/bank/pages/dashboard/components/InvoiceItem';
import BaseCard from '@/layouts/bank/components/BaseCard';

const Dashboard: React.FC = () => {
  return (
    <div className='w-full h-full p-2 flex gap-2 flex-col'>
      <div className='flex gap-2 justify-between'>
        <AccountCard label='Account money' amount={150000} icon={PiggyBank} />
        <AccountCard label='Paycheck money' amount={14872} icon={Briefcase} />
      </div>
      <BaseCard title='Weekly overview' icon={LineChart} className='h-full'>
        <OverviewChart />
      </BaseCard>
      <div className='flex gap-2'>
        <BaseCard title='Recent transactions' icon={Repeat} className='flex-1'>
          <TransactionItem amount={1500} firstName='Olivia' lastName='Martin' date='28/10/2023' type='inbound' />
          <TransactionItem amount={2900} firstName='Jack' lastName='Sparrow' date='28/10/2023' type='inbound' />
          <TransactionItem amount={12700} firstName='John' lastName='Doe' date='28/10/2023' type='outbound' />
          <TransactionItem amount={3500} firstName='Svetozar' lastName='Miletić' date='28/10/2023' type='inbound' />
          <TransactionItem amount={3500} firstName='Svetozar' lastName='Miletić' date='28/10/2023' type='inbound' />
        </BaseCard>
        <BaseCard title='Recent invoices' icon={FileStack} className='flex-1'>
          <InvoiceItem amount={1500} date='28/10/2023' issuer='John Doe' paid={false} />
          <InvoiceItem amount={13999} date='28/10/2023' issuer='Michael Jackson' paid={true} />
          <InvoiceItem amount={8200} date='28/10/2023' issuer='Bobby Smith' paid={false} />
          <InvoiceItem amount={300} date='28/10/2023' issuer='Some Body' paid={true} />
          <InvoiceItem amount={300} date='28/10/2023' issuer='Some Body' paid={true} />
        </BaseCard>
      </div>
    </div>
  );
};

export default Dashboard;
