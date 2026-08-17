import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

type InputProps = ComponentProps<'input'> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', hasError = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={[
          'h-12 w-full rounded-xl border bg-surface-elevated px-4 text-base text-text-primary outline-none transition',
          'placeholder:text-text-muted',
          'border-border',
          'hover:border-[#c9b99d]',
          'focus:border-primary focus:ring-4 focus:ring-[#183b2b]/10',
          'disabled:cursor-not-allowed disabled:opacity-60',
          hasError
            ? 'border-danger focus:border-danger focus:ring-danger/10'
            : '',
          className,
        ].join(' ')}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
