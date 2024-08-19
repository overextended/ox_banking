import { cn } from '@/lib/utils';
import * as React from 'react';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, startIcon, ...props }, ref) => {
  const StartIcon = startIcon;

  return (
    <div className="relative h-9">
      {StartIcon && (
        <div className="text-muted-foreground pointer-events-none absolute top-1/2 flex h-full w-9 -translate-y-1/2 transform items-center justify-center">
          <StartIcon size={18} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-full w-full rounded-md border bg-transparent px-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
          startIcon ? 'pl-9' : '',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
