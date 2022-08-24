import {
  Box,
  Center,
  createStyles,
  Group,
  Pagination,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { TbArrowDownLeft, TbArrowsRightLeft, TbArrowUpRight, TbFileInvoice, TbSearch } from 'react-icons/tb';
import { formatNumber } from '../../../../../utils/formatNumber';
import { useRecoilValue } from 'recoil';
import { transactionsAtom } from '../../../../../atoms/transactions';
import NotFound from './NotFound';

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

const TransactionsList: React.FC = () => {
  const { classes } = useStyles();
  const transactions = useRecoilValue(transactionsAtom);

  return (
    <Stack justify={!transactions ? 'center' : undefined} sx={{ height: '100%' }}>
      {transactions ? (
        <>
          <TextInput placeholder="Search" icon={<TbSearch size={20} />} />
          {transactions.map((transaction, index) => (
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
        </>
      ) : (
        <NotFound Icon={TbArrowsRightLeft} label="No transactions found" />
      )}
    </Stack>
  );
};

export default TransactionsList;
