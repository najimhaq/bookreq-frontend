import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
};

const variantClasses = {
  primary:
    'bg-primary text-white hover:bg-primary-hover hover:shadow-[0_12px_30px_rgba(109,93,251,0.28)]',
  secondary:
    'border border-border bg-surface text-text-primary hover:border-[rgba(129,117,255,0.6)] hover:bg-surface-elevated',
  ghost:
    'text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
} as const;

const sizeClasses = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
} as const;

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            aria-hidden='true'
            className='size-4 animate-spin rounded-full border-2 border-white/35 border-t-white'
          />
          Please wait...
        </>
      ) : (
        children
      )}
    </button>
  );
}
