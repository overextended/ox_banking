import { Box, Button, CloseButton, createStyles, Group, NumberInput, Stack, Text, Transition } from '@mantine/core';
import { atmVisibilityAtom } from '../../atoms/visibility';
import { useExitListener } from '../../hooks/useExitListener';
import { useRecoilState } from 'recoil';
import { formatNumber } from '../../utils/formatNumber';
import { useState } from 'react';
import FormattedInput from '../bank/components/FormattedInput';

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
  const [visible, setVisible] = useRecoilState(atmVisibilityAtom);
  const [amount, setAmount] = useState<number | undefined>();

  useExitListener(setVisible);

  return (
    <Transition transition="slide-up" mounted={visible}>
      {(style) => (
        <Box style={style} className={classes.wrapper}>
          <CloseButton className={classes.closeButton} onClick={() => setVisible(false)} />
          <Stack>
            <Box>
              <Text size="xs">Available Balance</Text>
              <Text weight={700} size={28}>
                {formatNumber(92575)}
              </Text>
            </Box>
            <Box>
              <Text size="xs">Cash Balance: {formatNumber(13225)}</Text>
              <FormattedInput value={amount} onChange={(value) => setAmount(value)} />
            </Box>
            <Button uppercase>Withdraw</Button>
          </Stack>
        </Box>
      )}
    </Transition>
  );
};

export default ATM;
