import React from 'react';
import Navbar from '@/layouts/bank/components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from '@/layouts/bank/pages/dashboard/Dashboard';
import Accounts from '@/layouts/bank/pages/accounts/Accounts';
import { useSetModalContainer } from '@/state/modals';
import { useBankVisibility, useSetBankVisibility } from '@/state/visibility';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { Character } from '~/src/common/typings';
import { useSetCharacter } from '@/state/character';
import ManageAccess from '@/layouts/bank/pages/accounts/manage-access/ManageAccess';
import { useExitListener } from '../../hooks/useExitListener';
import Logs from './pages/accounts/logs/Logs';
import Invoices from './pages/accounts/invoices/Invoices';

const Bank: React.FC = () => {
  const setCharacter = useSetCharacter();
  const setContainer = useSetModalContainer();
  const visible = useBankVisibility();
  const setVisible = useSetBankVisibility();
  const navigate = useNavigate();

  const [shouldRender, setShouldRender] = React.useState(false);

  useNuiEvent('openBank', (data: Character) => {
    navigate('/');
    setVisible(true);
    setCharacter(data);
  });

  useNuiEvent('refreshCharacter', (data: Character) => setCharacter(data));

  useExitListener(setVisible);

  React.useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }
  }, [visible]);

  return (
    <>
      {shouldRender && (
        <div
          data-state={visible ? 'open' : 'closed'}
          onAnimationEnd={() => !visible && setShouldRender(false)}
          className="bg-background fill-mode-forwards data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom relative flex h-[768px] w-[1280px] rounded-lg"
          id="bank-container"
          ref={setContainer}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/accounts/manage-access/:accountId" element={<ManageAccess />} />
            <Route path="/accounts/logs/:accountId" element={<Logs />} />
            <Route path="/accounts/invoices/:accountId" element={<Invoices />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Bank;
