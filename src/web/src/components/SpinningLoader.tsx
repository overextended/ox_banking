import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  variant?: 'primary';
  size?: number;
}

const SpinningLoader: React.FC<Props> = ({ variant, size = 20 }) => {
  return <Loader2 size={size} className={cn('animate-spin', variant === 'primary' && 'text-primary')} />;
};

export default SpinningLoader;
