import { Paper, Stack, Text, Center, Loader, Group } from '@mantine/core';
import { TbArrowsRightLeft } from 'react-icons/tb';
import { Suspense } from 'react';
import TransactionsList from './TransactionsList';

const Transactions: React.FC = () => {
  return (
    <Paper p="md">
      <Stack sx={{ height: '100%' }}>
        <Group position="apart">
          <Text>Transactions</Text>
          <TbArrowsRightLeft size={24} />
        </Group>
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
