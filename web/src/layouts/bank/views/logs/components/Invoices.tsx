import { Center, Loader, Paper, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';

import InvoicesList from './InvoicesList';

const Invoices: React.FC = () => {
  return (
    <Paper p="md">
      <Stack sx={{ height: '100%' }}>
        <Text>Invoices</Text>
        <Suspense
          fallback={
            <Center sx={{ height: '100%' }}>
              <Loader />
            </Center>
          }
        >
          <InvoicesList />
        </Suspense>
      </Stack>
    </Paper>
  );
};

export default Invoices;
