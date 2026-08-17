'use client';

import { BookOpen, BookPlus, Clock3, LibraryBig } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

const stats = [
  {
    label: 'My books',
    value: '0',
    icon: LibraryBig,
    iconClassName: 'bg-[#e7f0e8] text-primary',
  },
  {
    label: 'Currently reading',
    value: '0',
    icon: BookOpen,
    iconClassName: 'bg-[#fff0d3] text-[#9a6515]',
  },
  {
    label: 'Want to read',
    value: '0',
    icon: Clock3,
    iconClassName: 'bg-[#f8e4de] text-accent',
  },
] as const;

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();

  const firstName = session?.user.name?.split(' ')[0] ?? 'Reader';

  return (
    <div className='space-y-8'>
      <section className='relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
        <div className='absolute -right-20 -top-24 size-64 rounded-full bg-[#fff0d3] blur-3xl' />
        <div className='absolute -bottom-24 left-1/3 size-52 rounded-full bg-[#e7f0e8] blur-3xl' />

        <div className='relative'>
          <p className='text-sm font-bold uppercase tracking-[0.16em] text-accent'>
            Your personal library
          </p>

          <h2 className='mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-primary sm:text-4xl'>
            {isPending ? 'Welcome back...' : `Welcome back, ${firstName}.`}
          </h2>

          <p className='mt-3 max-w-2xl leading-7 text-text-secondary'>
            Your shelf is ready for its first story. Add a book, organize your
            reading list, and make this library your own.
          </p>

          <div className='mt-6'>
            <Link href='/dashboard/books/new'>
              <Button size='lg'>
                <BookPlus className='size-4' />
                Add your first book
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className='mb-4 flex items-end justify-between gap-4'>
          <div>
            <p className='text-sm font-bold uppercase tracking-[0.14em] text-accent'>
              At a glance
            </p>

            <h2 className='mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-primary'>
              Your reading progress
            </h2>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-3'>
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className='rounded-2xl border border-border bg-surface p-5'
              >
                <div
                  className={`grid size-11 place-items-center rounded-xl ${stat.iconClassName}`}
                >
                  <Icon className='size-5' />
                </div>

                <p className='mt-5 text-3xl font-bold text-primary'>
                  {stat.value}
                </p>

                <p className='mt-1 text-sm font-medium text-text-secondary'>
                  {stat.label}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className='rounded-3xl border border-dashed border-[#c9b99d] bg-[#fffaf0] px-6 py-10 text-center sm:px-10'>
        <div className='mx-auto max-w-lg'>
          <div className='mx-auto grid size-12 place-items-center rounded-2xl bg-[#fff0d3] text-[#9a6515]'>
            <BookOpen className='size-6' />
          </div>

          <h2 className='mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold text-primary'>
            Your shelf is waiting
          </h2>

          <p className='mt-3 leading-7 text-text-secondary'>
            Add your first book to start building a reading history that feels
            truly yours.
          </p>

          <Link href='/dashboard/books/new' className='mt-6 inline-flex'>
            <Button variant='secondary'>
              Add a book
              <BookPlus className='size-4' />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
