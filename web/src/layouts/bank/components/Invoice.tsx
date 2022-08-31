import { Badge, Box, createStyles, Group, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { TbFileInvoice } from 'react-icons/tb';
import { formatNumber } from '../../../utils/formatNumber';
import { InvoiceProps } from '../../../atoms/invoices';
import { openModal } from '@mantine/modals';
import InvoiceModal from '../../../modals/InvoiceModal';

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

const Invoice: React.FC<InvoiceProps> = (invoice) => {
  const { classes } = useStyles();

  return (
    <Tooltip label="Click for details" withArrow transition="pop">
      <Box
        className={classes.invoice}
        onClick={() => openModal({ title: 'Invoice', children: <InvoiceModal invoice={invoice} /> })}
      >
        <Group position="apart">
          <Group>
            <ThemeIcon size="lg" color="cyan" variant="light">
              <TbFileInvoice size={24} />
            </ThemeIcon>
            <Stack spacing={0}>
              <Group spacing={5}>
                <Text>{invoice.from}</Text>
                <Badge color={invoice.isPaid ? 'teal' : 'red'}>{invoice.isPaid ? 'Paid' : 'Unpaid'}</Badge>
              </Group>
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
  );
};

export default Invoice;
