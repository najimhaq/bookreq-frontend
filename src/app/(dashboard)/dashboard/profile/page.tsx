'use client';

import { BadgeCheck, CircleUserRound, Mail } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className='rounded-3xl border border-border bg-surface p-8'>
        <div className='h-7 w-52 animate-pulse rounded bg-[#ded3c1]' />
        <div className='mt-6 h-32 animate-pulse rounded-2xl bg-[#efe5d5]' />
      </div>
    );
  }

  const user = session?.user;
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className='max-w-3xl'>
      <section className='rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
        <p className='text-sm font-bold uppercase tracking-[0.16em] text-accent'>
          Your profile
        </p>

        <h1 className='mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl'>
          Account details
        </h1>

        <p className='mt-3 leading-7 text-text-secondary'>
          This is the account connected to your personal BookRaq library.
        </p>

        <div className='mt-8 flex items-center gap-4 rounded-2xl border border-border bg-[#fffaf0] p-5'>
          <div className='grid size-14 shrink-0 place-items-center rounded-full bg-primary text-xl font-bold text-white'>
            {user?.name?.slice(0, 1).toUpperCase() ?? 'R'}
          </div>

          <div className='min-w-0'>
            <h2 className='truncate text-lg font-bold text-primary'>
              {user?.name ?? 'Reader'}
            </h2>

            <p className='truncate text-sm text-text-secondary'>
              {user?.email ?? 'No email available'}
            </p>
          </div>
        </div>

        <dl className='mt-6 divide-y divide-border rounded-2xl border border-border'>
          <div className='flex items-center gap-4 p-4'>
            <CircleUserRound className='size-5 text-accent' />

            <div>
              <dt className='text-xs font-bold uppercase tracking-[0.12em] text-text-muted'>
                Display name
              </dt>

              <dd className='mt-1 font-semibold text-primary'>
                {user?.name ?? 'Reader'}
              </dd>
            </div>
          </div>

          <div className='flex items-center gap-4 p-4'>
            <Mail className='size-5 text-accent' />

            <div>
              <dt className='text-xs font-bold uppercase tracking-[0.12em] text-text-muted'>
                Email address
              </dt>

              <dd className='mt-1 font-semibold text-primary'>
                {user?.email ?? 'No email available'}
              </dd>
            </div>
          </div>

          <div className='flex items-center gap-4 p-4'>
            <BadgeCheck className='size-5 text-accent' />

            <div>
              <dt className='text-xs font-bold uppercase tracking-[0.12em] text-text-muted'>
                Account role
              </dt>

              <dd className='mt-1 font-semibold text-primary'>
                {isAdmin ? 'Administrator' : 'Reader'}
              </dd>
            </div>
          </div>
        </dl>
      </section>
    </div>
  );
}
