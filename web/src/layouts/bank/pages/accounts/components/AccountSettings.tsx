import React from 'react';
import { ArrowRight, Pencil, Settings, Shield, Trash, Users } from 'lucide-react';
import AccountButton from '@/layouts/bank/pages/accounts/components/AccountButton';
import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { useModal } from '@/components/ModalsProvider';
import { useActiveAccount } from '@/state/accounts';
import DeleteAccountModal from '@/layouts/bank/pages/accounts/modals/DeleteAccountModal';
import { useNavigate } from 'react-router-dom';

const AccountSettings: React.FC = () => {
  const modal = useModal();
  const account = useActiveAccount()!;
  const navigate = useNavigate();

  return (
    <BaseCard title={locales.settings} icon={Settings} className='h-fit flex-[0.75]'>
      <div className='flex flex-col gap-2'>
        <AccountButton
          label={locales.transfer_ownership}
          icon={ArrowRight}
          disabled={account.type === 'personal' || account.type === 'group'}
        />
        <AccountButton
          label={locales.convert_to_shared}
          icon={Users}
          disabled={account.type === 'shared' || account.type === 'group' || account.isDefault}
        />
        <AccountButton label={locales.rename} icon={Pencil} />
        <AccountButton label={locales.manage_access} icon={Shield} disabled={account.type === 'personal'}
                       onClick={() => navigate(`/accounts/manage-access/${account.id}`)} />
        <AccountButton
          label={locales.delete_account}
          icon={Trash}
          variant='destructive'
          disabled={account.isDefault}
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
