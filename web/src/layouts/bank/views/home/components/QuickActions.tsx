import { Button, Group, NumberInput, Paper, Stack, Text } from '@mantine/core';
import { TbBolt, TbCurrencyDollar } from 'react-icons/tb';

const QuickActions: React.FC = () => {
  return (
    <Paper p="md" withBorder sx={{ height: '100%' }}>
      <Stack sx={{ height: '100%' }}>
        <Group position="apart">
          <Text>Quick Actions</Text>
          <TbBolt size={24} />
        </Group>
        <Stack justify="space-between" sx={{ height: '100%' }} spacing={0}>
          <NumberInput
            label="Amount"
            icon={<TbCurrencyDollar size={20} />}
            parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
            formatter={(value) => (value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '')}
          />
          <Stack>
            <Button color="blue" uppercase>
              Deposit
            </Button>
            <Button color="blue" uppercase>
              Withdraw
            </Button>
            <Button color="blue" uppercase>
              Transfer
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default QuickActions;
