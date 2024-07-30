import React from 'react';
import NavItem from '@/layouts/bank/components/NavItem';
import { LucideIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  icon: LucideIcon;
  path: string;
  label: string;
}

const NavLink: React.FC<Props> = ({ icon, path, label }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return <NavItem icon={icon} label={label} onClick={() => navigate(path)} active={location.pathname === path} />;
};

export default NavLink;
