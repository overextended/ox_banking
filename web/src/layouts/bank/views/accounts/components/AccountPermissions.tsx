import { Button, Paper, Stack, Text } from '@mantine/core';
import { accountsAtom, selectedAccountAtom } from '../../../../../atoms/account';
import { useRecoilValue } from 'recoil';
import HeaderGroup from '../../../components/HeaderGroup';
import { TbUsers } from 'react-icons/tb';

const AccountPermissions: React.FC = () => {
  const accounts = useRecoilValue(accountsAtom);
  const selectedAccount = useRecoilValue(selectedAccountAtom);

  return (
    <>
      {selectedAccount !== null && (
        <>
          {accounts[selectedAccount].type === 'group' ||
            (accounts[selectedAccount].type === 'shared' && (
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
