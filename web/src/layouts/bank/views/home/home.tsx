import { Box, Stack, SimpleGrid } from '@mantine/core';
import { TbBriefcase, TbCash, TbCoin } from 'react-icons/tb';
import Invoices from './components/Invoices';
import Transactions from './components/Transactions';
import QuickActions from './components/QuickActions';
import Balance from './components/Balance';
import { useDefaultAccount } from '../../../../atoms/account';

const Home: React.FC = () => {
  const account = useDefaultAccount();

  return (
    <SimpleGrid cols={2}>
      <Stack>
        <Balance header="Account Balance" Icon={TbCoin} value={account.balance} />
        <Balance header="Paycheck Balance" Icon={TbBriefcase} value={1000} />
        <Balance header="Cash Balance" Icon={TbCash} value={9520} />
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
