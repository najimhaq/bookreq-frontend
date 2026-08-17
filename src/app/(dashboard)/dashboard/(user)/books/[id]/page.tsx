'use client';

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  PencilLine,
  UserRoundPen,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import type {
  Book,
  BookResponse,
  ReadingStatus,
} from '@/features/books/book.types';
import Image from 'next/image';

const statusStyles: Record<
  ReadingStatus,
  {
    label: string;
    className: string;
    icon: typeof BookOpen;
  }
> = {
  WANT_TO_READ: {
    label: 'Want to read',
    className: 'bg-[#fff0d3] text-[#9a6515]',
    icon: Clock3,
  },
  READING: {
    label: 'Reading',
    className: 'bg-[#e7f0e8] text-primary',
    icon: BookOpen,
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-[#e5eef4] text-info',
    icon: CheckCircle2,
  },
};

export default function BookDetailsPage() {
  const params = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/books/${params.id}`,
          {
            credentials: 'include',
          }
        );

        const result = (await response.json()) as BookResponse;

        if (!response.ok) {
          throw new Error('Unable to load this book.');
        }

        setBook(result.data);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load this book.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      void loadBook();
    }
  }, [params.id]);

  if (isLoading) {
    return <BookDetailsSkeleton />;
  }

  if (errorMessage || !book) {
    return (
      <section className='rounded-3xl border border-[#dfaaa0] bg-[#fff0ed] p-6'>
        <h1 className='font-[family-name:var(--font-display)] text-2xl font-semibold text-danger'>
          Book not found
        </h1>

        <p className='mt-2 text-sm text-text-secondary'>
          {errorMessage || 'This book does not exist in your library.'}
        </p>

        <Link href='/dashboard/books' className='mt-6 inline-flex'>
          <Button variant='secondary'>
            <ArrowLeft className='size-4' />
            Back to my books
          </Button>
        </Link>
      </section>
    );
  }

  const status = statusStyles[book.status];
  const StatusIcon = status.icon;

  return (
    <div className='mx-auto max-w-5xl'>
      <Link
        href='/dashboard/books'
        className='inline-flex items-center gap-2 text-sm font-bold text-text-secondary transition-colors hover:text-accent'
      >
        <ArrowLeft className='size-4' />
        Back to my books
      </Link>

      <section className='mt-5 overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_12px_30px_rgba(29,39,33,0.07)]'>
        <div className='grid lg:grid-cols-[minmax(260px,0.8fr)_1.4fr]'>
          <div className='relative min-h-72 overflow-hidden bg-[#efe5d5] sm:min-h-96'>
            {book.coverImageUrl ? (
              <Image
                src={book.coverImageUrl}
                alt={`Cover of ${book.title}`}
                fill
                sizes='(max-width: 1023px) 100vw, 40vw'
                className='object-cover'
              />
            ) : (
              <div className='flex min-h-72 items-center justify-center bg-[radial-gradient(circle_at_top,#fffaf0,transparent_68%),linear-gradient(135deg,#e6eee6,#efe5d5)] sm:min-h-96'>
                <BookOpen className='size-16 text-accent/70' />
              </div>
            )}
          </div>

          <div className='p-6 sm:p-8'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${status.className}`}
              >
                <StatusIcon className='size-3.5' />
                {status.label}
              </span>

              <span className='text-xs font-medium text-text-muted'>
                Added{' '}
                {new Intl.DateTimeFormat('en', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(book.createdAt))}
              </span>
            </div>

            <h1 className='mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-primary sm:text-5xl'>
              {book.title}
            </h1>

            <div className='mt-4 flex items-center gap-2 text-lg text-text-secondary'>
              <UserRoundPen className='size-5 text-accent' />
              <span>{book.author.name}</span>
            </div>

            {book.publishedYear ? (
              <p className='mt-3 inline-flex items-center gap-2 text-sm text-text-muted'>
                <CalendarDays className='size-4' />
                First published in {book.publishedYear}
              </p>
            ) : null}

            <div className='mt-8 flex flex-wrap gap-3'>
              <Button variant='secondary' disabled title='Edit is next'>
                <PencilLine className='size-4' />
                Edit book
              </Button>
            </div>
          </div>
        </div>

        <div className='border-t border-border p-6 sm:p-8'>
          <div className='max-w-3xl'>
            <h2 className='flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-primary'>
              <FileText className='size-5 text-accent' />
              Your note
            </h2>

            <p className='mt-4 whitespace-pre-wrap leading-7 text-text-secondary'>
              {book.description ||
                'You have not added a personal note for this book yet.'}
            </p>
          </div>

          {book.author.bio ? (
            <div className='mt-8 max-w-3xl border-t border-border pt-8'>
              <h2 className='font-[family-name:var(--font-display)] text-2xl font-semibold text-primary'>
                About the author
              </h2>

              <p className='mt-4 whitespace-pre-wrap leading-7 text-text-secondary'>
                {book.author.bio}
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function BookDetailsSkeleton() {
  return (
    <div className='mx-auto max-w-5xl'>
      <div className='h-5 w-36 animate-pulse rounded bg-[#ded3c1]' />

      <div className='mt-5 overflow-hidden rounded-3xl border border-border bg-surface'>
        <div className='grid lg:grid-cols-[minmax(260px,0.8fr)_1.4fr]'>
          <div className='min-h-80 animate-pulse bg-[#efe5d5]' />

          <div className='space-y-5 p-8'>
            <div className='h-6 w-28 animate-pulse rounded bg-[#efe5d5]' />
            <div className='h-14 w-4/5 animate-pulse rounded bg-[#efe5d5]' />
            <div className='h-6 w-1/2 animate-pulse rounded bg-[#efe5d5]' />
            <div className='h-10 w-32 animate-pulse rounded bg-[#efe5d5]' />
          </div>
        </div>

        <div className='border-t border-border p-8'>
          <div className='h-8 w-40 animate-pulse rounded bg-[#efe5d5]' />
          <div className='mt-5 h-20 animate-pulse rounded bg-[#efe5d5]' />
        </div>
      </div>
    </div>
  );
}
