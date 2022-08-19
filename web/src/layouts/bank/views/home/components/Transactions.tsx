import { Box, Button, createStyles, Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { TbArrowDownLeft, TbArrowUpRight, TbArrowsLeftRight } from 'react-icons/tb';

const mockTransactions: { type: 'inbound' | 'outbound'; amount: number; account: string; date: string }[] = [
  { type: 'inbound', amount: 3500, account: 'Billy', date: '01/01/1999' },
  { type: 'outbound', amount: 7995, account: 'Bob', date: '19/08/2022' },
  { type: 'inbound', amount: 19120, account: 'Billy', date: '31/02/2000' },
];

const useStyles = createStyles((theme) => ({
  transactions: {
    backgroundColor: theme.colors.dark[6],
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },

  paper: {
    height: 360,
  },

  stack: {
    height: '100%',
  },
}));

const Transactions: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Paper p="md" withBorder className={classes.paper}>
      <Stack justify="space-between" className={classes.stack}>
        <Stack>
          <Group position="apart">
            <Text>Recent Transactions</Text>
            <TbArrowsLeftRight size={20} />
          </Group>
          <Stack>
            {mockTransactions.map((transaction) => (
              <Box className={classes.transactions}>
                <Group position="apart">
                  <Group>
                    <ThemeIcon size="lg" color={transaction.type === 'inbound' ? 'teal' : 'red'} variant="light">
                      {transaction.type === 'inbound' ? <TbArrowDownLeft size={24} /> : <TbArrowUpRight size={24} />}
                    </ThemeIcon>
                    <Stack spacing={0}>
                      <Text>{transaction.account}</Text>
                      <Text size="xs" color="dark.2">
                        {transaction.date}
                      </Text>
                    </Stack>
                  </Group>
                  {transaction.type === 'inbound' ? (
                    <Text color="teal" weight={700}>
                      +${transaction.amount}
                    </Text>
                  ) : (
                    <Text color="red" weight={700}>
                      -${transaction.amount}
                    </Text>
                  )}
                </Group>
              </Box>
            ))}
          </Stack>
        </Stack>
        <Button uppercase color="teal">
          See all
        </Button>
      </Stack>
    </Paper>
  );
};

export default Transactions;
