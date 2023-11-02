import React from 'react';
import { ChevronLeft, ChevronRight, CreditCard, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateAccountModal from '@/layouts/bank/pages/accounts/modals/CreateAccountModal';
import AccountCard from '@/layouts/bank/pages/accounts/components/AccountCard';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { useModal } from '@/components/ModalsProvider';
import { useActiveAccountId } from '@/state/accounts/accounts';

type Account = {
  name: string;
  id: number;
  amount: number;
  type: 'personal' | 'shared' | 'group';
};

const DEBUG_ACCOUNTS: Account[] = [
  {
    amount: Math.trunc(Math.random() * 1000000),
    id: Math.trunc(Math.random() * 1000000),
    name: 'Personal',
    type: 'personal',
  },
  {
    amount: Math.trunc(Math.random() * 1000000),
    id: Math.trunc(Math.random() * 1000000),
    name: 'The bois',
    type: 'shared',
  },
  {
    amount: Math.trunc(Math.random() * 1000000),
    id: Math.trunc(Math.random() * 1000000),
    name: 'LSPD',
    type: 'shared',
  },
];

const CharacterAccounts: React.FC = () => {
  const modal = useModal();
  const activeAccountId = useActiveAccountId();

  return (
    <BaseCard title="Accounts" icon={CreditCard} className="overflow-visible">
      <div className="flex w-full items-center justify-center gap-4">
        <Button size="icon" className="rounded-full" disabled>
          <ChevronLeft />
        </Button>
        <div className="flex flex-1 justify-center gap-4">
          <div
            onClick={() =>
              modal.open({
                title: 'Create account',
                children: <CreateAccountModal />,
              })
            }
            className="flex w-[250px] flex-col items-center justify-center rounded-lg border border-dashed bg-background p-4 shadow transition-all hover:-translate-y-1 hover:scale-105 hover:cursor-pointer hover:bg-secondary"
          >
            <Plus />
          </div>
          {DEBUG_ACCOUNTS.map((account) => (
            <AccountCard key={account.id} {...account} active={account.id === activeAccountId} />
          ))}
        </div>
        <Button size="icon" className="rounded-full">
          <ChevronRight />
        </Button>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <div className="h-[5px] w-[5px] rounded-full bg-primary" />
        <div className="h-[5px] w-[5px] rounded-full bg-muted" />
        <div className="h-[5px] w-[5px] rounded-full bg-muted" />
      </div>
    </BaseCard>
  );
};

export default CharacterAccounts;
