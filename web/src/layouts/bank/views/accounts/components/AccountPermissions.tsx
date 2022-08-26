import { Button, Paper, Stack, Text } from '@mantine/core';
import { useSelectedAccount } from '../../../../../atoms/account';
import HeaderGroup from '../../../components/HeaderGroup';
import { TbUsers } from 'react-icons/tb';

const AccountPermissions: React.FC = () => {
  const account = useSelectedAccount();

  return (
    <>
      {account !== null && (
        <>
          {account.type === 'group' ||
            (account.type === 'shared' && (
              <Paper p="md">
                <Stack>
                  <HeaderGroup header="Account Permissions" Icon={TbUsers} />
                  <Button uppercase>Manage account permissions</Button>
                </Stack>
              </Paper>
            ))}
        </>
      )}
    </>
  );
};

export default AccountPermissions;
