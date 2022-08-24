import { Box, createStyles, Group, Pagination, Paper, Stack, Text, TextInput, ThemeIcon, Tooltip } from '@mantine/core';
import { TbFileInvoice, TbSearch } from 'react-icons/tb';
import { formatNumber } from '../../../../../utils/formatNumber';

const mockInvoices: { from: string; date: string; amount: number; isPaid: boolean; description?: string }[] = [
  { from: 'Karen', date: '01/01/1999', amount: 7500, isPaid: true },
  { from: 'Jean', date: '01/01/1999', amount: 13500, isPaid: false },
  { from: 'Christoph', date: '01/01/1999', amount: 28500, isPaid: true },
];

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

const Invoices: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Paper p="md">
      <Stack>
        <Text>Account invoices</Text>
        <TextInput placeholder="Search" icon={<TbSearch size={20} />} />
        <Stack justify="center">
          {mockInvoices.map((invoice, index) => (
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
      </Stack>
    </Paper>
  );
};

export default Invoices;
