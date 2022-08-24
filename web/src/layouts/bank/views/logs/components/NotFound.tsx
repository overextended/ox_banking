import { Center, Stack, Text } from '@mantine/core';
import { IconBaseProps } from 'react-icons';

interface Props {
  label: string;
  Icon: React.ComponentType<IconBaseProps>;
}

const NotFound: React.FC<Props> = ({ label, Icon }) => {
  return (
    <Center>
      <Stack align="center">
        <Icon size={54} />
        <Text size={28}>{label}</Text>
      </Stack>
    </Center>
  );
};

export default NotFound;
