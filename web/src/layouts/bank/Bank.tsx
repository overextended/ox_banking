import React from 'react';
import Navbar from '@/layouts/bank/components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/layouts/bank/pages/dashboard/Dashboard';

const Bank: React.FC = () => {
  return (
    <div className='w-[1280px] h-[768px] bg-background rounded-lg flex'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Bank;
