import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
};

const variantClasses = {
  primary:
    'bg-primary text-white hover:bg-primary-hover hover:shadow-[0_12px_30px_rgba(24,59,43,0.24)]',

  secondary:
    'border border-border bg-surface text-primary hover:border-accent hover:bg-[#fff7f0]',

  ghost: 'text-text-secondary hover:bg-[#efe5d5] hover:text-primary',

  danger:
    'bg-danger text-white hover:bg-[#9d3030] hover:shadow-[0_12px_30px_rgba(182,61,61,0.2)]',
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
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        'disabled:cursor-not-allowed disabled:opacity-60',
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
