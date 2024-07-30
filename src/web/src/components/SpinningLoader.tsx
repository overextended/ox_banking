import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  variant?: 'primary';
}

const SpinningLoader: React.FC<Props> = ({ variant }) => {
  return <Loader2 size={20} className={cn('animate-spin', variant === 'primary' && 'text-primary')} />;
};

export default SpinningLoader;
