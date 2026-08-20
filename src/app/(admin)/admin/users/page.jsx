'use client';

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getAdminUsers } from '@/features/admin/admin.api';
const defaultPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(defaultPagination);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const result = await getAdminUsers({
          page: pagination.page,
          limit: pagination.limit,
          search,
          role,
        });

        setUsers(result.data);
        setPagination(result.pagination);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load users.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadUsers();
  }, [pagination.page, pagination.limit, search, role]);

  const handleSearch = (event) => {
    event.preventDefault();

    setPagination((current) => ({
      ...current,
      page: 1,
    }));

    setSearch(searchInput.trim());
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);

    setPagination((current) => ({
      ...current,
      page: 1,
    }));
  };

  const goToPreviousPage = () => {
    setPagination((current) => ({
      ...current,
      page: Math.max(1, current.page - 1),
    }));
  };

  const goToNextPage = () => {
    setPagination((current) => ({
      ...current,
      page: Math.min(current.totalPages, current.page + 1),
    }));
  };

  return (
    <main className='mx-auto max-w-7xl space-y-8 p-5 sm:p-8'>
      <section className='relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
        <div className='absolute -right-16 -top-16 size-52 rounded-full bg-[#e5eef4] blur-3xl' />

        <div className='relative'>
          <div className='grid size-12 place-items-center rounded-2xl bg-primary text-white'>
            <Users className='size-6' />
          </div>

          <p className='mt-6 text-sm font-bold uppercase tracking-[0.16em] text-primary'>
            Administration
          </p>

          <h1 className='mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl'>
            User management
          </h1>

          <p className='mt-3 max-w-2xl leading-7 text-text-secondary'>
            Review registered readers, their roles, account details, and the
            number of books in each personal library.
          </p>
        </div>
      </section>

      <section className='rounded-3xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(29,39,33,0.05)] sm:p-6'>
        <div className='flex flex-col gap-3 lg:flex-row'>
          <form
            onSubmit={handleSearch}
            className='flex flex-1 flex-col gap-3 sm:flex-row'
          >
            <label className='relative flex-1'>
              <span className='sr-only'>Search users</span>

              <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted' />

              <input
                type='search'
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder='Search name or email...'
                className='h-11 w-full rounded-xl border border-border bg-[#fffaf0] pl-10 pr-3 text-sm text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
              />
            </label>

            <button
              type='submit'
              disabled={isLoading}
              className='h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60'
            >
              Search
            </button>
          </form>

          <label className='sm:min-w-44'>
            <span className='sr-only'>Filter users by role</span>

            <select
              value={role}
              onChange={handleRoleChange}
              disabled={isLoading}
              className='h-11 w-full rounded-xl border border-border bg-[#fffaf0] px-3 text-sm font-semibold text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <option value=''>All roles</option>
              <option value='ADMIN'>Admin</option>
              <option value='USER'>User</option>
            </select>
          </label>
        </div>

        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          {isLoading ? (
            <UserCardSkeleton />
          ) : errorMessage ? (
            <p className='rounded-2xl border border-danger/20 bg-danger/10 px-4 py-8 text-center text-sm text-danger md:col-span-2'>
              {errorMessage}
            </p>
          ) : users.length === 0 ? (
            <p className='rounded-2xl border border-border bg-[#fffaf0] px-4 py-10 text-center text-sm text-text-secondary md:col-span-2'>
              No users found for the current filters.
            </p>
          ) : (
            users.map((user) => <UserCard key={user.id} user={user} />)
          )}
        </div>

        <div className='mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-text-secondary'>
            Showing {users.length} of {pagination.total} user
            {pagination.total === 1 ? '' : 's'}
          </p>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={goToPreviousPage}
              disabled={isLoading || pagination.page <= 1}
              className='inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition hover:bg-[#e7f0e8] hover:text-primary disabled:cursor-not-allowed disabled:opacity-50'
              aria-label='Previous page'
            >
              <ChevronLeft className='size-4' />
            </button>

            <span className='min-w-24 text-center text-sm font-bold text-primary'>
              Page {pagination.page} of {Math.max(1, pagination.totalPages)}
            </span>

            <button
              type='button'
              onClick={goToNextPage}
              disabled={
                isLoading ||
                pagination.totalPages === 0 ||
                pagination.page >= pagination.totalPages
              }
              className='inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition hover:bg-[#e7f0e8] hover:text-primary disabled:cursor-not-allowed disabled:opacity-50'
              aria-label='Next page'
            >
              <ChevronRight className='size-4' />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function UserCard({ user }) {
  const isAdmin = user.role === 'ADMIN';

  return (
    <article className='rounded-2xl border border-border bg-[#fffdf8] p-5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(29,39,33,0.08)]'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex min-w-0 items-center gap-3'>
          <div className='relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#e7f0e8] text-primary'>
            {user.image ? (
              <Image
                src={user.image}
                alt={`${user.name}'s profile`}
                fill
                sizes='48px'
                className='object-cover'
              />
            ) : (
              <UserRound className='size-6' />
            )}
          </div>

          <div className='min-w-0'>
            <h2 className='truncate font-bold text-primary'>{user.name}</h2>

            <p className='mt-1 truncate text-sm text-text-secondary'>
              {user.email}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
            isAdmin
              ? 'bg-[#e5eef4] text-[#2d6178]'
              : 'bg-[#e7f0e8] text-primary'
          }`}
        >
          {isAdmin ? (
            <ShieldCheck className='size-3.5' />
          ) : (
            <UserRound className='size-3.5' />
          )}

          {isAdmin ? 'Admin' : 'User'}
        </span>
      </div>

      <div className='mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.1em] text-text-muted'>
            Library
          </p>

          <p className='mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-primary'>
            <BookOpen className='size-4' />
            {user._count.books} book{user._count.books === 1 ? '' : 's'}
          </p>
        </div>

        <div>
          <p className='text-xs font-bold uppercase tracking-[0.1em] text-text-muted'>
            Joined
          </p>

          <p className='mt-1 whitespace-nowrap text-sm font-semibold text-primary'>
            {formatDate(user.createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
}

function UserCardSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map((card) => (
        <div
          key={card}
          className='h-44 animate-pulse rounded-2xl border border-border bg-[#fffaf0]'
        />
      ))}
    </>
  );
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}
