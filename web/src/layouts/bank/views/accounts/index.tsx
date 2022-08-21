import {
  Box,
  Button,
  createStyles,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Grid,
} from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useState } from 'react';

interface Account {
  id: string;
  label: string;
  type: 'personal' | 'group' | 'shared';
  balance: number;
  hasAccess?: boolean;
}

const mockAccounts: Account[] = [
  { id: '9261979951215', label: 'Personal', balance: 132320, hasAccess: true, type: 'personal' },
  { id: '7599131499775', label: 'Paycheck', balance: 0, hasAccess: true, type: 'personal' },
  { id: '6594979941133', label: 'LSPD', balance: 112000, hasAccess: true, type: 'group' },
  { id: '6594979941133', label: 'SomeCompany LLC', balance: 94560, hasAccess: true, type: 'shared' },
];

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

const Accounts: React.FC = () => {
  const { classes } = useStyles();
  const [account, setAccount] = useState<number | null>(null);

  return (
    <Grid sx={{ height: '100%' }} columns={3}>
      <Grid.Col span={1}>
        <Paper p="md">
          <Stack>
            <Text>Available accounts</Text>
            <TextInput placeholder="Search" icon={<TbSearch size={20} />} />
            <Button uppercase variant="light">
              Create account
            </Button>
            <ScrollArea style={{ height: 555 }} scrollbarSize={0}>
              <Stack>
                {mockAccounts.map((account, index) => (
                  <Box className={classes.account} key={`account-${index}`} onClick={() => setAccount(index)}>
                    <Stack spacing="xl">
                      <Stack spacing={0}>
                        <Text size="xl">{account.label}</Text>
                        <Text size="xs">
                          {account.type === 'personal' ? 'Personal' : account.type === 'group' ? 'Group' : 'Shared'}{' '}
                          Account
                        </Text>
                      </Stack>
                      <Group position="apart">
                        <Text>${account.balance}</Text>
                        <Text>{account.id}</Text>
                      </Group>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </ScrollArea>
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col span={2} sx={{ height: '100%' }}>
        {account !== null && (
          <>
            <Stack>
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
              <Paper p="md">
                <Stack>
                  <Text>Account actions</Text>
                  <SimpleGrid cols={2}>
                    <Button uppercase>Withdraw</Button>
                    <Button uppercase>Deposit</Button>
                    <Button uppercase>Transfer</Button>
                    <Button uppercase rightIcon={<FaExternalLinkAlt />}>
                      Transactions
                    </Button>
                  </SimpleGrid>
                </Stack>
              </Paper>
              <Paper p="md" sx={{ height: '100%' }}>
                <Stack justify="space-between" sx={{ height: '100%' }}>
                  <Text>Account settings</Text>
                  <Stack>
                    <Group grow>
                      <Button color="red" variant="outline" uppercase>
                        Transfer Account
                      </Button>
                      <Button color="red" variant="outline" uppercase>
                        Convert to shared account
                      </Button>
                    </Group>
                    <Button color="red" variant="outline" uppercase>
                      Delete Account
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Accounts;
