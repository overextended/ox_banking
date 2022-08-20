import { Box, Paper, Text, Title, Stack, Group, SimpleGrid } from '@mantine/core';
import { TbBriefcase, TbCash, TbCoin } from 'react-icons/tb';
import Invoices from './components/Invoices';
import Transactions from './components/Transactions';
import QuickActions from './components/QuickActions';
import Balance from './components/Balance';

const Home: React.FC = () => {
  return (
    <SimpleGrid cols={2}>
      <Stack>
        <Balance header="Account balance" Icon={TbCoin} value="132,320" />
        <Balance header="Paycheck balance" Icon={TbBriefcase} value="0" />
        <Balance header="Cash balance" Icon={TbCash} value="9,520" />
        <QuickActions />
      </Stack>
      <Box>
        <Stack>
          <Transactions />
          <Invoices />
        </Stack>
      </Box>
    </SimpleGrid>
  );
};

export default Home;
