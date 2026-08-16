// src/components/auth/sign-in-form.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signInSchema, type SignInInput } from '@/features/auth/auth.schema';
import { authClient } from '@/lib/auth-client';

export function SignInForm() {
  const router = useRouter();

  const {
    data: session,
    isPending: isSessionLoading,
    refetch,
  } = authClient.useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  useEffect(() => {
    if (!isSessionLoading && session) {
      router.replace('/dashboard');
    }
  }, [isSessionLoading, router, session]);

  const onSubmit = async (values: SignInInput) => {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    });

    if (error) {
      setError('root', {
        message: error.message ?? 'Invalid email or password.',
      });

      return;
    }

    await refetch();

    window.location.replace('/dashboard');
  };

  return (
    <div className='rounded-2xl border border-border bg-surface/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-8'>
      <div>
        <p className='text-sm font-bold uppercase tracking-[0.16em] text-accent'>
          Welcome back
        </p>

        <h1 className='mt-3 text-3xl font-bold tracking-[-0.05em] text-text-primary'>
          Sign in to Bookraq.
        </h1>

        <p className='mt-3 text-sm leading-6 text-text-secondary'>
          Continue where your team&apos;s work left off.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-5'>
        <label className='block space-y-2'>
          <span className='text-sm font-semibold text-text-primary'>
            Email address
          </span>

          <Input
            type='email'
            autoComplete='email'
            placeholder='you@example.com'
            hasError={Boolean(errors.email)}
            {...register('email')}
          />

          {errors.email ? (
            <p className='text-xs font-medium text-danger'>
              {errors.email.message}
            </p>
          ) : null}
        </label>

        <label className='block space-y-2'>
          <span className='text-sm font-semibold text-text-primary'>
            Password
          </span>

          <PasswordInput
            autoComplete='current-password'
            placeholder='Enter your password'
            hasError={Boolean(errors.password)}
            {...register('password')}
          />

          {errors.password ? (
            <p className='text-xs font-medium text-danger'>
              {errors.password.message}
            </p>
          ) : null}
        </label>

        <label className='flex cursor-pointer items-center gap-2.5 text-sm text-text-secondary'>
          <input
            type='checkbox'
            className='size-4 rounded border-border bg-[#0D1425] accent-primary'
            {...register('rememberMe')}
          />
          Keep me signed in
        </label>

        {errors.root ? (
          <div
            role='alert'
            className='rounded-xl border border-[rgba(251,113,133,0.35)] bg-[rgba(251,113,133,0.1)] px-3.5 py-3 text-sm font-medium text-[#FDA4AF]'
          >
            {errors.root.message}
          </div>
        ) : null}

        <Button
          type='submit'
          size='lg'
          isLoading={isSubmitting}
          className='w-full'
        >
          Sign in
          <ArrowRight className='size-4' />
        </Button>
      </form>

      <p className='mt-6 text-center text-sm text-text-secondary'>
        New to Bookraq?{' '}
        <Link
          href='/sign-up'
          className='font-bold text-[#B6AFFF] transition-colors hover:text-[#D1CDFF]'
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
