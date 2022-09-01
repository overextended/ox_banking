import { Button, Stack, TextInput } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import { useState } from 'react';

const TransferOwnership: React.FC = () => {
  const [accountId, setAccountId] = useState('');

  return (
    <Stack>
      <TextInput
        label="Character ID"
        description="Character ID to transfer the account to"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
      />
      <Button uppercase fullWidth color="red" onClick={() => closeAllModals()}>
        Confirm
      </Button>
    </Stack>
  );
};

export default TransferOwnership;
