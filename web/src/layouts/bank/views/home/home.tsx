import {
  Box,
  Paper,
  Text,
  Title,
  Stack,
  Group,
  Grid,
  SimpleGrid,
  Button,
  TextInput,
  createStyles,
} from '@mantine/core';
import { TbArrowsLeftRight, TbCoin, TbCurrencyDollar } from 'react-icons/tb';
import Invoices from './components/Invoices';
import Transactions from './components/Transactions';

const Home: React.FC = () => {
  return (
    <SimpleGrid cols={2}>
      <Stack>
        <Paper p="md" withBorder>
          <Stack>
            <Group position="apart">
              <Text>Account balance</Text>
              <TbCoin size={24} />
            </Group>
            <Title>$132,320</Title>
          </Stack>
        </Paper>
        {/*<Paper p="md" withBorder>*/}
        {/*  <Stack>*/}
        {/*    <TextInput label="Amount" icon={<TbCurrencyDollar size={20} />} />*/}
        {/*    <Button variant="default">Deposit</Button>*/}
        {/*    <Button>Withdraw</Button>*/}
        {/*    <Button>Transfer</Button>*/}
        {/*  </Stack>*/}
        {/*</Paper>*/}
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
