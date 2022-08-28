import {
  Badge,
  Box,
  Center,
  createStyles,
  Group,
  Pagination,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { TbArrowsRightLeft, TbFileInvoice, TbSearch } from 'react-icons/tb';
import { formatNumber } from '../../../../../utils/formatNumber';
import { useRecoilValue } from 'recoil';
import { invoicesAtom } from '../../../../../atoms/invoices';
import NotFound from './NotFound';
import Invoice from '../../../components/Invoice';

const useStyles = createStyles((theme) => ({
  invoice: {
    backgroundColor: theme.colors.dark[6],
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,

    '&:hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

const InvoicesList: React.FC = () => {
  const { classes } = useStyles();

  const invoices = useRecoilValue(invoicesAtom);

  return (
    <Stack justify={!invoices ? 'center' : undefined} sx={{ height: '100%' }}>
      {invoices ? (
        <>
          <TextInput placeholder="Search" icon={<TbSearch size={20} />} />
          <Stack justify="center">
            {invoices.map((invoice, index) => (
              <Invoice {...invoice} key={`invoice-${index}`} />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination total={10} />
            </Box>
          </Stack>
        </>
      ) : (
        <NotFound Icon={TbFileInvoice} label="No invoices found" />
      )}
    </Stack>
  );
};

export default InvoicesList;
