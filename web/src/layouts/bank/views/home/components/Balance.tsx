import { Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconBaseProps } from 'react-icons';
import { formatNumber } from '../../../../../utils/formatNumber';
import HeaderGroup from '../../../components/HeaderGroup';

interface Props {
  header: string;
  Icon: React.ComponentType<IconBaseProps>;
  value: number;
}

const Balance: React.FC<Props> = ({ header, Icon, value }) => {
  return (
    <Paper p="md">
      <Stack>
        <HeaderGroup header={header} Icon={Icon} />
        <Title>{formatNumber(value)}</Title>
      </Stack>
    </Paper>
  );
};

export default Balance;
