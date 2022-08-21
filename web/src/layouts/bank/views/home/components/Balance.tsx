import { Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconBaseProps } from 'react-icons';

interface Props {
  header: string;
  Icon: React.ComponentType<IconBaseProps>;
  value: string;
}

const Balance: React.FC<Props> = ({ header, Icon, value }) => {
  return (
    <Paper p="md">
      <Stack>
        <Group position="apart">
          <Text>{header}</Text>
          <Icon size={24} />
        </Group>
        <Title>${value}</Title>
      </Stack>
    </Paper>
  );
};

export default Balance;
