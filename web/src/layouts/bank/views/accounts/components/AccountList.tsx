import { Box, Button, createStyles, Grid, Group, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import { openModal } from '@mantine/modals';
import CreateAccount from './modals/CreateAccount';
import {
  accountsAtom,
  accountSearchAtom,
  selectedAccountAtom,
  selectedAccountIdAtom,
  useAccounts,
} from '../../../../../atoms/account';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { formatNumber } from '../../../../../utils/formatNumber';
import { TbList } from 'react-icons/tb';
import HeaderGroup from '../../../components/HeaderGroup';
import AccountSearch from './AccountSearch';

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
  const accounts = useAccounts();
  const setSelectedAccountIndex = useSetRecoilState(selectedAccountIdAtom);

  return (
    <Grid.Col span={1}>
      <Paper p="md">
        <Stack>
          <HeaderGroup header="Available Accounts" Icon={TbList} />
          <AccountSearch />
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
                <Box
                  className={classes.account}
                  key={`account-${index}`}
                  onClick={() => setSelectedAccountIndex(account.id)}
                >
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
