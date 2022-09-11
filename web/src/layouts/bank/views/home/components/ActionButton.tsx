import { createStyles, Divider, Group, Text, UnstyledButton } from '@mantine/core';
import { TbCreditCard } from 'react-icons/tb';
import { IconBaseProps } from 'react-icons';

interface Props {
  Icon: React.ComponentType<IconBaseProps>;
  label: string;
  onClick?: () => void;
}

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.dark[6],
    padding: theme.spacing.lg,
    borderRadius: theme.radius.sm,
    '&:hover': {
      backgroundColor: theme.colors.dark[5],
    },
  },
}));

const ActionButton: React.FC<Props> = ({ Icon, label, onClick }) => {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.button} onClick={onClick}>
      <Group>
        <Icon size={36} />
        <Divider orientation="vertical" />
        <Text size={20}>{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

export default ActionButton;
