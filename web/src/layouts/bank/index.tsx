import { AppShell, Box, createStyles, Transition } from '@mantine/core';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/home/home';
import Accounts from './views/accounts';
import Logs from './views/logs';
import { bankVisibilityAtom } from '../../atoms/visibility';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { useExitListener } from '../../hooks/useExitListener';
import { useRecoilState } from 'recoil';

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
  const [visible, setVisible] = useRecoilState(bankVisibilityAtom);

  useNuiEvent('setBankVisible', () => {
    setVisible(true);
  });

  useExitListener(setVisible);

  return (
    <Transition transition="slide-up" mounted={visible}>
      {(style) => (
        <Box style={style} className={classes.wrapper}>
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
              <Route path="/logs" element={<Logs />} />
            </Routes>
          </AppShell>
        </Box>
      )}
    </Transition>
  );
};

export default Bank;
