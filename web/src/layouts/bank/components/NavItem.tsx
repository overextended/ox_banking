import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'ghost';
  exit?: boolean;
}

const NavItem: React.FC<Props> = (props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size='icon' variant={props.variant}
                className='w-[50px] h-[50px]'
                onClick={() => props.onClick()}>
          <props.icon color={props.exit ? 'hsl(var(--destructive))' : undefined} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side='right'>
        {props.label}
      </TooltipContent>
    </Tooltip>
  );
};

export default NavItem;
