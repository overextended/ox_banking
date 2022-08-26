import { Box, Button, createStyles, Group, Paper, Stack, Text } from '@mantine/core';
import { useSelectedAccount } from '../../../../../atoms/account';
import { formatNumber } from '../../../../../utils/formatNumber';
import HeaderGroup from '../../../components/HeaderGroup';
import { TbCreditCard } from 'react-icons/tb';

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
  const account = useSelectedAccount();

  return (
    <>
      {account !== null && (
        <Paper p="md">
          <Group>
            <Stack sx={{ width: '100%' }}>
              <HeaderGroup header="Selected Account" Icon={TbCreditCard} />
              <Group>
                <Box className={classes.account}>
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
