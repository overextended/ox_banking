import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, HistoryIcon, LayoutDashboard, LogOut } from 'lucide-react';
import NavItem from '@/layouts/bank/components/NavItem';
import ThemeSwitcher from '@/layouts/bank/components/ThemeSwitcher';

const Navbar: React.FC = () => {

  return (
    <nav className='w-[80px] border-r-border border-r flex flex-col items-center justify-between p-2 shrink-0'>
      <div className='flex flex-col items-center justify-center'>
        <NavItem icon={LayoutDashboard} label='Dashboard' path='/' />
        <NavItem icon={CreditCard} label='Accounts' path='/accounts' />
        <NavItem icon={HistoryIcon} label='Logs' path='/logs' />
      </div>

      <div className='flex flex-col items-center justify-center'>
        <ThemeSwitcher />
        <Button variant='ghost' size='icon' className='w-[50px] h-[50px]'>
          <LogOut className='text-red-400' />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
