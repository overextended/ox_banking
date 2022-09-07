import { Box, Button, createStyles, Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { TbFileInvoice } from 'react-icons/tb';
import { formatNumber } from '../../../../../utils/formatNumber';
import HeaderGroup from '../../../components/HeaderGroup';
import Invoice from '../../../components/Invoice';
import SeeAllButton from './SeeAllButton';

const useStyles = createStyles((theme) => ({
  paper: {
    height: 360,
  },

  stack: {
    height: '100%',
  },

  invoice: {
    backgroundColor: theme.colors.dark[6],
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },
}));

const mockInvoices: { from: string; date: string; amount: number; isPaid: boolean; description?: string }[] = [
  { from: 'Karen', date: '01/01/1999', amount: 7500, isPaid: true },
  { from: 'Jean', date: '01/01/1999', amount: 13500, isPaid: false },
  { from: 'Christoph', date: '01/01/1999', amount: 28500, isPaid: true },
];

const Invoices: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Paper p="md" className={classes.paper}>
      <Stack justify="space-between" className={classes.stack}>
        <Stack>
          <HeaderGroup header="Recent Invoices" Icon={TbFileInvoice} />
          <Stack>
            {mockInvoices.map((invoice, index) => (
              <Invoice {...invoice} key={`home-invoice-${index}`} />
            ))}
          </Stack>
        </Stack>
        <SeeAllButton />
      </Stack>
    </Paper>
  );
};

export default Invoices;
