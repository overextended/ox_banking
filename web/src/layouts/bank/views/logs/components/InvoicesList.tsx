import {
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
              <Tooltip label="Click for details" withArrow transition="pop" key={`invoice-${index}`}>
                <Box className={classes.invoice}>
                  <Group position="apart">
                    <Group>
                      <ThemeIcon size="lg" color="cyan" variant="light">
                        <TbFileInvoice size={24} />
                      </ThemeIcon>
                      <Stack spacing={0}>
                        <Text>{invoice.from}</Text>
                        <Text size="xs" color="dark.2">
                          {invoice.date}
                        </Text>
                      </Stack>
                    </Group>
                    <Text color="cyan" weight={700}>
                      {formatNumber(invoice.amount)}
                    </Text>
                  </Group>
                </Box>
              </Tooltip>
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
