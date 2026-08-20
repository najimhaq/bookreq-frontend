'use client';

import { BookOpen, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getAdminBooks } from '@/features/admin/admin.api';
import type {
  AdminBook,
  AdminBookStatus,
  AdminUsersPagination,
} from '@/features/admin/admin.types';

const defaultPagination: AdminUsersPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

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

export default function AdminBooksPage() {
  const [books, setBooks] = useState<AdminBook[]>([]);
  const [pagination, setPagination] =
    useState<AdminUsersPagination>(defaultPagination);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const result = await getAdminBooks({
          page: pagination.page,
          limit: pagination.limit,
          search,
          status,
        });

        setBooks(result.data);
        setPagination(result.pagination);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load books.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadBooks();
  }, [pagination.page, pagination.limit, search, status]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPagination((current) => ({
      ...current,
      page: 1,
    }));

    setSearch(searchInput.trim());
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);

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
        <div className='absolute -right-16 -top-16 size-52 rounded-full bg-[#fff0d3] blur-3xl' />

        <div className='relative'>
          <div className='grid size-12 place-items-center rounded-2xl bg-[#9a6515] text-white'>
            <BookOpen className='size-6' />
          </div>

          <p className='mt-6 text-sm font-bold uppercase tracking-[0.16em] text-[#9a6515]'>
            Administration
          </p>

          <h1 className='mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl'>
            Book management
          </h1>

          <p className='mt-3 max-w-2xl leading-7 text-text-secondary'>
            Review books across every reader library, their reading status, and
            the account that added them.
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
              <span className='sr-only'>Search books</span>

              <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted' />

              <input
                type='search'
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder='Search title, author, or reader...'
                className='h-11 w-full rounded-xl border border-border bg-[#fffaf0] pl-10 pr-3 text-sm text-primary outline-none transition focus:border-[#9a6515] focus:ring-2 focus:ring-[#9a6515]/20'
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

          <label className='sm:min-w-52'>
            <span className='sr-only'>Filter books by reading status</span>

            <select
              value={status}
              onChange={handleStatusChange}
              disabled={isLoading}
              className='h-11 w-full rounded-xl border border-border bg-[#fffaf0] px-3 text-sm font-semibold text-primary outline-none transition focus:border-[#9a6515] focus:ring-2 focus:ring-[#9a6515]/20 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <option value=''>All statuses</option>
              <option value='WANT_TO_READ'>Want to read</option>
              <option value='READING'>Reading</option>
              <option value='COMPLETED'>Completed</option>
            </select>
          </label>
        </div>

        <div className='mt-6 overflow-x-auto'>
          <table className='w-full min-w-[1024px] border-separate border-spacing-0 text-left'>
            <thead>
              <tr className='text-xs uppercase tracking-[0.12em] text-text-muted'>
                <th className='border-b border-border px-3 py-3 font-bold'>
                  Book
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Author
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Added by
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Status
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Added
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <BookTableSkeleton />
              ) : errorMessage ? (
                <tr>
                  <td
                    colSpan={5}
                    className='px-3 py-10 text-center text-sm text-danger'
                  >
                    {errorMessage}
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className='px-3 py-10 text-center text-sm text-text-secondary'
                  >
                    No books found for the current filters.
                  </td>
                </tr>
              ) : (
                books.map((book) => <BookTableRow key={book.id} book={book} />)
              )}
            </tbody>
          </table>
        </div>

        <div className='mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-text-secondary'>
            Showing {books.length} of {pagination.total} book
            {pagination.total === 1 ? '' : 's'}
          </p>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={goToPreviousPage}
              disabled={isLoading || pagination.page <= 1}
              className='inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition hover:bg-[#fff0d3] hover:text-[#9a6515] disabled:cursor-not-allowed disabled:opacity-50'
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
              className='inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition hover:bg-[#fff0d3] hover:text-[#9a6515] disabled:cursor-not-allowed disabled:opacity-50'
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

function BookTableRow({ book }: { book: AdminBook }) {
  const status = statusStyles[book.status];

  return (
    <tr className='transition-colors hover:bg-[#fffaf0]'>
      <td className='border-b border-border px-3 py-4'>
        <div className='flex items-center gap-3'>
          <div className='relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-[#efe5d5]'>
            {book.coverImageUrl ? (
              <Image
                src={book.coverImageUrl}
                alt={`Cover of ${book.title}`}
                fill
                sizes='48px'
                className='object-cover'
              />
            ) : (
              <BookOpen className='size-5 text-[#9a6515]' />
            )}
          </div>

          <div className='min-w-0'>
            <p className='max-w-56 truncate font-bold text-primary'>
              {book.title}
            </p>

            <p className='mt-1 text-xs text-text-secondary'>
              {book.publishedYear
                ? `Published ${book.publishedYear}`
                : 'Year not added'}
            </p>
          </div>
        </div>
      </td>

      <td className='border-b border-border px-3 py-4'>
        <p className='text-sm font-semibold text-primary'>{book.author.name}</p>
      </td>

      <td className='border-b border-border px-3 py-4'>
        <p className='text-sm font-semibold text-primary'>{book.user.name}</p>

        <p className='mt-1 max-w-44 truncate text-xs text-text-secondary'>
          {book.user.email}
        </p>
      </td>

      <td className='border-b border-border px-3 py-4'>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${status.className}`}
        >
          {status.label}
        </span>
      </td>

      <td className='border-b border-border px-3 py-4 text-sm text-text-secondary'>
        {new Intl.DateTimeFormat('en', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(book.createdAt))}
      </td>
    </tr>
  );
}

function BookTableSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((row) => (
        <tr key={row}>
          {[1, 2, 3, 4, 5].map((column) => (
            <td key={column} className='border-b border-border px-3 py-4'>
              <div className='h-8 animate-pulse rounded bg-[#efe5d5]' />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
