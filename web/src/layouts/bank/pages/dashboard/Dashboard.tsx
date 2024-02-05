import React from 'react';
import { Banknote, FileStack, LineChart, PiggyBank, Repeat } from 'lucide-react';
import AccountCard from '@/layouts/bank/pages/dashboard/components/AccountCard';
import OverviewChart from '@/layouts/bank/pages/dashboard/components/OverviewChart';
import TransactionItem from '@/layouts/bank/pages/dashboard/components/TransactionItem';
import InvoiceItem from '@/layouts/bank/pages/dashboard/components/InvoiceItem';
import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { useCharacter } from '@/state/character';

const Dashboard: React.FC = () => {
  const character = useCharacter()

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <div className="flex justify-between gap-2">
        <AccountCard label={locales.account_money} amount={150000} icon={PiggyBank} />
        <AccountCard label={locales.cash_balance} amount={character.cash} icon={Banknote} />
      </div>
      <BaseCard title={locales.weekly_overview} icon={LineChart} className="h-full">
        <OverviewChart />
      </BaseCard>
      <div className="flex gap-2">
        <BaseCard title={locales.recent_transactions} icon={Repeat} className="flex-1">
          <TransactionItem amount={1500} firstName="Olivia" lastName="Martin" date="28/10/2023" type="inbound" />
          <TransactionItem amount={2900} firstName="Jack" lastName="Sparrow" date="28/10/2023" type="inbound" />
          <TransactionItem amount={12700} firstName="John" lastName="Doe" date="28/10/2023" type="outbound" />
          <TransactionItem amount={3500} firstName="Svetozar" lastName="Miletić" date="28/10/2023" type="inbound" />
          <TransactionItem amount={3500} firstName="Svetozar" lastName="Miletić" date="28/10/2023" type="inbound" />
        </BaseCard>
        <BaseCard title={locales.recent_invoices} icon={FileStack} className="flex-1">
          <InvoiceItem amount={1500} date="28/10/2023" issuer="John Doe" paid={false} />
          <InvoiceItem amount={13999} date="28/10/2023" issuer="Michael Jackson" paid={true} />
          <InvoiceItem amount={8200} date="28/10/2023" issuer="Bobby Smith" paid={false} />
          <InvoiceItem amount={300} date="28/10/2023" issuer="Some Body" paid={true} />
          <InvoiceItem amount={300} date="28/10/2023" issuer="Some Body" paid={true} />
        </BaseCard>
      </div>
    </div>
  );
};

export default Dashboard;
