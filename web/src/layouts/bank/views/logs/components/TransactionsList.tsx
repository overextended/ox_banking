import { Box, Pagination, Stack, TextInput } from '@mantine/core';
import { TbArrowsRightLeft, TbSearch } from 'react-icons/tb';
import { useRecoilValue } from 'recoil';
import { transactionsAtom } from '../../../../../atoms/transactions';
import NotFound from './NotFound';
import Transaction from '../../../components/Transaction';

const TransactionsList: React.FC = () => {
  const transactions = useRecoilValue(transactionsAtom);

  return (
    <Stack justify={!transactions ? 'center' : undefined} sx={{ height: '100%' }}>
      {transactions ? (
        <>
          <TextInput placeholder="Search" icon={<TbSearch size={20} />} />
          {transactions.map((transaction, index) => (
            <Transaction {...transaction} key={`transaction-${index}`} />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination total={10} />
          </Box>
        </>
      ) : (
        <NotFound Icon={TbArrowsRightLeft} label="No transactions found" />
      )}
    </Stack>
  );
};

export default TransactionsList;
