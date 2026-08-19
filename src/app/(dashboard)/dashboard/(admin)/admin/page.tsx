// src/app/(admin)/admin/page.tsx
'use client';

import {
  BookOpen,
  BookUser,
  LibraryBig,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { AdminDashboardSkeleton } from '@/components/admin/admin-dashboard-skeleton';
import { getAdminDashboard } from '@/features/admin/admin.api';
import type {
  AdminBookStatus,
  AdminDashboardData,
} from '@/features/admin/admin.types';

const statusStyles: Record<
  AdminBookStatus,
  {
    label: string;
    className: string;
  }
> = {
  WANT_TO_READ: {
    label: 'Want to read',
    className: 'bg-[#fff0d3] text-[#9a6515]',
  },
  READING: {
    label: 'Reading',
    className: 'bg-[#e7f0e8] text-primary',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-[#e5eef4] text-info',
  },
};

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getAdminDashboard();

        setDashboard(data);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Unable to load admin dashboard.'
        );
      }
    };

    void loadDashboard();
  }, []);

  if (!dashboard && !errorMessage) {
    return <AdminDashboardSkeleton />;
  }

  if (errorMessage) {
    return (
      <main className='mx-auto max-w-7xl p-5 sm:p-8'>
        <section className='rounded-3xl border border-[#dfaaa0] bg-[#fff0ed] p-6'>
          <h1 className='font-display text-2xl font-semibold text-danger'>
            Admin dashboard unavailable
          </h1>

          <p className='mt-2 text-sm text-text-secondary'>{errorMessage}</p>
        </section>
      </main>
    );
  }

  if (!dashboard) {
    return null;
  }

  const stats = [
    {
      label: 'Registered users',
      value: dashboard.totalUsers,
      icon: UsersRound,
      iconClassName: 'bg-[#e7f0e8] text-primary',
    },
    {
      label: 'Books in libraries',
      value: dashboard.totalBooks,
      icon: LibraryBig,
      iconClassName: 'bg-[#fff0d3] text-[#9a6515]',
    },
    {
      label: 'Author records',
      value: dashboard.totalAuthors,
      icon: BookUser,
      iconClassName: 'bg-[#e5eef4] text-info',
    },
  ] as const;

  return (
    <main className='mx-auto max-w-7xl space-y-8 p-5 sm:p-8'>
      <section className='relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
        <div className='absolute -right-20 -top-24 size-64 rounded-full bg-[#fff0d3] blur-3xl' />
        <div className='absolute -bottom-24 left-1/3 size-52 rounded-full bg-[#e7f0e8] blur-3xl' />

        <div className='relative max-w-2xl'>
          <div className='grid size-12 place-items-center rounded-2xl bg-primary text-white'>
            <ShieldCheck className='size-6' />
          </div>

          <p className='mt-6 text-sm font-bold uppercase tracking-[0.16em] text-accent'>
            Administration
          </p>

          <h1 className='mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl'>
            BookRaq control center
          </h1>

          <p className='mt-3 leading-7 text-text-secondary'>
            Monitor users, library activity, and author records across BookRaq.
          </p>
        </div>
      </section>

      <section className='grid gap-4 sm:grid-cols-3'>
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className='rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(29,39,33,0.05)]'
            >
              <div
                className={`grid size-11 place-items-center rounded-xl ${stat.iconClassName}`}
              >
                <Icon className='size-5' />
              </div>

              <p className='mt-5 text-3xl font-bold text-primary'>
                {stat.value}
              </p>

              <p className='mt-1 text-sm font-medium text-text-secondary'>
                {stat.label}
              </p>
            </article>
          );
        })}
      </section>

      <section className='grid gap-6 xl:grid-cols-2'>
        <article className='rounded-3xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(29,39,33,0.05)]'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-sm font-bold uppercase tracking-[0.14em] text-accent'>
                People
              </p>

              <h2 className='mt-1 font-display text-2xl font-semibold text-primary'>
                Recent users
              </h2>
            </div>

            <UsersRound className='size-5 text-accent' />
          </div>

          {dashboard.recentUsers.length > 0 ? (
            <div className='mt-6 space-y-3'>
              {dashboard.recentUsers.map((user) => (
                <div
                  key={user.id}
                  className='flex items-center justify-between gap-4 rounded-2xl border border-border bg-[#fffaf0] p-3'
                >
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-bold text-primary'>
                      {user.name}
                    </p>

                    <p className='truncate text-xs text-text-secondary'>
                      {user.email}
                    </p>
                  </div>

                  <div className='shrink-0 text-right'>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        user.role === 'ADMIN'
                          ? 'bg-[#fff0d3] text-[#9a6515]'
                          : 'bg-[#e7f0e8] text-primary'
                      }`}
                    >
                      {user.role}
                    </span>

                    <p className='mt-1 text-xs text-text-muted'>
                      {user._count.books} book
                      {user._count.books === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyAdminState message='No users have registered yet.' />
          )}
        </article>

        <article className='rounded-3xl border border-border bg-surface p-6 shadow-[0_8px_24px_rgba(29,39,33,0.05)]'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-sm font-bold uppercase tracking-[0.14em] text-accent'>
                Library activity
              </p>

              <h2 className='mt-1 font-display text-2xl font-semibold text-primary'>
                Recent books
              </h2>
            </div>

            <BookOpen className='size-5 text-accent' />
          </div>

          {dashboard.recentBooks.length > 0 ? (
            <div className='mt-6 space-y-3'>
              {dashboard.recentBooks.map((book) => {
                const status = statusStyles[book.status];

                return (
                  <div
                    key={book.id}
                    className='flex items-center justify-between gap-4 rounded-2xl border border-border bg-[#fffaf0] p-3'
                  >
                    <div className='min-w-0'>
                      <p className='truncate text-sm font-bold text-primary'>
                        {book.title}
                      </p>

                      <p className='truncate text-xs text-text-secondary'>
                        {book.author.name} · Added by {book.user.name}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyAdminState message='No books have been added yet.' />
          )}
        </article>
      </section>
    </main>
  );
}

function EmptyAdminState({ message }: { message: string }) {
  return (
    <div className='mt-6 rounded-2xl border border-dashed border-[#c9b99d] bg-[#fffaf0] p-5 text-sm text-text-secondary'>
      {message}
    </div>
  );
}
