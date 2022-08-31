import { Box, Stack, Text, Button, Tooltip } from '@mantine/core';
import { formatNumber } from '../utils/formatNumber';
import { InvoiceProps } from '../atoms/invoices';
import { closeAllModals, openConfirmModal } from '@mantine/modals';

const InvoiceModal: React.FC<{ invoice: InvoiceProps }> = ({ invoice }) => {
  return (
    <Stack>
      <Text size="xs">Invoice ID: 197751331194</Text>
      <Text size="xs">Date: {invoice.date}</Text>
      <Box>
        <Text>Issuer</Text>
        <Text size="sm">{invoice.from}</Text>
      </Box>
      <Box>
        <Text>Amount</Text>
        <Text size="sm" color="cyan" weight={700}>
          {formatNumber(invoice.amount)}
        </Text>
      </Box>
      <Box>
        <Text>Status</Text>
        <Text transform="uppercase" weight={700} color={invoice.isPaid ? 'teal' : 'red'}>
          {invoice.isPaid ? 'Paid' : 'Unpaid'}
        </Text>
      </Box>
      {invoice.message && (
        <Box>
          <Text>Message</Text>
          <Text size="sm">{invoice.message}</Text>
        </Box>
      )}
      <Button disabled={invoice.isPaid} variant="light" uppercase onClick={() => closeAllModals()}>
        Pay invoice
      </Button>
    </Stack>
  );
};

export default InvoiceModal;
