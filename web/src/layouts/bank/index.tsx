import { AppShell, Box, createStyles, Navbar } from '@mantine/core';

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
        navbar={
          <Navbar
            width={{ base: 80 }}
            p="md"
            fixed={false}
            sx={(theme) => ({
              height: 720,
              borderTopLeftRadius: theme.radius.sm,
              borderBottomLeftRadius: theme.radius.sm,
            })}
          >
            Item
          </Navbar>
        }
      >
        Content
      </AppShell>
    </Box>
  );
};

export default Bank;
