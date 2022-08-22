import { ActionIcon, Button, Drawer, Stack, Tooltip } from '@mantine/core';
import { FaWrench } from 'react-icons/fa';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { bankVisibilityAtom } from '../../atoms/visibility';

const Dev: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const [bankVisible, setBankVisible] = useAtom(bankVisibilityAtom);

  return (
    <>
      <Tooltip label="Developer drawer" position="bottom">
        <ActionIcon
          onClick={() => setOpened(true)}
          radius="xl"
          variant="filled"
          color="orange"
          sx={{ position: 'absolute', bottom: 0, right: 0, width: 50, height: 50 }}
          size="xl"
          mr={50}
          mb={50}
        >
          <FaWrench size={24} />
        </ActionIcon>
      </Tooltip>

      <Drawer opened={opened} onClose={() => setOpened(false)} title="Developer drawer" padding="md">
        <Stack>
          <Button onClick={() => setBankVisible(!bankVisible)}>{!bankVisible ? 'Open' : 'Close'} bank</Button>
          <Button>Open ATM</Button>
        </Stack>
      </Drawer>
    </>
  );
};

export default Dev;
