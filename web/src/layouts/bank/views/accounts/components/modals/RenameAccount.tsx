import { Button, Stack, TextInput } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import { useState } from 'react';
import { useSelectedAccount } from '../../../../../../atoms/account';

const RenameAccount: React.FC = () => {
  const [value, setValue] = useState(useSelectedAccount()!.name);

  return (
    <Stack>
      <TextInput label="Account name" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        fullWidth
        variant="light"
        uppercase
        onClick={() => {
          closeAllModals();
          // fetchNui('changeAccountName', value)
        }}
      >
        Confirm
      </Button>
    </Stack>
  );
};

export default RenameAccount;
