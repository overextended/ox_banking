import { Box, Paper, Text, Title, Stack, Group, SimpleGrid } from '@mantine/core';
import { TbBriefcase, TbCash, TbCoin } from 'react-icons/tb';
import Invoices from './components/Invoices';
import Transactions from './components/Transactions';
import QuickActions from './components/QuickActions';

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
        <Paper p="md" withBorder>
          <Stack>
            <Group position="apart">
              <Text>Paycheck balance</Text>
              <TbBriefcase size={24} />
            </Group>
            <Title>$0</Title>
          </Stack>
        </Paper>
        <Paper p="md" withBorder>
          <Stack>
            <Group position="apart">
              <Text>Cash balance</Text>
              <TbCash size={24} />
            </Group>
            <Title>$9,832</Title>
          </Stack>
        </Paper>
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
