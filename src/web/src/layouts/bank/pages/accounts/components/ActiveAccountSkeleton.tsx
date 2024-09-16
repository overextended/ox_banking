import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import BaseCard from '../../../components/BaseCard';
import locales from '@/locales';
import {
  ArrowRight,
  History,
  Landmark,
  Pencil,
  ReceiptText,
  Repeat,
  ScanText,
  Settings,
  Shield,
  Trash,
  Users,
  Wallet,
} from 'lucide-react';
import AccountButton from './AccountButton';

const ActiveAccountSkeleton: React.FC = () => {
  return (
    <div className="flex h-full w-full gap-2">
      <BaseCard title="Details" icon={ScanText} className="h-fit flex-1">
        <div className="grid grid-cols-[1.5fr_repeat(2,1fr)] gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">{locales.account_name}</p>
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">{locales.account_owner}</p>
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">{locales.account_number}</p>
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">{locales.disposable_amount}</p>
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">{locales.account_type}</p>
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">{locales.account_role}</p>
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col gap-2">
          <AccountButton label={locales.withdraw} icon={Wallet} disabled />
          <AccountButton label={locales.deposit} icon={Landmark} disabled />
          <AccountButton label={locales.transfer} icon={Repeat} disabled />
          <AccountButton disabled label={locales.invoices} icon={ReceiptText} />
          <AccountButton disabled label={locales.logs} icon={History} />
        </div>
      </BaseCard>
      <BaseCard title={locales.settings} icon={Settings} className="h-fit flex-[0.75]">
        <div className="flex flex-col gap-2">
          <AccountButton label={locales.transfer_ownership} icon={ArrowRight} disabled />
          <AccountButton label={locales.convert_to_shared} icon={Users} disabled />
          <AccountButton disabled label={locales.rename} icon={Pencil} />
          <AccountButton label={locales.manage_access} icon={Shield} disabled />
          <AccountButton label={locales.delete_account} icon={Trash} variant="destructive" disabled />
        </div>
      </BaseCard>
    </div>
  );
};

export default ActiveAccountSkeleton;
