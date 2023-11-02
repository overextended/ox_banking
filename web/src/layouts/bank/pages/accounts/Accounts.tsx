import React from 'react';
import BaseCard from '@/layouts/bank/components/BaseCard';
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Plus,
  ScanText,
  Settings,
  Wallet,
  Repeat,
  Landmark,
  Copy,
  History,
  ArrowRight,
  Users,
  Pencil,
  Shield,
  Trash,
  Check,
} from 'lucide-react';
import AccountCard from '@/layouts/bank/pages/accounts/components/AccountCard';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/formatNumber';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import AccountButton from '@/layouts/bank/pages/accounts/components/AccountButton';
import { useModal } from '@/components/ModalsProvider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import WithdrawModal from '@/layouts/bank/pages/accounts/modals/WithdrawModal';

const Accounts: React.FC = () => {
  const modal = useModal();

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2">
      <BaseCard title="Accounts" icon={CreditCard} className="overflow-visible">
        <div className="flex w-full items-center justify-center gap-4">
          <Button size="icon" className="rounded-full" disabled>
            <ChevronLeft />
          </Button>
          <div className="flex flex-1 justify-center gap-4">
            <div className="flex w-[250px] flex-col items-center justify-center rounded-lg border border-dashed bg-background p-4 shadow transition-all hover:-translate-y-1 hover:scale-105 hover:cursor-pointer hover:bg-secondary">
              <Plus />
            </div>
            <AccountCard
              amount={Math.trunc(Math.random() * 1000000)}
              id={Math.trunc(Math.random() * 1000000)}
              name="Personal"
              type="personal"
            />
            <AccountCard
              amount={Math.trunc(Math.random() * 1000000)}
              id={Math.trunc(Math.random() * 1000000)}
              name="Personal"
              type="personal"
            />
            <AccountCard
              amount={Math.trunc(Math.random() * 1000000)}
              id={Math.trunc(Math.random() * 1000000)}
              name="Personal"
              type="personal"
            />
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
      <div className="flex w-full gap-2">
        <BaseCard title="Details" icon={ScanText} className="flex-1">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">Account name</p>
                <p>Personal</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">Account type</p>
                <p>Personal account</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">Account number</p>
                <div className="flex items-center gap-2">
                  <p>{Math.trunc(Math.random() * 1000000)}</p>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <button className="flex items-center">
                        <Copy size={14} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Copy</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">Disposable amount</p>
                <p>{formatNumber(Math.trunc(Math.random() * 1000000))}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground">Account owner</p>
              <p>Jack Sparrow</p>
            </div>
          </div>
          <div className="flex h-full flex-col gap-2">
            <AccountButton
              label="Withdraw"
              icon={Wallet}
              onClick={() =>
                modal.open({
                  title: 'Withdraw',
                  children: <WithdrawModal />,
                })
              }
            />
            <AccountButton label="Deposit" icon={Landmark} />
            <AccountButton label="Transfer" icon={Repeat} />
            <AccountButton label="Logs" icon={History} />
          </div>
        </BaseCard>
        <BaseCard title="Settings" icon={Settings} className="h-fit flex-[0.75]">
          <div className="flex flex-col gap-2">
            <AccountButton label="Transfer ownership" icon={ArrowRight} />
            <AccountButton label="Convert to shared" icon={Users} />
            <AccountButton label="Rename" icon={Pencil} />
            <AccountButton label="Manage permissions" icon={Shield} />
            <AccountButton label="Delete account" icon={Trash} variant="destructive" />
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default Accounts;
