import { Stack, SimpleGrid } from '@mantine/core';
import Invoices from './components/invoices/Invoices';
import Transactions from './components/transactions/Transactions';
import AccountSelect from './components/AccountSelect';

const Logs: React.FC = () => {
  return (
    <Stack sx={{ height: '100%' }}>
      <AccountSelect />
      <SimpleGrid cols={2} sx={{ height: '100%' }}>
        <Transactions />
        <Invoices />
      </SimpleGrid>
    </Stack>
  );
};

export default Logs;
