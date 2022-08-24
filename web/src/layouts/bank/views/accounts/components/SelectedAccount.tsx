import { Box, Button, createStyles, Group, Paper, Stack, Text } from '@mantine/core';
import { accountsAtom, selectedAccountAtom } from '../../../../../atoms/account';
import { useRecoilValue } from 'recoil';
import { formatNumber } from '../../../../../utils/formatNumber';

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

const SelectedAccount: React.FC = () => {
  const { classes } = useStyles();
  const accounts = useRecoilValue(accountsAtom);
  const selectedAccount = useRecoilValue(selectedAccountAtom);

  return (
    <>
      {selectedAccount !== null && (
        <Paper p="md">
          <Group>
            <Stack>
              <Text>Selected Account</Text>
              <Group>
                <Box className={classes.account}>
                  <Stack spacing="xl">
                    <Stack spacing={0}>
                      <Text size="xl">{accounts[selectedAccount].name}</Text>
                      <Text size="xs">
                        {accounts[selectedAccount].type === 'personal'
                          ? 'Personal'
                          : accounts[selectedAccount].type === 'group'
                          ? 'Group'
                          : 'Shared'}{' '}
                        Account
                      </Text>
                    </Stack>
                    <Group position="apart">
                      <Text>{formatNumber(accounts[selectedAccount].balance)}</Text>
                      <Text>{accounts[selectedAccount].id}</Text>
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
      )}
    </>
  );
};

export default SelectedAccount;
