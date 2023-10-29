import React from 'react';
import { Briefcase, FileStack, LineChart, PiggyBank, Repeat } from 'lucide-react';
import AccountCard from '@/layouts/bank/pages/dashboard/components/AccountCard';
import OverviewChart from '@/layouts/bank/pages/dashboard/components/OverviewChart';
import TransactionItem from '@/layouts/bank/pages/dashboard/components/TransactionItem';
import InvoiceItem from '@/layouts/bank/pages/dashboard/components/InvoiceItem';

const Dashboard: React.FC = () => {
  return (
    <div className="w-full h-full p-2 flex gap-2 flex-col">
      <div className="flex gap-2 justify-between">
        <AccountCard label="Account money" amount={150000} icon={PiggyBank} />
        <AccountCard label="Paycheck money" amount={14872} icon={Briefcase} />
      </div>
      <div className="border flex h-full flex-col gap-4 rounded-lg shadow w-full p-4">
        <div className="flex justify-between items-center text-muted-foreground">
          <h2 className="font-bold">Overview</h2>
          <LineChart />
        </div>
        <OverviewChart />
      </div>
      <div className="flex gap-2">
        <div className="border flex gap-4 flex-col rounded-lg shadow p-4 flex-1">
          <div className="flex justify-between items-center text-muted-foreground">
            <h2 className="font-bold">Recent transactions</h2>
            <Repeat />
          </div>
          <TransactionItem amount={1500} firstName="Olivia" lastName="Martin" date="28/10/2023" type="inbound" />
          <TransactionItem amount={2900} firstName="Jack" lastName="Sparrow" date="28/10/2023" type="inbound" />
          <TransactionItem amount={12700} firstName="John" lastName="Doe" date="28/10/2023" type="outbound" />
          <TransactionItem amount={3500} firstName="Svetozar" lastName="Miletić" date="28/10/2023" type="inbound" />
          <TransactionItem amount={3500} firstName="Svetozar" lastName="Miletić" date="28/10/2023" type="inbound" />
        </div>
        <div className="border flex flex-col rounded-lg shadow gap-4 p-4 flex-1">
          <div className="flex justify-between items-center text-muted-foreground">
            <h2 className="font-bold">Recent invoices</h2>
            <FileStack />
          </div>
          <InvoiceItem amount={1500} date="28/10/2023" issuer="John Doe" paid={false} />
          <InvoiceItem amount={13999} date="28/10/2023" issuer="Michael Jackson" paid={true} />
          <InvoiceItem amount={8200} date="28/10/2023" issuer="Bobby Smith" paid={false} />
          <InvoiceItem amount={300} date="28/10/2023" issuer="Some Body" paid={true} />
          <InvoiceItem amount={300} date="28/10/2023" issuer="Some Body" paid={true} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
