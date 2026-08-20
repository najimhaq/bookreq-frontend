'use client';

import {
  BookMarked,
  BookOpen,
  LibraryBig,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getAdminDashboard } from '@/features/admin/admin.api';
import type {
  AdminBookStatus,
  AdminDashboardBook,
  AdminDashboardData,
  AdminDashboardUser,
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
    className: 'bg-[#e5eef4] text-[#2d6178]',
  },
};

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const result = await getAdminDashboard();
        setDashboard(result);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Unable to load admin dashboard.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  return (
    <main className='mx-auto max-w-7xl space-y-8 p-5 sm:p-8'>
      <section className='relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
        <div className='absolute -right-20 -top-20 size-64 rounded-full bg-[#e7f0e8] blur-3xl' />
        <div className='absolute bottom-0 right-40 size-36 rounded-full bg-[#fff0d3] blur-3xl' />

        <div className='relative'>
          <div className='grid size-12 place-items-center rounded-2xl bg-primary text-white'>
            <ShieldCheck className='size-6' />
          </div>

          <p className='mt-6 text-sm font-bold uppercase tracking-[0.16em] text-primary'>
            Administration
          </p>

          <h1 className='mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl'>
            Dashboard overview
          </h1>

          <p className='mt-3 max-w-2xl leading-7 text-text-secondary'>
            Monitor your reading platform, review recent activity, and manage
            readers, books, and authors from one place.
          </p>
        </div>
      </section>

      {errorMessage ? (
        <section className='rounded-3xl border border-danger/20 bg-danger/10 p-6 text-center text-sm text-danger'>
          {errorMessage}
        </section>
      ) : (
        <>
          <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <DashboardStatCard
              label='Registered users'
              value={dashboard?.totalUsers}
              description='Reader accounts in the platform'
              icon={<Users className='size-6' />}
              tone='blue'
              isLoading={isLoading}
            />

            <DashboardStatCard
              label='Books tracked'
              value={dashboard?.totalBooks}
              description='Books across all user libraries'
              icon={<BookOpen className='size-6' />}
              tone='green'
              isLoading={isLoading}
            />

            <DashboardStatCard
              label='Authors'
              value={dashboard?.totalAuthors}
              description='Authors in the shared catalogue'
              icon={<LibraryBig className='size-6' />}
              tone='gold'
              isLoading={isLoading}
            />
          </section>

          <section className='grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.85fr)]'>
            <RecentBooksPanel
              books={dashboard?.recentBooks ?? []}
              isLoading={isLoading}
            />

            <RecentUsersPanel
              users={dashboard?.recentUsers ?? []}
              isLoading={isLoading}
            />
          </section>
        </>
      )}
    </main>
  );
}

function DashboardStatCard({
  label,
  value,
  description,
  icon,
  tone,
  isLoading,
}: {
  label: string;
  value: number | undefined;
  description: string;
  icon: React.ReactNode;
  tone: 'blue' | 'green' | 'gold';
  isLoading: boolean;
}) {
  const tones = {
    blue: {
      icon: 'bg-[#e5eef4] text-[#2d6178]',
      accent: 'bg-[#d7e6ef]',
    },
    green: {
      icon: 'bg-[#e7f0e8] text-primary',
      accent: 'bg-[#d8eadb]',
    },
    gold: {
      icon: 'bg-[#fff0d3] text-[#9a6515]',
      accent: 'bg-[#f8e0b4]',
    },
  };

  return (
    <article className='relative overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(29,39,33,0.05)] sm:p-6'>
      <div
        className={`absolute -bottom-12 -right-10 size-32 rounded-full blur-2xl ${tones[tone].accent}`}
      />

      <div className='relative'>
        <div
          className={`grid size-11 place-items-center rounded-2xl ${tones[tone].icon}`}
        >
          {icon}
        </div>

        <p className='mt-5 text-sm font-bold uppercase tracking-[0.12em] text-text-muted'>
          {label}
        </p>

        {isLoading ? (
          <div className='mt-2 h-10 w-24 animate-pulse rounded-lg bg-[#efe5d5]' />
        ) : (
          <p className='mt-2 text-4xl font-bold tracking-tight text-primary'>
            {value ?? 0}
          </p>
        )}

        <p className='mt-2 text-sm leading-6 text-text-secondary'>
          {description}
        </p>
      </div>
    </article>
  );
}

function RecentBooksPanel({
  books,
  isLoading,
}: {
  books: AdminDashboardBook[];
  isLoading: boolean;
}) {
  return (
    <section className='rounded-3xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(29,39,33,0.05)] sm:p-6'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.12em] text-text-muted'>
            Recent activity
          </p>

          <h2 className='mt-1 font-display text-2xl font-semibold text-primary'>
            Recently added books
          </h2>
        </div>

        <Link
          href='/admin/books'
          className='shrink-0 text-sm font-bold text-primary underline-offset-4 transition hover:underline'
        >
          View all
        </Link>
      </div>

      <div className='mt-5 space-y-3'>
        {isLoading ? (
          <RecentBooksSkeleton />
        ) : books.length === 0 ? (
          <p className='rounded-2xl bg-[#fffaf0] px-4 py-10 text-center text-sm text-text-secondary'>
            No books have been added yet.
          </p>
        ) : (
          books.map((book) => <RecentBookRow key={book.id} book={book} />)
        )}
      </div>
    </section>
  );
}

function RecentBookRow({ book }: { book: AdminDashboardBook }) {
  const status = statusStyles[book.status];

  return (
    <article className='flex items-center gap-3 rounded-2xl border border-border bg-[#fffdf8] p-3 transition hover:bg-[#fffaf0]'>
      <div className='relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#efe5d5] text-[#9a6515]'>
        {book.coverImageUrl ? (
          <Image
            src={book.coverImageUrl}
            alt={`Cover of ${book.title}`}
            fill
            sizes='56px'
            className='object-cover'
          />
        ) : (
          <BookMarked className='size-6' />
        )}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='truncate font-bold text-primary'>{book.title}</p>

        <p className='mt-1 truncate text-sm text-text-secondary'>
          {book.author.name} · Added by {book.user.name}
        </p>

        <p className='mt-1 text-xs text-text-muted'>
          {formatDate(book.createdAt)}
        </p>
      </div>

      <span
        className={`hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-bold sm:inline-flex ${status.className}`}
      >
        {status.label}
      </span>
    </article>
  );
}

function RecentUsersPanel({
  users,
  isLoading,
}: {
  users: AdminDashboardUser[];
  isLoading: boolean;
}) {
  return (
    <section className='rounded-3xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(29,39,33,0.05)] sm:p-6'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.12em] text-text-muted'>
            Community
          </p>

          <h2 className='mt-1 font-display text-2xl font-semibold text-primary'>
            Recent users
          </h2>
        </div>

        <Link
          href='/admin/users'
          className='shrink-0 text-sm font-bold text-primary underline-offset-4 transition hover:underline'
        >
          View all
        </Link>
      </div>

      <div className='mt-5 space-y-3'>
        {isLoading ? (
          <RecentUsersSkeleton />
        ) : users.length === 0 ? (
          <p className='rounded-2xl bg-[#fffaf0] px-4 py-10 text-center text-sm text-text-secondary'>
            No users have registered yet.
          </p>
        ) : (
          users.map((user) => <RecentUserRow key={user.id} user={user} />)
        )}
      </div>
    </section>
  );
}

function RecentUserRow({ user }: { user: AdminDashboardUser }) {
  const isAdmin = user.role === 'ADMIN';

  return (
    <article className='flex items-center gap-3 rounded-2xl border border-border bg-[#fffdf8] p-3 transition hover:bg-[#fffaf0]'>
      <div className='relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#e7f0e8] text-primary'>
        {user.image ? (
          <Image
            src={user.image}
            alt={`${user.name}'s profile`}
            fill
            sizes='44px'
            className='object-cover'
          />
        ) : (
          <UserRound className='size-5' />
        )}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='truncate font-bold text-primary'>{user.name}</p>

        <p className='mt-1 truncate text-sm text-text-secondary'>
          {user.email}
        </p>

        <p className='mt-1 text-xs text-text-muted'>
          Joined {formatDate(user.createdAt)}
        </p>
      </div>

      <div className='shrink-0 text-right'>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
            isAdmin
              ? 'bg-[#e5eef4] text-[#2d6178]'
              : 'bg-[#e7f0e8] text-primary'
          }`}
        >
          {isAdmin ? 'Admin' : 'User'}
        </span>

        <p className='mt-1 text-xs font-semibold text-text-secondary'>
          {user._count.books} book{user._count.books === 1 ? '' : 's'}
        </p>
      </div>
    </article>
  );
}

function RecentBooksSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className='h-20 animate-pulse rounded-2xl bg-[#fffaf0]'
        />
      ))}
    </>
  );
}

function RecentUsersSkeleton() {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className='h-20 animate-pulse rounded-2xl bg-[#fffaf0]'
        />
      ))}
    </>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}
