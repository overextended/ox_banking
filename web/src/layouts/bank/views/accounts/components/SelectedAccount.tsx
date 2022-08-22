import { Box, Button, createStyles, Group, Paper, Stack, Text } from '@mantine/core';
import { Account } from '../index';

interface Props {
  mockAccounts: Account[];
  account: number;
}

const useStyles = createStyles((theme) => ({
  account: {
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.radius.sm,
    padding: 12,
    boxShadow: theme.shadows.sm,
    width: 345,

    '&:hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

const SelectedAccount: React.FC<Props> = ({ mockAccounts, account }) => {
  const { classes } = useStyles();

  return (
    <Paper p="md">
      <Group>
        <Stack>
          <Text>Selected Account</Text>
          <Group>
            <Box className={classes.account}>
              <Stack spacing="xl">
                <Stack spacing={0}>
                  <Text size="xl">{mockAccounts[account].label}</Text>
                  <Text size="xs">
                    {mockAccounts[account].type === 'personal'
                      ? 'Personal'
                      : mockAccounts[account].type === 'group'
                      ? 'Group'
                      : 'Shared'}{' '}
                    Account
                  </Text>
                </Stack>
                <Group position="apart">
                  <Text>${mockAccounts[account].balance}</Text>
                  <Text>{mockAccounts[account].id}</Text>
                </Group>
              </Stack>
            </Box>
            <Stack spacing="sm">
              <Button uppercase variant="light">
                Rename account
              </Button>
              <Button uppercase variant="light">
                Copy account number
              </Button>
            </Stack>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};

export default SelectedAccount;
