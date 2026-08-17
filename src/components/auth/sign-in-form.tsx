'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
    <div className='relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(29,39,33,0.12)] sm:p-8'>
      <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-gold to-accent' />

      <div>
        <div className='inline-flex items-center gap-2 rounded-full border border-[#dfc895] bg-[#fff7e8] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary'>
          <BookOpen className='size-3.5 text-gold' />
          Welcome back
        </div>

        <h1 className='mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-primary'>
          Return to your shelf.
        </h1>

        <p className='mt-3 text-sm leading-6 text-text-secondary'>
          Sign in to continue your reading journey and revisit the books you
          love.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-5'>
        <label className='block space-y-2'>
          <span className='text-sm font-semibold text-primary'>
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
          <span className='text-sm font-semibold text-primary'>Password</span>

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
            className='size-4 rounded border-border bg-surface accent-primary'
            {...register('rememberMe')}
          />
          Keep me signed in
        </label>

        {errors.root ? (
          <div
            role='alert'
            className='rounded-xl border border-[#dfaaa0] bg-[#fff0ed] px-3.5 py-3 text-sm font-medium text-danger'
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
          Continue reading
          <ArrowRight className='size-4' />
        </Button>
      </form>

      <p className='mt-7 text-center text-sm text-text-secondary'>
        New to BookRaq?{' '}
        <Link
          href='/sign-up'
          className='font-bold text-accent transition-colors hover:text-accent-hover'
        >
          Create your library
        </Link>
      </p>
    </div>
  );
}
