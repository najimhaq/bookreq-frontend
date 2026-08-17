import { BookOpen, CheckCircle2, Clock3, ListChecks } from 'lucide-react';

import { BookCard } from '@/components/books/book-card';
import type { Book } from '@/features/books/book.types';

type ReadingListContentProps = {
  wantToReadBooks: Book[];
  currentlyReadingBooks: Book[];
  completedBooks: Book[];
};

type ReadingSectionProps = {
  title: string;
  description: string;
  books: Book[];
  icon: typeof ListChecks;
  iconClassName: string;
  emptyMessage: string;
};

export function ReadingListContent({
  wantToReadBooks,
  currentlyReadingBooks,
  completedBooks,
}: ReadingListContentProps) {
  const totalBooks =
    wantToReadBooks.length +
    currentlyReadingBooks.length +
    completedBooks.length;

  const statusCards = [
    {
      label: 'Want to read',
      value: wantToReadBooks.length,
      icon: Clock3,
      className: 'bg-[#fff0d3] text-[#9a6515]',
    },
    {
      label: 'Currently reading',
      value: currentlyReadingBooks.length,
      icon: BookOpen,
      className: 'bg-[#e7f0e8] text-primary',
    },
    {
      label: 'Completed',
      value: completedBooks.length,
      icon: CheckCircle2,
      className: 'bg-[#e5eef4] text-info',
    },
  ] as const;

  return (
    <div className='space-y-8'>
      <section className='relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
        <div
          aria-hidden='true'
          className='absolute -right-16 -top-16 size-52 rounded-full bg-[#fff0d3] blur-3xl'
        />

        <div className='relative max-w-2xl'>
          <div className='grid size-12 place-items-center rounded-2xl bg-[#e7f0e8] text-primary'>
            <ListChecks className='size-6' />
          </div>

          <p className='mt-6 text-sm font-bold uppercase tracking-[0.16em] text-accent'>
            Reading list
          </p>

          <h1 className='mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl'>
            Choose what comes next.
          </h1>

          <p className='mt-4 max-w-xl leading-7 text-text-secondary'>
            {totalBooks > 0
              ? `You have ${totalBooks} book${
                  totalBooks === 1 ? '' : 's'
                } in your library. Keep track of what you plan to read, what you are reading, and what you have completed.`
              : 'Your reading list is empty. Add a book to start organizing your reading journey.'}
          </p>
        </div>
      </section>

      <section className='grid gap-4 sm:grid-cols-3'>
        {statusCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.label}
              className='rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(29,39,33,0.05)]'
            >
              <div
                className={`grid size-11 place-items-center rounded-xl ${card.className}`}
              >
                <Icon className='size-5' />
              </div>

              <p className='mt-5 text-3xl font-bold text-primary'>
                {card.value}
              </p>

              <p className='mt-1 text-sm font-medium text-text-secondary'>
                {card.label}
              </p>
            </article>
          );
        })}
      </section>

      <ReadingSection
        title='Want to read'
        description='Books saved for your next reading adventure.'
        books={wantToReadBooks}
        icon={Clock3}
        iconClassName='bg-[#fff0d3] text-[#9a6515]'
        emptyMessage='No books are waiting on your reading list yet.'
      />

      <ReadingSection
        title='Currently reading'
        description='Keep the stories you are reading close at hand.'
        books={currentlyReadingBooks}
        icon={BookOpen}
        iconClassName='bg-[#e7f0e8] text-primary'
        emptyMessage='You are not currently reading any books.'
      />

      <ReadingSection
        title='Completed'
        description='A growing record of the stories you have finished.'
        books={completedBooks}
        icon={CheckCircle2}
        iconClassName='bg-[#e5eef4] text-info'
        emptyMessage='No completed books yet. Your finished reads will appear here.'
      />
    </div>
  );
}

function ReadingSection({
  title,
  description,
  books,
  icon: Icon,
  iconClassName,
  emptyMessage,
}: ReadingSectionProps) {
  return (
    <section>
      <div className='flex flex-wrap items-end justify-between gap-3'>
        <div>
          <div className='flex items-center gap-2'>
            <div
              className={`grid size-9 place-items-center rounded-xl ${iconClassName}`}
            >
              <Icon className='size-4' />
            </div>

            <h2 className='font-display text-2xl font-semibold text-primary'>
              {title}
            </h2>
          </div>

          <p className='mt-3 text-sm leading-6 text-text-secondary'>
            {description}
          </p>
        </div>

        <p className='text-sm font-bold text-text-muted'>
          {books.length} book{books.length === 1 ? '' : 's'}
        </p>
      </div>

      {books.length > 0 ? (
        <div className='mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className='mt-5 rounded-2xl border border-dashed border-[#c9b99d] bg-[#fffaf0] px-5 py-6 text-sm text-text-secondary'>
          {emptyMessage}
        </div>
      )}
    </section>
  );
}
