import { Box, Button, NumberInput, Stack, Text } from '@mantine/core';
import { formatNumber } from '../../../../../../utils/formatNumber';
import { useState } from 'react';
import { closeAllModals } from '@mantine/modals';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { TbCurrencyDollar } from 'react-icons/tb';
import { useSelectedAccount } from '../../../../../../atoms/account';

const DepositWithdraw: React.FC<{ variant: 'deposit' | 'withdraw' }> = ({ variant }) => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const account = useSelectedAccount()!;

  return (
    <Stack>
      <Box>
        <Text size="xs">{variant === 'withdraw' ? 'Account' : 'Cash'} Balance</Text>
        <Text weight={700} size={28}>
          {formatNumber(variant === 'withdraw' ? account.balance : 9250)}
        </Text>
      </Box>
      <Box>
        <Text size="xs">
          {variant === 'withdraw' ? 'Cash' : 'Account'} Balance:{' '}
          {formatNumber(variant === 'withdraw' ? 9250 : account.balance)}
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
