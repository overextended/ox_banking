import locales from '@/locales';
import permissions from '@/permissions';
import { AccountRole } from '@/typings';
import React from 'react';

const RolePermissions: React.FC<{ role: AccountRole }> = ({ role }) => {
  const rolePermissions = React.useMemo(
    () => Object.entries(permissions[role]).filter(([, value]) => value === 1),
    [role]
  );

  return (
    <>
      {rolePermissions.length > 0 && (
        <p>
          {locales.permissions}:{' '}
          {rolePermissions
            .map(([permission, value]) => {
              const key = `permission_${permission}` as keyof typeof locales;
              return value ? locales[key] : undefined;
            })
            .join(', ')}
        </p>
      )}
    </>
  );
};

export default RolePermissions;
