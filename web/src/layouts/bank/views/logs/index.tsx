import { Stack, SimpleGrid } from '@mantine/core';
import Invoices from './components/Invoices';
import Transactions from './components/Transactions';
import AccountSelect from './components/AccountSelect';
import { Suspense } from 'react';

const Logs: React.FC = () => {
  return (
    <Stack sx={{ height: '100%' }}>
      <AccountSelect />
      <SimpleGrid cols={2} sx={{ height: '100%' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Transactions />
        </Suspense>
        <Invoices />
      </SimpleGrid>
    </Stack>
  );
};

export default Logs;
