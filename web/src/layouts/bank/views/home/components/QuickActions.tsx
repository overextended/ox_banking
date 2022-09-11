import { Paper, Stack, createStyles } from '@mantine/core';
import { TbArrowsRightLeft, TbBolt, TbCash } from 'react-icons/tb';
import HeaderGroup from '../../../components/HeaderGroup';
import DepositWithdraw from '../../accounts/components/modals/DepositWithdraw';
import Transfer from '../../accounts/components/modals/Transfer';
import { useState } from 'react';
import { TbCreditCard, TbWallet } from 'react-icons/tb';
import { fetchNui } from '../../../../../utils/fetchNui';
import ActionButton from './ActionButton';
import { openModal } from '@mantine/modals';
import { useDefaultAccount } from '../../../../../atoms/account';

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.dark[6],
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    '&:hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

const QuickActions: React.FC = () => {
  const [amount, setAmount] = useState<number | undefined>();
  const defaultAccount = useDefaultAccount();
  const { classes } = useStyles();

  return (
    <Paper p="md" sx={{ height: '100%' }}>
      <Stack sx={{ height: '100%' }}>
        <HeaderGroup header="Quick Actions" Icon={TbBolt} />
        <Stack justify="space-between" sx={{ height: '100%' }} spacing={0}>
          <Stack justify="space-between" sx={{ height: '100%' }}>
            <ActionButton
              label="Deposit"
              Icon={TbCreditCard}
              onClick={() =>
                openModal({
                  title: 'Deposit',
                  children: <DepositWithdraw variant="deposit" balance={defaultAccount.balance} />,
                })
              }
            />
            <ActionButton
              label="Withdraw"
              Icon={TbWallet}
              onClick={() =>
                openModal({
                  title: 'Withdraw',
                  children: <DepositWithdraw variant="withdraw" balance={defaultAccount.balance} />,
                })
              }
            />
            <ActionButton
              label="Transfer"
              Icon={TbArrowsRightLeft}
              onClick={() =>
                openModal({
                  title: 'Deposit',
                  children: <Transfer balance={defaultAccount.balance} />,
                })
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default QuickActions;
