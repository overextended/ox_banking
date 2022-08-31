import { Box, Button, Stack, Text } from '@mantine/core';
import { formatNumber } from '../../../../../../utils/formatNumber';
import { useState } from 'react';
import { closeAllModals } from '@mantine/modals';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { useSelectedAccount } from '../../../../../../atoms/account';
import FormattedInput from '../../../../components/FormattedInput';

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
        <FormattedInput value={value} onChange={(value) => setValue(value)} />
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
