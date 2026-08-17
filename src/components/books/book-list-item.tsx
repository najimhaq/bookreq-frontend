import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRoundPen,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Book, ReadingStatus } from '@/features/books/book.types';

type BookListItemProps = {
  book: Book;
};

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

export function BookListItem({ book }: BookListItemProps) {
  const status = statusStyles[book.status];
  const StatusIcon = status.icon;

  return (
    <Link
      href={`/dashboard/books/${book.id}`}
      className='block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'
    >
      <article className='flex gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:border-[#c9b99d] hover:shadow-[0_8px_22px_rgba(29,39,33,0.06)]'>
        <div className='relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#efe5d5] sm:size-20'>
          {book.coverImageUrl ? (
            <Image
              src={book.coverImageUrl}
              alt={`Cover of ${book.title}`}
              fill
              sizes='(max-width: 639px) 64px, 80px'
              className='object-cover'
            />
          ) : (
            <div className='grid h-full w-full place-items-center'>
              <BookOpen className='size-7 text-accent/75' />
            </div>
          )}
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
            <div className='min-w-0'>
              <h2 className='truncate text-base font-bold text-primary sm:text-lg'>
                {book.title}
              </h2>

              <p className='mt-1 flex items-center gap-1.5 text-sm text-text-secondary'>
                <UserRoundPen className='size-3.5 shrink-0 text-accent' />
                <span className='truncate'>{book.author.name}</span>
              </p>
            </div>

            <span
              className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${status.className}`}
            >
              <StatusIcon className='size-3.5' />
              {status.label}
            </span>
          </div>

          <div className='mt-4 flex items-center gap-4 text-xs text-text-muted'>
            {book.publishedYear ? (
              <span className='inline-flex items-center gap-1.5'>
                <CalendarDays className='size-3.5' />
                {book.publishedYear}
              </span>
            ) : null}

            <span>
              Added{' '}
              {new Intl.DateTimeFormat('en', {
                month: 'short',
                day: 'numeric',
              }).format(new Date(book.createdAt))}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
