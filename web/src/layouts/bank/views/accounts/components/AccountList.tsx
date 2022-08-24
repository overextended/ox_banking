import { Box, Button, createStyles, Grid, Group, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import { openModal } from '@mantine/modals';
import CreateAccount from './modals/CreateAccount';
import { accountsAtom, selectedAccountAtom } from '../../../../../atoms/account';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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

const AccountList: React.FC = () => {
  const { classes } = useStyles();
  const accounts = useRecoilValue(accountsAtom);
  const setSelectedAccount = useSetRecoilState(selectedAccountAtom);

  return (
    <Grid.Col span={1}>
      <Paper p="md">
        <Stack>
          <Text>Available accounts</Text>
          <TextInput placeholder="Search" icon={<TbSearch size={20} />} />
          <Button
            uppercase
            variant="light"
            onClick={() =>
              openModal({
                title: 'Create account',
                size: 'xs',
                children: <CreateAccount />,
              })
            }
          >
            Create account
          </Button>
          <ScrollArea style={{ height: 555 }} scrollbarSize={0}>
            <Stack>
              {accounts.map((account, index) => (
                <Box className={classes.account} key={`account-${index}`} onClick={() => setSelectedAccount(index)}>
                  <Stack spacing="xl">
                    <Stack spacing={0}>
                      <Text size="xl">{account.name}</Text>
                      <Text size="xs">
                        {account.type === 'personal' ? 'Personal' : account.type === 'group' ? 'Group' : 'Shared'}{' '}
                        Account
                      </Text>
                    </Stack>
                    <Group position="apart">
                      <Text>{formatNumber(account.balance)}</Text>
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
  );
};

export default AccountList;
