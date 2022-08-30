import { Box, Stack, Text } from '@mantine/core';
import { TransactionProps } from '../atoms/transactions';
import { formatNumber } from '../utils/formatNumber';

const TransactionModal: React.FC<{ transaction: TransactionProps }> = ({ transaction }) => {
  return (
    <Stack>
      <Text size="xs">Transaction ID: 197751331194</Text>
      <Text size="xs">Date: {transaction.date}</Text>
      <Box>
        <Text size="xl">{transaction.type === 'inbound' ? 'From' : 'To'} account</Text>
        <Text>{transaction.account}</Text>
      </Box>
      <Box>
        <Text size="xl">Money {transaction.type === 'inbound' ? 'received' : 'sent'}</Text>
        <Text color={transaction.type === 'inbound' ? 'teal' : 'red'}>
          {transaction.type === 'inbound' ? '+' : '-'}
          {formatNumber(transaction.amount)}
        </Text>
      </Box>
      {transaction.message && (
        <Box>
          <Text size="xl">Message</Text>
          <Text size="md">{transaction.message}</Text>
        </Box>
      )}
    </Stack>
  );
};

export default TransactionModal;
