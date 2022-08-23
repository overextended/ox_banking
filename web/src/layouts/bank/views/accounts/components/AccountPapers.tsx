import { Grid, Stack } from '@mantine/core';
import SelectedAccount from './SelectedAccount';
import AccountActions from './AccountActions';
import AccountSettings from './AccountSettings';
import AccountPermissions from './AccountPermissions';
import { selectedAccountAtom } from '../../../../../atoms/account';
import { useRecoilValue } from 'recoil';

const AccountPapers: React.FC = () => {
  const selectedAccount = useRecoilValue(selectedAccountAtom);
  return (
    <Grid.Col span={2} sx={{ height: '100%' }}>
      {selectedAccount !== null && (
        <Stack>
          <SelectedAccount />
          <AccountActions />
          <AccountSettings />
          <AccountPermissions />
        </Stack>
      )}
    </Grid.Col>
  );
};

export default AccountPapers;
