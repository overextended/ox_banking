import { Button, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { FaExternalLinkAlt } from 'react-icons/fa';

const AccountActions: React.FC = () => {
  return (
    <Paper p="md">
      <Stack>
        <Text>Account actions</Text>
        <SimpleGrid cols={2}>
          <Button uppercase>Withdraw</Button>
          <Button uppercase>Deposit</Button>
          <Button uppercase>Transfer</Button>
          <Button uppercase rightIcon={<FaExternalLinkAlt />}>
            Transactions
          </Button>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};

export default AccountActions;
