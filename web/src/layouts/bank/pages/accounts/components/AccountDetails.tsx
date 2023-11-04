import React from 'react';
import { Copy, History, Landmark, Repeat, ScanText, Wallet } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatNumber } from '@/utils/formatNumber';
import AccountButton from '@/layouts/bank/pages/accounts/components/AccountButton';
import WithdrawModal from '@/layouts/bank/pages/accounts/modals/WithdrawModal';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { useModal } from '@/components/ModalsProvider';
import { useActiveAccountId } from '@/state/accounts/accounts';

const AccountDetails: React.FC = () => {
  const modal = useModal();
  const accountId = useActiveAccountId()!;

  return (
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
              children: <WithdrawModal accountId={accountId} />,
            })
          }
        />
        <AccountButton label="Deposit" icon={Landmark} />
        <AccountButton label="Transfer" icon={Repeat} />
        <AccountButton label="Logs" icon={History} />
      </div>
    </BaseCard>
  );
};

export default AccountDetails;
