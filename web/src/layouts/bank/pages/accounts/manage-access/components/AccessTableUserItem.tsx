import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash, UserCog, UserMinus } from 'lucide-react';
import { AccessTableUser, AccountRole } from '~/typings';
import { useModal } from '@/components/ModalsProvider';
import ManageUserModal from '@/layouts/bank/pages/accounts/manage-access/modals/ManageUserModal';
import RemoveUserModal from '@/layouts/bank/pages/accounts/manage-access/modals/RemoveUserModal';
import locales from '@/locales';

const AccessTableUserItem: React.FC<AccessTableUser & { accountId: number; characterRole: AccountRole }> = (props) => {
  const { role, name, stateId, characterRole, accountId } = props;
  const modal = useModal();

  const ROLES = React.useMemo(
    () => ({
      owner: locales.owner,
      manager: locales.manager,
      contributor: locales.contributor,
    }),
    []
  );

  return (
    <div className="border-border grid grid-cols-4 place-items-center border-t py-4">
      <p>{name}</p>
      <p>{ROLES[role]}</p>
      <p>{stateId}</p>
      <div className="flex items-center gap-2">
        <Button
          disabled={role === 'owner' || role === characterRole}
          size="icon"
          onClick={() =>
            modal.open({
              title: locales.manage_access,
              children: <ManageUserModal accountId={accountId} targetStateId={stateId} defaultRole={role} />,
            })
          }
        >
          <UserCog size={20} />
        </Button>
        <Button
          disabled={role === 'owner' || role === characterRole}
          size="icon"
          variant="destructive"
          onClick={() =>
            modal.open({
              title: locales.remove_user,
              children: <RemoveUserModal targetStateId={stateId} accountId={accountId} />,
            })
          }
        >
          <UserMinus size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AccessTableUserItem;
