import React from 'react';
import { CreditCard, HistoryIcon, LayoutDashboard, LogOut } from 'lucide-react';
import ThemeSwitcher from '@/layouts/bank/components/ThemeSwitcher';
import NavLink from '@/layouts/bank/components/NavLink';
import NavItem from '@/layouts/bank/components/NavItem';

const Navbar: React.FC = () => {

  return (
    <nav className='border-r-border border-r flex flex-col items-center justify-between p-2 shrink-0'>
      <div className='flex flex-col items-center justify-center'>
        <NavLink icon={LayoutDashboard} label='Dashboard' path='/' />
        <NavLink icon={CreditCard} label='Accounts' path='/accounts' />
        <NavLink icon={HistoryIcon} label='Logs' path='/logs' />
      </div>

      <div className='flex flex-col items-center justify-center'>
        <ThemeSwitcher />
        <NavItem exit label='Exit' icon={LogOut} onClick={() => {
        }} variant='ghost' />
      </div>
    </nav>
  );
};

export default Navbar;
