import { Button, Group, Paper, Stack } from '@mantine/core';
import { useSelectedAccount } from '../../../../../atoms/account';
import { TbSettings } from 'react-icons/all';
import HeaderGroup from '../../../components/HeaderGroup';

const AccountSettings: React.FC = () => {
  const account = useSelectedAccount();

  return (
    <>
      {account !== null && (
        <Paper p="md" sx={{ height: '100%' }}>
          <Stack justify="space-between" sx={{ height: '100%' }}>
            <HeaderGroup header="Account Settings" Icon={TbSettings} />
            <Stack>
              <Group grow>
                <Button color="red" variant="outline" uppercase>
                  Transfer Account
                </Button>
                <Button
                  color="red"
                  variant="outline"
                  uppercase
                  disabled={account.type === 'shared' || account.type === 'group'}
                >
                  Convert to shared account
                </Button>
              </Group>
              <Button color="red" variant="outline" uppercase>
                Delete Account
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default AccountSettings;
