import { useModal } from '@/components/ModalsProvider';
import BaseCard from '@/layouts/bank/components/BaseCard';
import AccountButton from '@/layouts/bank/pages/accounts/components/AccountButton';
import DepositWithdrawModal from '@/layouts/bank/pages/accounts/modals/DepositWithdrawModal';
import TransferModal from '@/layouts/bank/pages/accounts/modals/TransferModal';
import locales from '@/locales';
import { hasPermission } from '@/permissions';
import { useActiveAccount } from '@/state/accounts/accounts';
import { formatNumber } from '@/utils/formatNumber';
import { History, Landmark, ReceiptText, Repeat, ScanText, Wallet } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CopyAccountNumber from './CopyAccountNumber';

const AccountDetails: React.FC = () => {
  const modal = useModal();
  const account = useActiveAccount()!;
  const navigate = useNavigate();

  return (
    <BaseCard title="Details" icon={ScanText} className="flex-1">
      <div className="grid grid-cols-[1.5fr_repeat(2,1fr)] gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-muted-foreground text-xs">{locales.account_name}</p>
            <p className="line-clamp-1">{account.label}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-muted-foreground text-xs">{locales.account_owner}</p>
            <p className="line-clamp-1">{account.owner || '-'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-muted-foreground text-xs">{locales.account_number}</p>
            <div className="flex items-center gap-2">
              <p>{account.id}</p>
              <CopyAccountNumber accountNumber={account.id} />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-muted-foreground text-xs">{locales.disposable_amount}</p>
            <p>{formatNumber(account.balance)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-muted-foreground text-xs">{locales.account_type}</p>
            <p>
              {account.type === 'personal'
                ? locales.personal_account
                : account.type === 'shared'
                  ? locales.shared_account
                  : locales.group_account}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-muted-foreground text-xs">{locales.account_role}</p>
            <p>{locales[account.role]}</p>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-2">
        <AccountButton
          label={locales.withdraw}
          icon={Wallet}
          disabled={!hasPermission('withdraw', account.role)}
          onClick={() =>
            modal.open({
              title: locales.withdraw,
              children: <DepositWithdrawModal account={account} />,
            })
          }
        />
        <AccountButton
          label={locales.deposit}
          icon={Landmark}
          disabled={!hasPermission('deposit', account.role)}
          onClick={() =>
            modal.open({
              title: locales.deposit,
              children: <DepositWithdrawModal account={account} isDeposit={true} />,
            })
          }
        />
        <AccountButton
          label={locales.transfer}
          icon={Repeat}
          disabled={!hasPermission('withdraw', account.role)}
          onClick={() => modal.open({ title: locales.transfer, children: <TransferModal account={account} /> })}
        />
        <AccountButton
          onClick={() => navigate(`/accounts/invoices/${account.id}`)}
          disabled={!hasPermission('manageAccount', account.role)}
          label={locales.invoices}
          icon={ReceiptText}
        />
        <AccountButton
          onClick={() => navigate(`/accounts/logs/${account.id}`)}
          disabled={!hasPermission('viewHistory', account.role)}
          label={locales.logs}
          icon={History}
        />
      </div>
    </BaseCard>
  );
};

export default AccountDetails;
