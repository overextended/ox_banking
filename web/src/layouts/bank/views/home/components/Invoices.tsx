import { Box, Button, createStyles, Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { TbCheck, TbX, TbFileInvoice } from 'react-icons/tb';

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
          <Group position="apart">
            <Text>Recent Invoices</Text>
            <TbFileInvoice size={24} />
          </Group>
          <Stack>
            {mockInvoices.map((invoice) => (
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
                    ${invoice.amount}
                  </Text>
                </Group>
              </Box>
            ))}
          </Stack>
        </Stack>
        <Button uppercase color="blue">
          See all
        </Button>
      </Stack>
    </Paper>
  );
};

export default Invoices;
