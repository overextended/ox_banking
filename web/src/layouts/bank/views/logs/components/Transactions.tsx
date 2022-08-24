import { Paper, Stack, Text, Center, Loader } from '@mantine/core';
import { Suspense } from 'react';
import TransactionsList from './TransactionsList';

const Transactions: React.FC = () => {
  return (
    <Paper p="md">
      <Stack sx={{ height: '100%' }}>
        <Text>Transactions</Text>
        <Suspense
          fallback={
            <Center sx={{ height: '100%' }}>
              <Loader />
            </Center>
          }
        >
          <TransactionsList />
        </Suspense>
      </Stack>
    </Paper>
  );
};

export default Transactions;
