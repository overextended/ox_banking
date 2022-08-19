import { AppShell, Box, createStyles, Navbar } from '@mantine/core';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/home/home';
import Accounts from './views/accounts';
import Transactions from './views/transactions';
import Invoices from './views/invoices';

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: 1280,
    height: 768,
    // backgroundColor: theme.colors.dark[8],
    borderRadius: theme.radius.sm,
    color: theme.colors.dark[1],
  },
}));

const Bank: React.FC = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.wrapper}>
      <AppShell
        padding="md"
        fixed={false}
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.dark[8],
            width: 1024,
            height: 768,
            borderTopRightRadius: theme.radius.sm,
            borderBottomRightRadius: theme.radius.sm,
          },
        })}
        navbar={<Nav />}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </AppShell>
    </Box>
  );
};

export default Bank;
