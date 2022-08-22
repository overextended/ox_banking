import { Paper, Select, Stack, Text } from '@mantine/core';
import { TbCreditCard } from 'react-icons/tb';

const AccountSelect: React.FC = () => {
  return (
    <Paper p="md">
      <Stack>
        <Text>Select account</Text>
        <Select
          icon={<TbCreditCard size={20} />}
          searchable
          nothingFound="No such account found."
          data={[
            { label: 'Personal', value: 'personal' },
            { label: 'Paycheck', value: 'paycheck' },
            { label: 'LSPD', value: 'lspd' },
          ]}
        />
      </Stack>
    </Paper>
  );
};

export default AccountSelect;
