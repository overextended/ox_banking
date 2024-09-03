import React from 'react';
import Navbar from '@/layouts/bank/components/Navbar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from '@/layouts/bank/pages/dashboard/Dashboard';
import Accounts from '@/layouts/bank/pages/accounts/Accounts';
import { useSetModalContainer } from '@/state/modals';
import { useBankVisibility, useSetBankVisibility } from '@/state/visibility';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { fetchNui } from '@/utils/fetchNui';
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

  useNuiEvent('openBank', (data: Character) => {
    navigate('/');
    setVisible(true);
    setCharacter(data);
  });

  useNuiEvent('refreshCharacter', (data: Character) => setCharacter(data));

  useExitListener(setVisible);

  return (
    <>
      {visible && (
        <div
          className="bg-background relative flex h-[768px] w-[1280px] rounded-lg"
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
