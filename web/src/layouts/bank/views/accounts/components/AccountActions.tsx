import { Button, Paper, SimpleGrid, Stack } from '@mantine/core';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { TbCashBanknote } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { logsAccountsAtom, selectedLogsAccountAtom, useSelectedAccount } from '../../../../../atoms/account';
import HeaderGroup from '../../../components/HeaderGroup';
import { openModal } from '@mantine/modals';
import DepositWithdraw from './modals/DepositWithdraw';
import Transfer from './modals/Transfer';

const AccountActions: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedLogsAccount = useSetRecoilState(selectedLogsAccountAtom);
  const accounts = useRecoilValue(logsAccountsAtom);
  const account = useSelectedAccount();

  return (
    <Paper p="md">
      <Stack>
        <HeaderGroup header="Account Actions" Icon={TbCashBanknote} />
        <SimpleGrid cols={2}>
          <Button
            uppercase
            onClick={() => openModal({ title: 'Withdraw', children: <DepositWithdraw variant="withdraw" /> })}
          >
            Withdraw
          </Button>
          <Button
            uppercase
            onClick={() => openModal({ title: 'Deposit', children: <DepositWithdraw variant="deposit" /> })}
          >
            Deposit
          </Button>
          <Button
            uppercase
            onClick={() =>
              openModal({
                title: 'Transfer',
                children: <Transfer />,
              })
            }
          >
            Transfer
          </Button>
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
