import { ActionIcon, createStyles, Tooltip } from '@mantine/core';
import { IconBaseProps } from 'react-icons';

interface Props {
  tooltip: string;
  Icon: React.ComponentType<IconBaseProps>;
  color?: string;
  hoverColor?: string;
}

const useStyles = createStyles((theme, color) => ({
  icon: {
    width: 50,
    height: 50,
    transition: '300ms',
  },
}));

const NavIcon: React.FC<Props> = ({ tooltip, Icon, color }) => {
  const { classes } = useStyles();

  return (
    <Tooltip label={tooltip} position="right">
      <ActionIcon
        size="xl"
        color={color || 'blue.4'}
        className={classes.icon}
        sx={(theme) => ({ hover: { color: color ? theme.colors.red[3] : theme.colors.blue[3] } })}
      >
        <Icon fontSize={24} />
      </ActionIcon>
    </Tooltip>
  );
};

export default NavIcon;
