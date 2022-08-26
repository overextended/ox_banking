import { Center, Group, Loader, Paper, Stack, Text } from '@mantine/core';
import { Suspense } from 'react';
import InvoicesList from './InvoicesList';
import { TbFileInvoice } from 'react-icons/tb';
import HeaderGroup from '../../../components/HeaderGroup';

const Invoices: React.FC = () => {
  return (
    <Paper p="md">
      <Stack sx={{ height: '100%' }}>
        <HeaderGroup header="Invoices" Icon={TbFileInvoice} />
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
