import locales from '@/locales';
import permissions from '@/permissions';
import React from 'react';

const RolePermissions: React.FC<{ role: string }> = ({ role }) => {
  const roles = React.useMemo(() => Object.keys(permissions).filter((role) => role !== 'owner'), [permissions]);
  const rolePermissions = React.useMemo(
    () => Object.entries(permissions[role]).filter(([permission, value]) => value === 1),
    [role]
  );

  return (
    <>
      {rolePermissions.length > 0 && (
        <p>
          {locales.permissions}:{' '}
          {rolePermissions
            // @ts-expect-error
            .map(([permission, value]) => (value ? locales[`permission_${permission}`] : undefined))
            .join(', ')}
        </p>
      )}
    </>
  );
};

export default RolePermissions;
