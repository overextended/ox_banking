import React from 'react';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { ChevronLeft, ChevronRight, CreditCard, Plus } from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber';
import AccountCard from '@/layouts/bank/pages/accounts/components/AccountCard';
import { Button } from '@/components/ui/button';

const Accounts: React.FC = () => {
  return (
    <div className='w-full h-full p-2 flex flex-col overflow-hidden'>
      <BaseCard title='Accounts' icon={CreditCard} className='overflow-visible'>
        <div className='flex w-full gap-4 items-center justify-center'>
          <Button size='icon' className='rounded-full' disabled>
            <ChevronLeft />
          </Button>
          <div className='flex flex-1 justify-center gap-4'>
            <div
              className='p-4 items-center justify-center rounded-lg bg-background border border-dashed flex flex-col shadow w-[250px] hover:bg-secondary hover:scale-105 transition-all hover:cursor-pointer hover:-translate-y-1'
            >
              <Plus />
            </div>
            <AccountCard amount={Math.trunc(Math.random() * 1000000)} id={Math.trunc(Math.random() * 1000000)}
                         name='Personal' type='personal' />
            <AccountCard amount={Math.trunc(Math.random() * 1000000)} id={Math.trunc(Math.random() * 1000000)}
                         name='Personal' type='personal' />
            <AccountCard amount={Math.trunc(Math.random() * 1000000)} id={Math.trunc(Math.random() * 1000000)}
                         name='Personal' type='personal' />
          </div>
          <Button size='icon' className='rounded-full'>
            <ChevronRight />
          </Button>
        </div>
      </BaseCard>
    </div>
  );
};

export default Accounts;
