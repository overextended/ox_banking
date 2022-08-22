import { Button, Paper, Stack, Text } from '@mantine/core';
import { Account } from '../index';

interface Props {
  mockAccounts: Account[];
  account: number;
}

const AccountPermissions: React.FC<Props> = ({ mockAccounts, account }) => {
  return (
    <>
      {mockAccounts[account].type === 'group' ||
        (mockAccounts[account].type === 'shared' && (
          <Paper p="md">
            <Stack>
              <Text>Account permissions</Text>
              <Button uppercase>Manage account permissions</Button>
            </Stack>
          </Paper>
        ))}
    </>
  );
};

export default AccountPermissions;
