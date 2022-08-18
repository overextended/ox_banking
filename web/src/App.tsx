import { Box, createStyles } from '@mantine/core';
import ATM from './layouts/atm';
import Bank from './layouts/bank';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const App: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Bank />
      {/*<ATM />*/}
    </Box>
  );
};

export default App;
