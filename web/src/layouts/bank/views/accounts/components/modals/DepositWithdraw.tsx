import { Box, Button, NumberInput, Stack, Text } from '@mantine/core';
import { formatNumber } from '../../../../../../utils/formatNumber';
import { useState } from 'react';
import { closeAllModals } from '@mantine/modals';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { TbCurrencyDollar } from 'react-icons/tb';

const DepositWithdraw: React.FC<{ variant: 'deposit' | 'withdraw' }> = ({ variant }) => {
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <Stack>
      <Box>
        <Text size="xs">{variant === 'withdraw' ? 'Account' : 'Cash'} Balance</Text>
        <Text weight={700} size={28}>
          {formatNumber(92575)}
        </Text>
      </Box>
      <Box>
        <Text size="xs">
          {variant === 'withdraw' ? 'Cash' : 'Account'} Balance: {formatNumber(13400)}
        </Text>
        <NumberInput
          onChange={(value) => setValue(value)}
          value={value}
          icon={<TbCurrencyDollar size={20} />}
          hideControls
        />
      </Box>
      <Button
        variant="light"
        uppercase
        onClick={() => {
          closeAllModals();
          // fetchNui(variant === 'withdraw' ? 'withdrawAccount' : 'depositAccount', value);
        }}
      >
        {variant === 'withdraw' ? 'Withdraw' : 'Deposit'}
      </Button>
    </Stack>
  );
};

export default DepositWithdraw;
