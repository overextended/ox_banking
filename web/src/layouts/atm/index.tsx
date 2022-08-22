import { Box, Button, CloseButton, createStyles, Group, NumberInput, Stack, Text, Transition } from '@mantine/core';
import { useAtom } from 'jotai';
import { atmVisibilityAtom } from '../../atoms/visibility';
import { useExitListener } from '../../hooks/useExitListener';
import { TbCurrencyDollar } from 'react-icons/tb';

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: 400,
    height: 'fit-content',
    borderRadius: theme.radius.sm,
    color: theme.colors.dark[1],
    backgroundColor: theme.colors.dark[8],
    padding: theme.spacing.md,
  },

  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: 10,
    marginRight: 10,
  },
}));

const ATM: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useAtom(atmVisibilityAtom);

  useExitListener(setVisible);

  return (
    <Transition transition="slide-up" mounted={visible}>
      {(style) => (
        <Box style={style} className={classes.wrapper}>
          <CloseButton className={classes.closeButton} onClick={() => setVisible(false)} />
          <Stack>
            <Group position="apart">
              <Box>
                <Text size="xs">Available balance</Text>
                <Text weight={700} size={28}>
                  $92575
                </Text>
              </Box>
            </Group>
            <NumberInput placeholder="Amount" icon={<TbCurrencyDollar size={20} />} />
            <Button uppercase>Withdraw</Button>
          </Stack>
        </Box>
      )}
    </Transition>
  );
};

export default ATM;
