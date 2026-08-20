'use client';

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  UserRound,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { createAdminAuthor, getAdminAuthors } from '@/features/admin/admin.api';
import type {
  AdminAuthor,
  AdminUsersPagination,
} from '@/features/admin/admin.types';
import toast from 'react-hot-toast';

const defaultPagination: AdminUsersPagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<AdminAuthor[]>([]);
  const [pagination, setPagination] =
    useState<AdminUsersPagination>(defaultPagination);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [formError, setFormError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const result = await getAdminAuthors({
          page: pagination.page,
          limit: pagination.limit,
          search,
        });

        setAuthors(result.data);
        setPagination(result.pagination);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load authors.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadAuthors();
  }, [pagination.page, pagination.limit, search]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPagination((current) => ({
      ...current,
      page: 1,
    }));

    setSearch(searchInput.trim());
  };

  const handleCreateAuthor = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setIsCreating(true);
      setFormError('');

      const result = await createAdminAuthor({
        name: authorName.trim(),
        bio: authorBio.trim() || undefined,
      });

      setAuthors((currentAuthors) => {
        const shouldAppearOnCurrentPage =
          pagination.page === 1 && !search.trim();

        if (!shouldAppearOnCurrentPage) {
          return currentAuthors;
        }

        return [result.data, ...currentAuthors].slice(0, pagination.limit);
      });

      setPagination((current) => ({
        ...current,
        total: current.total + 1,
        totalPages: Math.ceil((current.total + 1) / current.limit),
      }));

      toast.success('Author created successfully');
      setAuthorName('');
      setAuthorBio('');
      setIsCreateModalOpen(false);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Unable to create author.'
      );
      toast.error('Unable to create author.');
    } finally {
      setIsCreating(false);
    }
  };

  const openCreateModal = () => {
    setAuthorName('');
    setAuthorBio('');
    setFormError('');
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    if (isCreating) {
      return;
    }

    setIsCreateModalOpen(false);
    setFormError('');
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
            <UserRound className='size-6' />
          </div>

          <p className='mt-6 text-sm font-bold uppercase tracking-[0.16em] text-primary'>
            Administration
          </p>

          <h1 className='mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl'>
            Author management
          </h1>

          <p className='mt-3 max-w-2xl leading-7 text-text-secondary'>
            Browse authors in the catalogue, review their profiles, and see how
            many books are linked to each author.
          </p>

          <button
            type='button'
            onClick={openCreateModal}
            className='mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-hover'
          >
            <Plus className='size-4' />
            Add author
          </button>
        </div>
      </section>

      <section className='rounded-3xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(29,39,33,0.05)] sm:p-6'>
        <form
          onSubmit={handleSearch}
          className='flex flex-col gap-3 sm:flex-row'
        >
          <label className='relative flex-1'>
            <span className='sr-only'>Search authors</span>

            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted' />

            <input
              type='search'
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder='Search authors by name...'
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

        <div className='mt-6 overflow-x-auto'>
          <table className='w-full min-w-[960px] border-separate border-spacing-0 text-left'>
            <thead>
              <tr className='text-xs uppercase tracking-[0.12em] text-text-muted'>
                <th className='border-b border-border px-3 py-3 font-bold'>
                  Author
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Biography
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Books
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Added
                </th>

                <th className='border-b border-border px-3 py-3 font-bold'>
                  Updated
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <AuthorTableSkeleton />
              ) : errorMessage ? (
                <tr>
                  <td
                    colSpan={5}
                    className='px-3 py-10 text-center text-sm text-danger'
                  >
                    {errorMessage}
                  </td>
                </tr>
              ) : authors.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className='px-3 py-10 text-center text-sm text-text-secondary'
                  >
                    No authors found for the current search.
                  </td>
                </tr>
              ) : (
                authors.map((author) => (
                  <AuthorTableRow key={author.id} author={author} />
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-text-secondary'>
            Showing {authors.length} of {pagination.total} author
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

      {isCreateModalOpen ? (
        <div
          className='fixed inset-0 z-50 grid place-items-center bg-black/45 p-4'
          role='dialog'
          aria-modal='true'
          aria-labelledby='create-author-title'
        >
          <form
            onSubmit={handleCreateAuthor}
            className='w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-2xl'
          >
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-sm font-bold uppercase tracking-[0.14em] text-primary'>
                  Catalogue
                </p>

                <h2
                  id='create-author-title'
                  className='mt-1 font-display text-2xl font-semibold text-primary'
                >
                  Add a new author
                </h2>
              </div>

              <button
                type='button'
                onClick={closeCreateModal}
                disabled={isCreating}
                className='grid size-9 place-items-center rounded-xl text-text-secondary transition hover:bg-[#e7f0e8] hover:text-primary disabled:cursor-not-allowed disabled:opacity-60'
                aria-label='Close create author dialog'
              >
                <X className='size-5' />
              </button>
            </div>

            <div className='mt-6 space-y-5'>
              <label className='block'>
                <span className='text-sm font-bold text-primary'>
                  Author name
                </span>

                <input
                  type='text'
                  value={authorName}
                  onChange={(event) => setAuthorName(event.target.value)}
                  placeholder='e.g. Haruki Murakami'
                  minLength={2}
                  maxLength={100}
                  required
                  disabled={isCreating}
                  className='mt-2 h-11 w-full rounded-xl border border-border bg-[#fffaf0] px-3 text-sm text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60'
                />
              </label>

              <label className='block'>
                <span className='text-sm font-bold text-primary'>
                  Biography{' '}
                  <span className='font-normal text-text-muted'>
                    (optional)
                  </span>
                </span>

                <textarea
                  value={authorBio}
                  onChange={(event) => setAuthorBio(event.target.value)}
                  placeholder='A short biography...'
                  maxLength={1000}
                  rows={5}
                  disabled={isCreating}
                  className='mt-2 w-full resize-y rounded-xl border border-border bg-[#fffaf0] px-3 py-3 text-sm text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60'
                />
              </label>

              {formError ? (
                <p
                  role='alert'
                  className='rounded-xl bg-danger/10 px-3 py-2 text-sm font-medium text-danger'
                >
                  {formError}
                </p>
              ) : null}
            </div>

            <div className='mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
              <button
                type='button'
                onClick={closeCreateModal}
                disabled={isCreating}
                className='h-11 rounded-xl border border-border px-5 text-sm font-bold text-text-secondary transition hover:bg-[#fffaf0] disabled:cursor-not-allowed disabled:opacity-60'
              >
                Cancel
              </button>

              <button
                type='submit'
                disabled={isCreating}
                className='h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60'
              >
                {isCreating ? 'Creating...' : 'Create author'}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}

function AuthorTableRow({ author }: { author: AdminAuthor }) {
  return (
    <tr className='transition-colors hover:bg-[#fffaf0]'>
      <td className='border-b border-border px-3 py-4'>
        <div className='flex items-center gap-3'>
          <div className='grid size-11 shrink-0 place-items-center rounded-xl bg-[#e7f0e8] text-primary'>
            <UserRound className='size-5' />
          </div>

          <p className='max-w-56 truncate font-bold text-primary'>
            {author.name}
          </p>
        </div>
      </td>

      <td className='border-b border-border px-3 py-4'>
        <p className='max-w-sm truncate text-sm text-text-secondary'>
          {author.bio || 'No biography added'}
        </p>
      </td>

      <td className='border-b border-border px-3 py-4'>
        <span className='inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#e7f0e8] px-3 py-1.5 text-xs font-bold text-primary'>
          <BookOpen className='size-4 shrink-0' />
          {author._count.books} book{author._count.books === 1 ? '' : 's'}
        </span>
      </td>

      <td className='border-b border-border px-3 py-4 text-sm text-text-secondary'>
        {formatDate(author.createdAt)}
      </td>

      <td className='border-b border-border px-3 py-4 text-sm text-text-secondary'>
        {formatDate(author.updatedAt)}
      </td>
    </tr>
  );
}

function AuthorTableSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((row) => (
        <tr key={row}>
          {[1, 2, 3, 4, 5].map((column) => (
            <td key={column} className='border-b border-border px-3 py-4'>
              <div className='h-8 animate-pulse rounded bg-[#e7f0e8]' />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}
