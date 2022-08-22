import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { Account } from '../index';

interface Props {
  mockAccounts: Account[];
  account: number;
}

const AccountSettings: React.FC<Props> = ({ mockAccounts, account }) => {
  return (
    <Paper p="md" sx={{ height: '100%' }}>
      <Stack justify="space-between" sx={{ height: '100%' }}>
        <Text>Account settings</Text>
        <Stack>
          <Group grow>
            <Button color="red" variant="outline" uppercase>
              Transfer Account
            </Button>
            <Button
              color="red"
              variant="outline"
              uppercase
              disabled={mockAccounts[account].type === 'shared' || mockAccounts[account].type === 'group'}
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
  );
};

export default AccountSettings;
