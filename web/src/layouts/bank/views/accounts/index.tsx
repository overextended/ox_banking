import { Box, Button, createStyles, Group, Paper, ScrollArea, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';

interface Account {
  id: string;
  label: string;
  type: 'personal' | 'group';
  balance: number;
  hasAccess?: boolean;
}

const mockAccounts: Account[] = [
  { id: '9261979951215', label: 'Personal', balance: 132320, hasAccess: true, type: 'personal' },
  { id: '7599131499775', label: 'Paycheck', balance: 0, hasAccess: true, type: 'personal' },
  { id: '6594979941133', label: 'LSPD', balance: 112000, hasAccess: true, type: 'group' },
];

const useStyles = createStyles((theme) => ({
  account: {
    backgroundColor: theme.colors.dark[6],
    borderRadius: theme.radius.sm,
    padding: 12,

    '&:hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

const Accounts: React.FC = () => {
  const { classes } = useStyles();

  return (
    <SimpleGrid cols={3} sx={{ height: '100%' }}>
      <Paper p="md">
        <Stack>
          <Text>Available accounts</Text>
          <TextInput placeholder="Search" icon={<TbSearch size={20} />} />
          <Button uppercase variant="light">
            Create account
          </Button>
          <ScrollArea style={{ height: 555 }} scrollbarSize={0}>
            <Stack>
              {mockAccounts.map((account) => (
                <Box className={classes.account}>
                  <Stack>
                    <Stack spacing={0}>
                      <Text size="xl">{account.label}</Text>
                      <Text size="xs">{account.type === 'personal' ? 'Personal' : 'Group'} Account</Text>
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
    </SimpleGrid>
  );
};

export default Accounts;
