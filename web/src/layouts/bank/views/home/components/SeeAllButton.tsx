import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { selectedLogsAccountAtom, useDefaultAccount } from '../../../../../atoms/account';
import { FaExternalLinkAlt } from 'react-icons/fa';

const SeeAllButton: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedLogsAccount = useSetRecoilState(selectedLogsAccountAtom);
  const defaultAccount = useDefaultAccount();

  return (
    <Button
      uppercase
      color="blue"
      rightIcon={<FaExternalLinkAlt />}
      onClick={() => {
        navigate('/logs');
        setSelectedLogsAccount(defaultAccount.id);
      }}
    >
      See all
    </Button>
  );
};

export default SeeAllButton;
