import { Box, createStyles, Group, Pagination, Paper, Stack, Text, TextInput, ThemeIcon, Tooltip } from '@mantine/core';
import { TbArrowDownLeft, TbArrowUpRight, TbSearch } from 'react-icons/tb';
import { formatNumber } from '../../../../../utils/formatNumber';

const mockTransactions: {
  type: 'inbound' | 'outbound';
  amount: number;
  account: string;
  date: string;
  message?: string;
}[] = [
  { type: 'inbound', amount: 3500, account: 'Billy', date: '01/01/1999' },
  { type: 'outbound', amount: 7995, account: 'Bob', date: '19/08/2022' },
  { type: 'inbound', amount: 19120, account: 'Billy', date: '31/02/2000' },
  { type: 'inbound', amount: 3500, account: 'Billy', date: '01/01/1999' },
  { type: 'outbound', amount: 7995, account: 'Bob', date: '19/08/2022' },
];

const useStyles = createStyles((theme) => ({
  transactions: {
    backgroundColor: theme.colors.dark[6],
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,

    '&:hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

const Transactions: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Paper p="md">
      <Stack>
        <Text>Transactions</Text>
        <TextInput placeholder="Search" icon={<TbSearch size={20} />} />
        <Stack>
          {mockTransactions.map((transaction, index) => (
            <Tooltip label="Click for details" withArrow transition="pop" key={`transaction-${index}`}>
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
                      +{formatNumber(transaction.amount)}
                    </Text>
                  ) : (
                    <Text color="red" weight={700}>
                      -{formatNumber(transaction.amount)}
                    </Text>
                  )}
                </Group>
              </Box>
            </Tooltip>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination total={10} />
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Transactions;
