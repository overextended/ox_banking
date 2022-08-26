import { Grid, Stack } from '@mantine/core';
import SelectedAccount from './SelectedAccount';
import AccountActions from './AccountActions';
import AccountSettings from './AccountSettings';
import AccountPermissions from './AccountPermissions';
import { useSelectedAccount } from '../../../../../atoms/account';

const AccountPapers: React.FC = () => {
  const account = useSelectedAccount();

  return (
    <Grid.Col span={2} sx={{ height: '100%' }}>
      {account !== null && (
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
