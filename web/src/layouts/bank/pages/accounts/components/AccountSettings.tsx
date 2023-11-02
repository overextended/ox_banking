import React from 'react';
import { ArrowRight, Pencil, Settings, Shield, Trash, Users } from 'lucide-react';
import AccountButton from '@/layouts/bank/pages/accounts/components/AccountButton';
import BaseCard from '@/layouts/bank/components/BaseCard';

const AccountSettings: React.FC = () => {
  return (
    <BaseCard title="Settings" icon={Settings} className="h-fit flex-[0.75]">
      <div className="flex flex-col gap-2">
        <AccountButton label="Transfer ownership" icon={ArrowRight} />
        <AccountButton label="Convert to shared" icon={Users} />
        <AccountButton label="Rename" icon={Pencil} />
        <AccountButton label="Manage permissions" icon={Shield} />
        <AccountButton label="Delete account" icon={Trash} variant="destructive" />
      </div>
    </BaseCard>
  );
};

export default AccountSettings;
