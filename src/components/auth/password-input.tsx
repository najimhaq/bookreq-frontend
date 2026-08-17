// src/components/auth/password-input.tsx
'use client';

import type { ComponentProps } from 'react';
import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordInputProps = Omit<ComponentProps<'input'>, 'type'> & {
  hasError?: boolean;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className = '', hasError = false, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className='relative'>
        <input
          ref={ref}
          type={isVisible ? 'text' : 'password'}
          className={[
            'h-12 w-full rounded-xl border bg-surface-elevated py-3 pl-4 pr-12 text-base text-text-primary outline-none transition',
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

        <button
          type='button'
          onClick={() => setIsVisible((current) => !current)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          className='absolute inset-y-0 right-0 grid w-12 place-items-center text-text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-accent'
        >
          {isVisible ? (
            <EyeOff className='size-5' />
          ) : (
            <Eye className='size-5' />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
