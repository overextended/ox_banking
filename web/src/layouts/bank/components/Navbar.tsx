import React from 'react';
import { CreditCard, HistoryIcon, LayoutDashboard, LogOut } from 'lucide-react';
import ThemeSwitcher from '@/layouts/bank/components/ThemeSwitcher';
import NavLink from '@/layouts/bank/components/NavLink';
import NavItem from '@/layouts/bank/components/NavItem';
import locales from '@/locales';

const Navbar: React.FC = () => {
  return (
    <nav className="flex shrink-0 flex-col items-center justify-between border-r border-r-border p-2">
      <div className="flex flex-col items-center justify-center">
        <NavLink icon={LayoutDashboard} label={locales.dashboard} path="/" />
        <NavLink icon={CreditCard} label={locales.accounts} path="/accounts" />
        <NavLink icon={HistoryIcon} label={locales.logs} path="/logs" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <ThemeSwitcher />
        <NavItem exit label={locales.exit} icon={LogOut} onClick={() => {}} variant="ghost" />
      </div>
    </nav>
  );
};

export default Navbar;
