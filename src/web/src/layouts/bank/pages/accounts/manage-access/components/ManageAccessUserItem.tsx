import React from 'react';
import { Button } from '@/components/ui/button';
import { User, UserCog, UserMinus } from 'lucide-react';
import { AccessTableUser, AccountRole } from '~/src/common/typings';
import { useModal } from '@/components/ModalsProvider';
import ManageUserModal from '@/layouts/bank/pages/accounts/manage-access/modals/ManageUserModal';
import RemoveUserModal from '@/layouts/bank/pages/accounts/manage-access/modals/RemoveUserModal';
import locales from '@/locales';

const ManageAccessUserItem: React.FC<AccessTableUser & { accountId: number; characterRole: AccountRole }> = (props) => {
  const { role, name, stateId, characterRole, accountId } = props;
  const modal = useModal();

  const ROLES: Record<AccountRole, string> = React.useMemo(
    () => ({
      owner: locales.owner,
      manager: locales.manager,
      contributor: locales.contributor,
      viewer: locales.viewer,
    }),
    []
  );

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow">
      <div className="flex items-center gap-4">
        <div className="bg-secondary text-secondary-foreground flex h-9 w-9 items-center justify-center rounded-lg">
          <User size={20} />
        </div>
        <div className="flex flex-col">
          <p>
            {name} / {stateId}
          </p>
          <p className="text-muted-foreground text-sm">{ROLES[role]}</p>
        </div>
      </div>
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

export default ManageAccessUserItem;
