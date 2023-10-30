import React from 'react';
import BaseCard from '@/layouts/bank/components/BaseCard';
import {
  ChevronLeft,
  ChevronRight,
  Coins,
  CreditCard,
  Plus,
  ScanText,
  Settings,
  Wallet,
  Percent,
  PiggyBank, Repeat, Landmark, Copy, History,
} from 'lucide-react';
import AccountCard from '@/layouts/bank/pages/accounts/components/AccountCard';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/formatNumber';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const Accounts: React.FC = () => {
  return (
    <div className='w-full h-full p-2 gap-2 flex flex-col overflow-hidden'>
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
        <div className='flex gap-2 w-full items-center justify-center'>
          <div className='rounded-full w-[5px] h-[5px] bg-primary' />
          <div className='rounded-full w-[5px] h-[5px] bg-muted' />
          <div className='rounded-full w-[5px] h-[5px] bg-muted' />
        </div>
      </BaseCard>
      <div className='flex w-full h-full gap-2'>
        <BaseCard title='Selected account' icon={ScanText} className='flex-1'>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-4 flex-1'>
              <div className='flex flex-col'>
                <p className='text-muted-foreground text-xs'>Account name</p>
                <p>Personal</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-muted-foreground text-xs'>Account type</p>
                <p>Personal account</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-muted-foreground text-xs'>Account number</p>
                <div className='flex gap-2 items-center'>
                  <p>{Math.trunc(Math.random() * 1000000)}</p>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger>
                      <button className='flex items-center'>
                        <Copy size={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Copy
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className='flex flex-col'>
                <p className='text-muted-foreground text-xs'>Account owner</p>
                <p>Jack Sparrow</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-muted-foreground text-xs'>Disposable amount</p>
                <p>{formatNumber(Math.trunc(Math.random() * 1000000))}</p>
              </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
              <Button
                variant='secondary'
                className='flex flex-col h-fit gap-1 items-center'>
                <Wallet />
                Withdraw
              </Button>
              <Button
                variant='secondary'
                className='flex flex-col h-fit gap-1 items-center'>
                <Landmark />
                Deposit
              </Button>
              <Button
                variant='secondary'
                className='flex flex-col h-fit gap-1 items-center'>
                <Repeat />
                Transfer
              </Button>
              <Button
                variant='secondary'
                className='flex flex-col h-fit gap-1 items-center'>
                <History />
                Account logs
              </Button>
            </div>
          </div>
        </BaseCard>
        <BaseCard title='Settings' icon={Settings} className='flex-1'>
          <div className='flex flex-col gap-2'>
            <Button variant='secondary'>Transfer ownership</Button>
            <Button variant='secondary'>Convert to shared</Button>
            <Button variant='secondary'>Rename</Button>
            <Button variant='secondary'>Manage permissions</Button>
            <Button variant='destructive'>Delete account</Button>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default Accounts;
