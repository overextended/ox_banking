import React from 'react';
import Navbar from '@/layouts/bank/components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/layouts/bank/pages/dashboard/Dashboard';
import Accounts from '@/layouts/bank/pages/accounts/Accounts';

const Bank: React.FC = () => {
  return (
    <div className='w-[1280px] h-[768px] bg-background rounded-lg flex'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/accounts' element={<Accounts />} />
      </Routes>
    </div>
  );
};

export default Bank;
