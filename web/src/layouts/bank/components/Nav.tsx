import { Navbar, Stack } from '@mantine/core';
import { TbCreditCard, TbHistory, TbHome, TbLogout } from 'react-icons/tb';
import NavIcon from './NavIcon';
import { bankVisibilityAtom } from '../../../atoms/visibility';
import { useSetRecoilState } from 'recoil';

const Nav: React.FC = () => {
  const setVisible = useSetRecoilState(bankVisibilityAtom);

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
          <NavIcon tooltip="Logs" Icon={TbHistory} to="/logs" />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center">
          <NavIcon tooltip="Exit" Icon={TbLogout} color="red.4" to="" handleClick={() => setVisible(false)} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default Nav;
