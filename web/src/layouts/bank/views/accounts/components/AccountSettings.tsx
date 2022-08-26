import { Button, Group, Paper, Stack } from '@mantine/core';
import { accountsAtom, selectedAccountAtom } from '../../../../../atoms/account';
import { TbSettings } from 'react-icons/all';
import { useRecoilValue } from 'recoil';
import HeaderGroup from '../../../components/HeaderGroup';

const AccountSettings: React.FC = () => {
  const accounts = useRecoilValue(accountsAtom);
  const selectedAccount = useRecoilValue(selectedAccountAtom);

  return (
    <>
      {selectedAccount !== null && (
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
                  disabled={accounts[selectedAccount].type === 'shared' || accounts[selectedAccount].type === 'group'}
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
