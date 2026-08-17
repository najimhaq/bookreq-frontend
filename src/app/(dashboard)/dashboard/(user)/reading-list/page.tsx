// src/app/(dashboard)/dashboard/(user)/reading-list/page.tsx
'use client';

import { ListChecks } from 'lucide-react';
import { useEffect, useState } from 'react';

import { BooksLoadingSkeleton } from '@/components/dashboard/BooksLoadingSkeleton';
import { PagePlaceholder } from '@/components/dashboard/page-placeholder';
import { getMyBooks } from '@/features/books/book.api';
import type { Book } from '@/features/books/book.types';
import { ReadingListContent } from '@/components/books/reading-list-content';

export default function ReadingListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [bookError, setBookError] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getMyBooks();

        setBooks(data);
      } catch (error) {
        setBookError(
          error instanceof Error ? error.message : 'Unable to load your books.'
        );
      } finally {
        setIsLoadingBooks(false);
      }
    };

    void loadBooks();
  }, []);

  if (isLoadingBooks) {
    return <BooksLoadingSkeleton />;
  }

  if (bookError) {
    return (
      <section className='rounded-3xl border border-[#dfaaa0] bg-[#fff0ed] p-6'>
        <h1 className='font-display text-2xl font-semibold text-danger'>
          We could not load your books
        </h1>

        <p className='mt-2 text-sm text-text-secondary'>{bookError}</p>
      </section>
    );
  }

  const wantToReadBooks = books.filter(
    (book) => book.status === 'WANT_TO_READ'
  );

  const currentlyReadingBooks = books.filter(
    (book) => book.status === 'READING'
  );

  const completedBooks = books.filter((book) => book.status === 'COMPLETED');

  return (
    <ReadingListContent
      wantToReadBooks={wantToReadBooks}
      currentlyReadingBooks={currentlyReadingBooks}
      completedBooks={completedBooks}
    />
  );
}
