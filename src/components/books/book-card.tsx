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

type BookCardProps = {
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

export function BookCard({ book }: BookCardProps) {
  const status = statusStyles[book.status];
  const StatusIcon = status.icon;

  return (
    <Link
      href={`/dashboard/books/${book.id}`}
      className='block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'
    >
      <article className='group overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_24px_rgba(29,39,33,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#c9b99d] hover:shadow-[0_16px_34px_rgba(29,39,33,0.1)]'>
        <div className='relative aspect-[4/3] overflow-hidden bg-[#efe5d5]'>
          {book.coverImageUrl ? (
            <Image
              src={book.coverImageUrl}
              alt={`Cover of ${book.title}`}
              fill
              sizes='(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw'
              className='object-cover transition duration-500 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,#fffaf0,transparent_68%),linear-gradient(135deg,#e6eee6,#efe5d5)] text-primary'>
              <BookOpen className='size-11 text-accent/75' />
              <span className='mt-3 max-w-[75%] text-center text-sm font-bold leading-5 text-primary'>
                {book.title}
              </span>
            </div>
          )}

          <span
            className={`absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${status.className}`}
          >
            <StatusIcon className='size-3.5' />
            {status.label}
          </span>
        </div>

        <div className='p-5'>
          <h2 className='line-clamp-1 text-lg font-bold text-primary'>
            {book.title}
          </h2>

          <p className='mt-1 flex items-center gap-1.5 text-sm text-text-secondary'>
            <UserRoundPen className='size-3.5 shrink-0 text-accent' />
            <span className='truncate'>{book.author.name}</span>
          </p>

          <div className='mt-4 flex items-center justify-between gap-3 border-t border-border pt-4'>
            {book.publishedYear ? (
              <span className='inline-flex items-center gap-1.5 text-xs font-medium text-text-muted'>
                <CalendarDays className='size-3.5' />
                {book.publishedYear}
              </span>
            ) : (
              <span className='text-xs text-text-muted'>Year not added</span>
            )}

            <span className='text-xs font-medium text-text-muted'>
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
