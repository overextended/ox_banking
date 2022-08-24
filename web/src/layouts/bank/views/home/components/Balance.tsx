import { Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconBaseProps } from 'react-icons';
import { formatNumber } from '../../../../../utils/formatNumber';

interface Props {
  header: string;
  Icon: React.ComponentType<IconBaseProps>;
  value: number;
}

const Balance: React.FC<Props> = ({ header, Icon, value }) => {
  return (
    <Paper p="md">
      <Stack>
        <Group position="apart">
          <Text>{header}</Text>
          <Icon size={24} />
        </Group>
        <Title>{formatNumber(value)}</Title>
      </Stack>
    </Paper>
  );
};

export default Balance;
