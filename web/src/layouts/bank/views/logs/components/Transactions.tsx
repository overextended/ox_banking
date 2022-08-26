import { Paper, Stack, Center, Loader } from '@mantine/core';
import { TbArrowsRightLeft } from 'react-icons/tb';
import { Suspense } from 'react';
import TransactionsList from './TransactionsList';
import HeaderGroup from '../../../components/HeaderGroup';

const Transactions: React.FC = () => {
  return (
    <Paper p="md">
      <Stack sx={{ height: '100%' }}>
        <HeaderGroup header="Transactions" Icon={TbArrowsRightLeft} />
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
