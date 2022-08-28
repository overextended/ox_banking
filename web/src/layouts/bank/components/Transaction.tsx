import { Box, createStyles, Group, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { TbArrowDownLeft, TbArrowUpRight } from 'react-icons/tb';
import { TransactionProps } from '../../../atoms/transactions';
import { formatNumber } from '../../../utils/formatNumber';

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

const Transaction: React.FC<TransactionProps> = (transaction) => {
  const { classes } = useStyles();

  return (
    <Tooltip label="Click for details" withArrow transition="pop">
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
  );
};

export default Transaction;
