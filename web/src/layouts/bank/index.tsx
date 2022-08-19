import { AppShell, Box, createStyles, Navbar } from '@mantine/core';
import Nav from './components/Nav';

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: 1280,
    height: 720,
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
            width: 1280,
            height: 720,
            borderTopRightRadius: theme.radius.sm,
            borderBottomRightRadius: theme.radius.sm,
          },
        })}
        navbar={<Nav />}
      >
        Content
      </AppShell>
    </Box>
  );
};

export default Bank;
