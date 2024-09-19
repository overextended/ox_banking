import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface Props {
  icon: LucideIcon;
  label: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined;
  onClick?: () => void;
  disabled?: boolean;
}

const AccountButton: React.FC<Props> = (props) => {
  return (
    <Button
      disabled={props.disabled}
      variant={props.variant || 'secondary'}
      className="h-fit w-full items-center justify-start gap-4 p-4"
      onClick={() => props.onClick?.()}
    >
      <props.icon />
      {props.label}
    </Button>
  );
};

export default AccountButton;
