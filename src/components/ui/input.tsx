import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type InputProps = ComponentProps<'input'> & {
  hasError?: boolean;
};

export function Input({ className, hasError = false, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border bg-[#0D1425] px-3.5 text-sm text-text-primary outline-none placeholder:text-text-muted transition-all duration-200',
        'border-border focus:border-primary focus:ring-4 focus:ring-[rgba(109,93,251,0.14)]',
        hasError &&
          'border-danger focus:border-danger focus:ring-[rgba(251,113,133,0.14)]',
        className
      )}
      {...props}
    />
  );
}
