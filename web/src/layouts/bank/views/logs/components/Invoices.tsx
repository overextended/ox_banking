import { Center, Group, Loader, Paper, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';
import InvoicesList from './InvoicesList';
import { TbFileInvoice } from 'react-icons/tb';

const Invoices: React.FC = () => {
  return (
    <Paper p="md">
      <Stack sx={{ height: '100%' }}>
        <Group position="apart">
          <Text>Invoices</Text>
          <TbFileInvoice size={24} />
        </Group>
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
