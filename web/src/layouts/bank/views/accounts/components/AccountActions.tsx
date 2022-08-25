import { Button, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedLogsAccountAtom, selectedAccountAtom, accountsAtom } from '../../../../../atoms/account';

const AccountActions: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedLogsAccount = useSetRecoilState(selectedLogsAccountAtom);
  const selectedAccount = useRecoilValue(selectedAccountAtom);
  const accounts = useRecoilValue(accountsAtom);

  return (
    <Paper p="md">
      <Stack>
        <Text>Account actions</Text>
        <SimpleGrid cols={2}>
          <Button uppercase>Withdraw</Button>
          <Button uppercase>Deposit</Button>
          <Button uppercase>Transfer</Button>
          <Button
            uppercase
            rightIcon={<FaExternalLinkAlt />}
            onClick={() => {
              setSelectedLogsAccount(accounts[selectedAccount || 0].id);
              navigate('/logs');
            }}
          >
            Logs
          </Button>
        </SimpleGrid>
      </Stack>
    </Paper>
  );
};

export default AccountActions;
