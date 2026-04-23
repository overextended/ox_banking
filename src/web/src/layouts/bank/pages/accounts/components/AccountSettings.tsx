import React from 'react';
import { ArrowRight, Pencil, Settings, Shield, Trash, Users } from 'lucide-react';
import AccountButton from '@/layouts/bank/pages/accounts/components/AccountButton';
import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { useModal } from '@/components/ModalsProvider';
import { useActiveAccount } from '@/state/accounts';
import DeleteAccountModal from '@/layouts/bank/pages/accounts/modals/DeleteAccountModal';
import { useNavigate } from 'react-router-dom';
import TransferAccountModal from '@/layouts/bank/pages/accounts/modals/TransferAccountModal';
import RenameAccountModal from '../modals/RenameAccountModal';
import ConvertAccountModal from '../modals/ConvertAccountModal';
import { hasPermission } from '@/permissions';

const AccountSettings: React.FC = () => {
  const modal = useModal();
  const account = useActiveAccount()!;
  const navigate = useNavigate();

  return (
    <BaseCard title={locales.settings} icon={Settings} className="h-fit flex-[0.75]">
      <div className="flex flex-col gap-2">
        <AccountButton
          label={locales.transfer_ownership}
          icon={ArrowRight}
          onClick={() =>
            modal.open({
              title: locales.transfer_ownership,
              children: <TransferAccountModal accountId={account.id} />,
            })
          }
          disabled={
            account.type === 'personal' ||
            account.type === 'group' ||
            (account.type === 'shared' && !hasPermission('transferOwnership', account.role))
          }
        />
        <AccountButton
          label={locales.convert_to_shared}
          icon={Users}
          onClick={() =>
            modal.open({
              title: locales.convert_account_title,
              description: locales.convert_account_description,
              size: 'lg',
              children: <ConvertAccountModal accountId={account.id} />,
            })
          }
          disabled={account.type === 'shared' || account.type === 'group' || account.isDefault}
        />
        <AccountButton
          onClick={() =>
            modal.open({
              title: locales.rename_account,
              description: locales.rename_account_description,
              children: <RenameAccountModal accountId={account.id} initialName={account.label} />,
            })
          }
          disabled={account.type === 'group' || !hasPermission('manageAccount', account.role)}
          label={locales.rename}
          icon={Pencil}
        />
        <AccountButton
          label={locales.manage_access}
          icon={Shield}
          disabled={account.type !== 'shared' || !hasPermission('manageUser', account.role)}
          onClick={() => navigate(`/accounts/manage-access/${account.id}`)}
        />
        <AccountButton
          label={locales.delete_account}
          icon={Trash}
          variant="destructive"
          disabled={account.isDefault || account.type === 'group' || !hasPermission('closeAccount', account.role)}
          onClick={() =>
            modal.open({
              title: locales.delete_account,
              size: 'lg',
              children: <DeleteAccountModal account={account} />,
            })
          }
        />
      </div>
    </BaseCard>
  );
};

export default AccountSettings;
