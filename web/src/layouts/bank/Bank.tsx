import React from 'react';
import Navbar from '@/layouts/bank/components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/layouts/bank/pages/dashboard/Dashboard';
import Accounts from '@/layouts/bank/pages/accounts/Accounts';
import ModalsProvider from '@/components/ModalsProvider';
import { useSetModalContainer } from '@/state/modals';
import { useBankVisibility, useSetBankVisibility } from '@/state/visibility';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import { default as locales, setLocale } from '../../locales';
import { fetchNui } from '@/utils/fetchNui';
import { Character } from '~/typings';
import { useSetCharacter } from '@/state/character';
import ManageAccess from '@/layouts/bank/pages/accounts/manage-access/ManageAccess';

const Bank: React.FC = () => {
  const setCharacter = useSetCharacter();
  const setContainer = useSetModalContainer();
  const visible = useBankVisibility();
  const setVisible = useSetBankVisibility();

  useNuiEvent('setInitData', (data: { locales: typeof locales }) => {
    console.log('set');
    setLocale(data.locales);
  });

  useNuiEvent('openBank', (data: Character) => {
    setVisible(true);
    setCharacter(data);
  });

  const handleESC = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    setVisible(false);
    fetchNui('exit');
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleESC);

    return () => window.removeEventListener('keydown', handleESC);
  }, []);

  return (
    <>
      {visible && (
        <div
          className='relative flex h-[768px] w-[1280px] rounded-lg bg-background'
          id='bank-container'
          ref={setContainer}
        >
          <ModalsProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/accounts' element={<Accounts />} />
              <Route path='/accounts/manage-access/:accountId' element={<ManageAccess />} />
            </Routes>
          </ModalsProvider>
        </div>
      )}
    </>
  );
};

export default Bank;
