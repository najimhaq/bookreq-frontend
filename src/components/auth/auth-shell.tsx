import type { ReactNode } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

import { Logo } from '@/components/shared/logo';

type AuthShellProps = {
  children: ReactNode;
};

const highlights = [
  'Build a personal shelf for every book you love',
  'Track what you are reading and what comes next',
  'Keep your library private and always within reach',
] as const;

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className='min-h-screen bg-canvas lg:grid lg:grid-cols-2'>
      <section className='relative hidden overflow-hidden border-r border-[#315541] bg-primary p-10 lg:flex lg:flex-col'>
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(200,145,46,0.25),transparent_32%),radial-gradient(circle_at_86%_82%,rgba(184,80,59,0.22),transparent_30%)]'
        />

        <div
          aria-hidden='true'
          className='absolute -bottom-28 -right-24 size-96 rounded-full border border-[#72917b]/30'
        />

        <div
          aria-hidden='true'
          className='absolute -bottom-14 -right-10 size-72 rounded-full border border-[#72917b]/20'
        />

        <div className='relative z-10'>
          <Logo showTagline className='text-[#f7f1e6] hover:text-[#fff7e8]' />
        </div>

        <div className='relative z-10 my-auto max-w-xl pb-10'>
          <div className='inline-flex items-center gap-2 rounded-full border border-[#e7c879]/40 bg-[#fff7e8]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#f4dc9d]'>
            <Sparkles className='size-3.5 text-[#e7c879]' />
            Your reading room
          </div>

          <h1 className='mt-7 font-[family-name:var(--font-display)] text-5xl font-semibold leading-tight tracking-tight text-[#fff7e8]'>
            Every good book deserves a place to belong.
          </h1>

          <p className='mt-6 max-w-lg text-base leading-7 text-[#c9d9ca]'>
            BookRaq gives your reading life a calm, personal home—one shelf, one
            author, and one memorable story at a time.
          </p>

          <ul className='mt-8 space-y-4'>
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className='flex items-center gap-3 text-sm font-medium text-[#d8e4d8]'
              >
                <CheckCircle2 className='size-5 shrink-0 text-[#e7c879]' />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className='relative z-10 flex items-center gap-2 text-xs text-[#b9cab9]'>
          <ShieldCheck className='size-4 text-[#e7c879]' />
          Your account is protected with secure, HTTP-only cookies.
        </div>
      </section>

      <section className='relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8'>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(200,145,46,0.18),transparent_70%)] lg:hidden'
        />

        <div className='absolute left-5 top-5 z-10 lg:hidden'>
          <Logo />
        </div>

        <Link
          href='/'
          className='absolute right-5 top-6 z-10 rounded-md px-2 py-1 text-sm font-semibold text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:right-8'
        >
          Back to home
        </Link>

        <div className='relative z-10 w-full max-w-[430px]'>{children}</div>
      </section>
    </main>
  );
}
