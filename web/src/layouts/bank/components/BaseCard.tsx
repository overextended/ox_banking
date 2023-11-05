import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

const BaseCard: React.FC<Props> = (props) => {
  return (
    <div className={cn('flex flex-col gap-4 rounded-lg bg-card p-4 shadow', props.className)}>
      <div className="flex items-center justify-between text-muted-foreground">
        <h2 className="font-bold">{props.title}</h2>
        <props.icon />
      </div>
      {props.children}
    </div>
  );
};

export default BaseCard;
