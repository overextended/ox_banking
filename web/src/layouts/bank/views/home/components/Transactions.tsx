import { Button, createStyles, Paper, Stack } from '@mantine/core';
import { TbArrowsRightLeft } from 'react-icons/tb';
import HeaderGroup from '../../../components/HeaderGroup';
import Transaction from '../../../components/Transaction';
import { TransactionProps } from '../../../../../atoms/transactions';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { defaultAccountAtom, selectedLogsAccountAtom } from '../../../../../atoms/account';
import SeeAllButton from './SeeAllButton';

const mockTransactions: TransactionProps[] = [
  { type: 'inbound', amount: 3500, accountOwner: 'Billy Smith', accountId: '3394379875902', date: '01/01/1999' },
  { type: 'outbound', amount: 7995, accountOwner: 'Police', accountId: '3394379875902', date: '19/08/2022' },
  { type: 'inbound', amount: 19120, accountOwner: 'Bob Jackson', accountId: '3394379875902', date: '31/02/2000' },
];

const useStyles = createStyles((theme) => ({
  transactions: {
    backgroundColor: theme.colors.dark[6],
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },

  paper: {
    height: 360,
  },

  stack: {
    height: '100%',
  },
}));

const Transactions: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Paper p="md" className={classes.paper}>
      <Stack justify="space-between" className={classes.stack}>
        <Stack>
          <HeaderGroup header="Recent Transactions" Icon={TbArrowsRightLeft} />
          <Stack>
            {mockTransactions.map((transaction, index) => (
              <Transaction {...transaction} key={`home-transaction-${index}`} />
            ))}
          </Stack>
        </Stack>
        <SeeAllButton/>
      </Stack>
    </Paper>
  );
};

export default Transactions;
