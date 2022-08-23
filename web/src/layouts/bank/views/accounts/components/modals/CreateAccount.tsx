import { useState } from 'react';
import { closeAllModals } from '@mantine/modals';
import { Stack, Button, TextInput, Checkbox } from '@mantine/core';

const CreateAccount: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <Stack>
      <TextInput label="Account name" value={value} onChange={(e) => setValue(e.target.value)} />
      <Checkbox label="Shared account" />
      <Button uppercase variant="light" onClick={() => closeAllModals()}>
        Create account
      </Button>
    </Stack>
  );
};

export default CreateAccount;
