import React from 'react';
import Navbar from '@/layouts/bank/components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/layouts/bank/pages/dashboard/Dashboard';
import Accounts from '@/layouts/bank/pages/accounts/Accounts';
import ModalsProvider from '@/components/ModalsProvider';
import { useSetModalContainer } from '@/state/modals';

const Bank: React.FC = () => {
  const setContainer = useSetModalContainer();

  return (
    <div className="relative flex h-[768px] w-[1280px] rounded-lg bg-background" id="bank-container" ref={setContainer}>
      <ModalsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
      </ModalsProvider>
    </div>
  );
};

export default Bank;
