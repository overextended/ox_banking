import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LucideIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  icon: LucideIcon;
  label: string;
  path: string;
}

const NavItem: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button size='icon' variant={location.pathname === props.path ? 'default' : 'ghost'} className='w-[50px] h-[50px]'
            onClick={() => navigate(props.path)}>
      <props.icon />
    </Button>
  );
};

export default NavItem;
