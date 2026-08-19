'use client';

import { ChevronLeft, ChevronRight, Search, UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getAdminUsers } from '@/features/admin/admin.api';
import type {
  AdminUsersPagination,
  RecentAdminUser,
} from '@/features/admin/admin.types';

const defaultPagination: AdminUsersPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<RecentAdminUser[]>([]);
  const [pagination, setPagination] =
    useState<AdminUsersPagination>(defaultPagination);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

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
  }, [pagination.page, pagination.limit, search]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPagination((current) => ({
      ...current,
      page: 1,
    }));

    setSearch(searchInput.trim());
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
        <div className='absolute -right-16 -top-16 size-52 rounded-full bg-[#e7f0e8] blur-3xl' />

        <div className='relative'>
          <div className='grid size-12 place-items-center rounded-2xl bg-primary text-white'>
            <UsersRound className='size-6' />
          </div>

          <p className='mt-6 text-sm font-bold uppercase tracking-[0.16em] text-accent'>
            Administration
          </p>

          <h1 className='mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl'>
            User management
          </h1>

          <p className='mt-3 max-w-2xl leading-7 text-text-secondary'>
            Review registered readers, their account roles, and their library
            activity.
          </p>
        </div>
      </section>

      <section className='rounded-3xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(29,39,33,0.05)] sm:p-6'>
        <form
          onSubmit={handleSearch}
          className='flex flex-col gap-3 sm:flex-row'
        >
          <label className='relative flex-1'>
            <span className='sr-only'>Search users</span>

            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted' />

            <input
              type='search'
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder='Search by name or email...'
              className='h-11 w-full rounded-xl border border-border bg-[#fffaf0] pl-10 pr-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20'
            />
          </label>

          <button
            type='submit'
            className='h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60'
            disabled={isLoading}
          >
            Search
          </button>
        </form>

        <div className='mt-6 overflow-x-auto'>
          <table className='w-full min-w-[720px] border-separate border-spacing-0 text-left'>
            <thead>
              <tr className='text-xs uppercase tracking-[0.12em] text-text-muted'>
                <th className='border-b border-border px-3 py-3 font-bold'>
                  User
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Role
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Books
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Joined
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <UserTableSkeleton />
              ) : errorMessage ? (
                <tr>
                  <td
                    colSpan={4}
                    className='px-3 py-10 text-center text-sm text-danger'
                  >
                    {errorMessage}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className='px-3 py-10 text-center text-sm text-text-secondary'
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => <UserTableRow key={user.id} user={user} />)
              )}
            </tbody>
          </table>
        </div>

        <div className='mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-text-secondary'>
            Showing {users.length} of {pagination.total} user
            {pagination.total === 1 ? '' : 's'}
          </p>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={goToPreviousPage}
              disabled={isLoading || pagination.page <= 1}
              className='inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition hover:bg-[#efe5d5] disabled:cursor-not-allowed disabled:opacity-50'
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
              className='inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition hover:bg-[#efe5d5] disabled:cursor-not-allowed disabled:opacity-50'
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

function UserTableRow({ user }: { user: RecentAdminUser }) {
  return (
    <tr className='transition-colors hover:bg-[#fffaf0]'>
      <td className='border-b border-border px-3 py-4'>
        <div>
          <p className='font-bold text-primary'>{user.name}</p>
          <p className='mt-1 text-sm text-text-secondary'>{user.email}</p>
        </div>
      </td>

      <td className='border-b border-border px-3 py-4'>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
            user.role === 'ADMIN'
              ? 'bg-[#fff0d3] text-[#9a6515]'
              : 'bg-[#e7f0e8] text-primary'
          }`}
        >
          {user.role}
        </span>
      </td>

      <td className='border-b border-border px-3 py-4 text-sm font-semibold text-primary'>
        {user._count.books}
      </td>

      <td className='border-b border-border px-3 py-4 text-sm text-text-secondary'>
        {new Intl.DateTimeFormat('en', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(user.createdAt))}
      </td>
    </tr>
  );
}

function UserTableSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((row) => (
        <tr key={row}>
          {[1, 2, 3, 4].map((column) => (
            <td key={column} className='border-b border-border px-3 py-4'>
              <div className='h-5 animate-pulse rounded bg-[#efe5d5]' />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
