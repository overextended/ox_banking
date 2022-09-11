import { Box, Button, Stack, Text } from '@mantine/core';
import { formatNumber } from '../../../../../../utils/formatNumber';
import { useState } from 'react';
import { closeAllModals } from '@mantine/modals';
import { fetchNui } from '../../../../../../utils/fetchNui';
import { useSelectedAccount } from '../../../../../../atoms/account';
import FormattedInput from '../../../../components/FormattedInput';
import { useCharacter } from '../../../../../../atoms/character';

const DepositWithdraw: React.FC<{ variant: 'deposit' | 'withdraw'; balance: number }> = ({ variant, balance }) => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const character = useCharacter();

  return (
    <Stack>
      <Box>
        <Text size="xs">{variant === 'withdraw' ? 'Account' : 'Cash'} Balance</Text>
        <Text weight={700} size={28}>
          {formatNumber(variant === 'withdraw' ? balance : character.cashBalance)}
        </Text>
      </Box>
      <Box>
        <FormattedInput
          value={value}
          onChange={(value) => setValue(value)}
          description={`${variant === 'withdraw' ? 'Cash' : 'Account'} Balance: ${formatNumber(
            variant === 'withdraw' ? character.cashBalance : balance
          )}`}
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
