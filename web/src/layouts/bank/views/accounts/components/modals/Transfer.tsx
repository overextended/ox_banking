import { Box, Autocomplete, Stack, Button, NumberInput, Text } from '@mantine/core';
import { TbCreditCard, TbCurrencyDollar } from 'react-icons/tb';
import { closeAllModals } from '@mantine/modals';
import { formatNumber } from '../../../../../../utils/formatNumber';
import { useState } from 'react';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { isEnvBrowser } from '../../../../../../utils/misc';

const Transfer: React.FC<{ accounts: { label: string; value: string }[] }> = ({ accounts }) => {
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState<number | undefined>();

  return (
    <Stack>
      <Box>
        <Text size="xs">Account Balance</Text>
        <Text weight={700} size={28}>
          {formatNumber(92575)}
        </Text>
      </Box>
      <Autocomplete
        placeholder="To account"
        data={accounts}
        icon={<TbCreditCard size={20} />}
        onChange={(value) => setAccount(value)}
        value={account}
      />
      <NumberInput
        icon={<TbCurrencyDollar size={20} />}
        hideControls
        placeholder="Amount"
        onChange={(value) => setAmount(value)}
        value={amount}
      />
      <Button
        variant="light"
        uppercase
        onClick={async () => {
          if (isEnvBrowser()) return closeAllModals();
          const resp = await fetchNui('transferMoney', { account, amount });
          if (resp) return closeAllModals();
          else fetchNui('notify', 'No such account found.');
        }}
      >
        Transfer
      </Button>
    </Stack>
  );
};

export default Transfer;
