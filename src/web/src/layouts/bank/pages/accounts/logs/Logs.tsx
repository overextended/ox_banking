import React from 'react';
import { ChevronLeft, ChevronRight, History } from 'lucide-react';
import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LogsTableItem from './components/LogsTableItem';

const DEBUG_TRANSACTIONS = [
  {
    id: 0,
    name: `Svetozar Miletic`,
    message: `Super very very long message haha xd`,
    amount: 3500,
    newBalance: 174200,
    type: 'inbound' as 'inbound' | 'outbound',
    date: '06/08/2024 15:17',
  },
  {
    id: 1,
    name: `Svetozar Miletic`,
    message: `Super very very long message haha xd`,
    amount: 3500,
    newBalance: 174200,
    type: 'outbound' as 'inbound' | 'outbound',
    date: '06/08/2024 12:33',
  },
];

const Logs: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <BaseCard title={locales.logs} icon={History} className="h-full gap-4">
        <div>
          <Input placeholder="Search..." />
        </div>
        <div className="flex items-center gap-2">
          <Button>Date range</Button>
          <Button>Type</Button>
        </div>
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="text-muted-foreground mb-2 grid grid-cols-[36px,repeat(5,1fr)] gap-2 border-b py-2 text-center text-sm">
              <p></p>
              <p>Name</p>
              <p>Message</p>
              <p>Amount</p>
              <p>New balance</p>
              <p>Timestamp</p>
            </div>
            {DEBUG_TRANSACTIONS.map((transaction) => (
              <LogsTableItem key={transaction.id} {...transaction} />
            ))}
          </div>
          <div className="nd flex items-center gap-4 self-end">
            <Button size="icon">
              <ChevronLeft size={20} />
            </Button>
            <p>0 / 0</p>
            <Button size="icon">
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </BaseCard>
    </div>
  );
};

export default Logs;
