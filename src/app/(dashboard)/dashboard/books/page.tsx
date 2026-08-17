'use client';

import { BookOpen, Grid2X2, List, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { BookCard } from '@/components/books/book-card';
import { BookListItem } from '@/components/books/book-list-item';
import { Button } from '@/components/ui/button';
import type { Book, BooksResponse } from '@/features/books/book.types';

type ViewMode = 'grid' | 'list';

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/books`,
          {
            credentials: 'include',
          }
        );

        const result = (await response.json()) as BooksResponse;

        if (!response.ok) {
          throw new Error('Unable to load your books.');
        }

        setBooks(result.data);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load your books.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadBooks();
  }, []);

  if (isLoading) {
    return <BooksLoadingSkeleton />;
  }

  if (errorMessage) {
    return (
      <section className='rounded-3xl border border-[#dfaaa0] bg-[#fff0ed] p-6'>
        <h1 className='font-[family-name:var(--font-display)] text-2xl font-semibold text-danger'>
          We could not load your books
        </h1>

        <p className='mt-2 text-sm text-text-secondary'>{errorMessage}</p>
      </section>
    );
  }

  return (
    <div className='space-y-7'>
      <section className='flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
        <div>
          <p className='text-sm font-bold uppercase tracking-[0.16em] text-accent'>
            My bookshelf
          </p>

          <h1 className='mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-primary sm:text-4xl'>
            Your books, your story.
          </h1>

          <p className='mt-3 max-w-2xl leading-7 text-text-secondary'>
            Keep every book you own, are reading, or hope to explore in one calm
            place.
          </p>
        </div>

        <Link href='/dashboard/books/new'>
          <Button>
            <Plus className='size-4' />
            Add a book
          </Button>
        </Link>
      </section>

      {books.length === 0 ? (
        <EmptyBooksState />
      ) : (
        <>
          <section className='flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm font-semibold text-text-secondary'>
              <span className='font-bold text-primary'>{books.length}</span>{' '}
              {books.length === 1 ? 'book' : 'books'} in your library
            </p>

            <div className='flex items-center gap-2'>
              <div
                className='hidden items-center gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm text-text-muted sm:flex'
                title='Search will be implemented next'
              >
                <Search className='size-4' />
                Search soon
              </div>

              <div
                className='flex rounded-xl border border-border bg-surface-elevated p-1'
                aria-label='Select book view'
              >
                <button
                  type='button'
                  onClick={() => setViewMode('grid')}
                  aria-label='Grid view'
                  aria-pressed={viewMode === 'grid'}
                  className={[
                    'grid size-8 place-items-center rounded-lg transition-colors',
                    viewMode === 'grid'
                      ? 'bg-[#e7f0e8] text-primary'
                      : 'text-text-muted hover:text-primary',
                  ].join(' ')}
                >
                  <Grid2X2 className='size-4' />
                </button>

                <button
                  type='button'
                  onClick={() => setViewMode('list')}
                  aria-label='List view'
                  aria-pressed={viewMode === 'list'}
                  className={[
                    'grid size-8 place-items-center rounded-lg transition-colors',
                    viewMode === 'list'
                      ? 'bg-[#e7f0e8] text-primary'
                      : 'text-text-muted hover:text-primary',
                  ].join(' ')}
                >
                  <List className='size-4' />
                </button>
              </div>
            </div>
          </section>

          {viewMode === 'grid' ? (
            <section className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </section>
          ) : (
            <section className='space-y-3'>
              {books.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}

function EmptyBooksState() {
  return (
    <section className='rounded-3xl border border-dashed border-[#c9b99d] bg-[#fffaf0] px-6 py-14 text-center sm:px-10'>
      <div className='mx-auto grid size-14 place-items-center rounded-2xl bg-[#fff0d3] text-[#9a6515]'>
        <BookOpen className='size-7' />
      </div>

      <h2 className='mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold text-primary'>
        Your shelf is ready.
      </h2>

      <p className='mx-auto mt-3 max-w-md leading-7 text-text-secondary'>
        Add your first book and start building a library that remembers every
        story that matters to you.
      </p>

      <Link href='/dashboard/books/new' className='mt-7 inline-flex'>
        <Button>
          <Plus className='size-4' />
          Add your first book
        </Button>
      </Link>
    </section>
  );
}

function BooksLoadingSkeleton() {
  return (
    <div className='space-y-7'>
      <div>
        <div className='h-4 w-28 animate-pulse rounded bg-[#ded3c1]' />
        <div className='mt-3 h-10 w-72 max-w-full animate-pulse rounded bg-[#efe5d5]' />
        <div className='mt-3 h-5 w-full max-w-xl animate-pulse rounded bg-[#efe5d5]' />
      </div>

      <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className='overflow-hidden rounded-2xl border border-border bg-surface'
          >
            <div className='aspect-[4/3] animate-pulse bg-[#efe5d5]' />
            <div className='space-y-3 p-5'>
              <div className='h-5 animate-pulse rounded bg-[#efe5d5]' />
              <div className='h-4 w-2/3 animate-pulse rounded bg-[#efe5d5]' />
              <div className='mt-6 h-4 w-1/2 animate-pulse rounded bg-[#efe5d5]' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
