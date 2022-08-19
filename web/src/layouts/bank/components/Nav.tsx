import { Navbar, Stack } from '@mantine/core';
import { TbArrowsRightLeft, TbCreditCard, TbFileInvoice, TbHome, TbLogout } from 'react-icons/tb';
import NavIcon from './NavIcon';

const Nav: React.FC = () => {
  return (
    <Navbar
      width={{ base: 80 }}
      p="md"
      fixed={false}
      sx={(theme) => ({
        height: 768,
        borderTopLeftRadius: theme.radius.sm,
        borderBottomLeftRadius: theme.radius.sm,
      })}
    >
      <Navbar.Section grow>
        <Stack justify="center" spacing={0}>
          <NavIcon tooltip="Home" Icon={TbHome} to="/" />
          <NavIcon tooltip="Accounts" Icon={TbCreditCard} to="/accounts" />
          <NavIcon tooltip="Transactions" Icon={TbArrowsRightLeft} to="/transactions" />
          <NavIcon tooltip="Invoices" Icon={TbFileInvoice} to="/invoices" />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center">
          <NavIcon tooltip="Exit" Icon={TbLogout} color="red.4" to="" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default Nav;
