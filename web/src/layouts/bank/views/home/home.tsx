import { Box, Stack, SimpleGrid } from '@mantine/core';
import { TbBriefcase, TbCash, TbCoin } from 'react-icons/tb';
import Invoices from './components/Invoices';
import Transactions from './components/Transactions';
import QuickActions from './components/QuickActions';
import Balance from './components/Balance';
import { defaultAccountAtom } from '../../../../atoms/account';
import { useRecoilValue } from 'recoil';

const Home: React.FC = () => {
  const account = useRecoilValue(defaultAccountAtom);

  return (
    <SimpleGrid cols={2}>
      <Stack>
        <Balance header="Account balance" Icon={TbCoin} value={account.balance.toString()} />
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
