import { Button, Paper, SimpleGrid, Stack } from '@mantine/core';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { TbCashBanknote } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { selectedLogsAccountAtom, useSelectedAccount } from '../../../../../atoms/account';
import HeaderGroup from '../../../components/HeaderGroup';

const AccountActions: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedLogsAccount = useSetRecoilState(selectedLogsAccountAtom);
  const account = useSelectedAccount();

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
              if (!account) return;
              setSelectedLogsAccount(account.id);
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
