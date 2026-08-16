'use client';

import type { ComponentProps } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type PasswordInputProps = Omit<ComponentProps<'input'>, 'type'> & {
  hasError?: boolean;
};

export function PasswordInput({
  className,
  hasError = false,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='relative'>
      <input
        type={isVisible ? 'text' : 'password'}
        className={cn(
          'h-11 w-full rounded-xl border bg-[#0D1425] px-3.5 pr-11 text-sm text-text-primary outline-none placeholder:text-text-muted transition-all duration-200',
          'border-border focus:border-primary focus:ring-4 focus:ring-[rgba(109,93,251,0.14)]',
          hasError &&
            'border-danger focus:border-danger focus:ring-[rgba(251,113,133,0.14)]',
          className
        )}
        {...props}
      />

      <button
        type='button'
        onClick={() => setIsVisible((currentValue) => !currentValue)}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        className='absolute inset-y-0 right-0 grid w-11 place-items-center text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none'
      >
        {isVisible ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
      </button>
    </div>
  );
}
