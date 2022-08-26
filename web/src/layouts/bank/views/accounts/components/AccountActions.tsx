import { Button, Paper, SimpleGrid, Stack } from '@mantine/core';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { TbCashBanknote } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedLogsAccountAtom, selectedAccountAtom, accountsAtom } from '../../../../../atoms/account';
import HeaderGroup from '../../../components/HeaderGroup';

const AccountActions: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedLogsAccount = useSetRecoilState(selectedLogsAccountAtom);
  const selectedAccount = useRecoilValue(selectedAccountAtom);
  const accounts = useRecoilValue(accountsAtom);

  return (
    <Paper p="md">
      <Stack>
        <HeaderGroup header="Account Actions" Icon={TbCashBanknote} />
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
