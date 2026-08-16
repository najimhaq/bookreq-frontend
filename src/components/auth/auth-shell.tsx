import type { ReactNode } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

import { Logo } from '@/components/shared/logo';

type AuthShellProps = {
  children: ReactNode;
};

const highlights = [
  'Create your workspace in minutes',
  'Keep tasks, projects, and people aligned',
  'Secure session-based authentication',
] as const;

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className='min-h-screen bg-canvas lg:grid lg:grid-cols-2'>
      <section className='relative hidden overflow-hidden border-r border-border bg-[#0D1425] p-10 lg:flex lg:flex-col'>
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(109,93,251,0.3),transparent_34%),radial-gradient(circle_at_88%_86%,rgba(34,211,238,0.12),transparent_26%)]'
        />

        <div className='relative z-10'>
          <Logo showTagline />
        </div>

        <div className='relative z-10 my-auto max-w-xl pb-10'>
          <div className='inline-flex items-center gap-2 rounded-full border border-[rgba(129,117,255,0.3)] bg-[rgba(109,93,251,0.12)] px-3 py-1.5 text-xs font-bold text-[#C9C4FF]'>
            <Sparkles className='size-3.5' />
            Work with more clarity
          </div>

          <h1 className='mt-7 text-5xl font-bold tracking-[-0.06em] text-text-primary'>
            Make space for the work that matters.
          </h1>

          <p className='mt-6 max-w-lg text-base leading-7 text-text-secondary'>
            Bookreq brings projects, tasks, and people together in one focused
            workspace built for meaningful progress.
          </p>

          <ul className='mt-8 space-y-4'>
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className='flex items-center gap-3 text-sm font-medium text-text-secondary'
              >
                <CheckCircle2 className='size-5 shrink-0 text-success' />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className='relative z-10 flex items-center gap-2 text-xs text-text-muted'>
          <ShieldCheck className='size-4 text-accent' />
          Your session is protected with secure, HTTP-only cookies.
        </div>
      </section>

      <section className='relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8'>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(109,93,251,0.16),transparent_70%)] lg:hidden'
        />

        <div className='absolute left-5 top-5 z-10 lg:hidden'>
          <Logo />
        </div>

        <Link
          href='/'
          className='absolute right-5 top-6 z-10 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary sm:right-8'
        >
          Back to home
        </Link>

        <div className='relative z-10 w-full max-w-107.5'>{children}</div>
      </section>
    </main>
  );
}
