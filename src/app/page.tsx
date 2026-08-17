import Link from 'next/link';
import { ArrowRight, BookOpen, Star, Users } from 'lucide-react';

import { LandingNavbar } from '@/components/shared/landing-navbar';
import { SiteFooter } from '@/components/shared/site-footer';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-canvas text-text-primary'>
      <LandingNavbar />

      <main>
        <section className='relative overflow-hidden border-b border-border'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,145,46,0.16),transparent_48%)]' />

          <div className='relative container mx-auto px-4 py-24 text-center md:py-32'>
            <div className='mx-auto max-w-4xl'>
              <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9bd85] bg-[#fff7e8] px-4 py-2 text-sm font-semibold text-primary'>
                <BookOpen className='h-4 w-4 text-gold' />
                Your personal reading room
              </div>

              <h1 className='font-display text-5xl font-semibold leading-tight tracking-tight text-primary md:text-6xl lg:text-7xl'>
                Build a library that feels{' '}
                <span className='text-accent'>like yours.</span>
              </h1>

              <p className='mx-auto mt-7 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl'>
                Save the books you love, keep track of what you are reading, and
                make every shelf part of your reading story.
              </p>

              <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                <Link
                  href='/dashboard'
                  className='inline-flex items-center rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition hover:bg-primary-hover hover:shadow-[0_12px_30px_rgba(24,59,43,0.22)]'
                >
                  Start your library
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>

                <Link
                  href='/books'
                  className='inline-flex items-center rounded-lg border border-border bg-surface px-7 py-3.5 text-base font-semibold text-primary transition hover:border-accent hover:bg-[#fff7f0]'
                >
                  Explore your shelf
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='container mx-auto px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            <div className='mx-auto mb-12 max-w-2xl text-center'>
              <p className='text-sm font-bold uppercase tracking-[0.2em] text-accent'>
                Made for readers
              </p>

              <h2 className='mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-primary'>
                A calm home for every book
              </h2>

              <p className='mt-4 text-lg text-text-secondary'>
                Keep your reading life organized without making it feel like
                another productivity tool.
              </p>
            </div>

            <div className='grid gap-6 md:grid-cols-3'>
              <FeatureCard
                icon={<BookOpen className='h-7 w-7' />}
                iconClassName='bg-[#e7f0e8] text-primary'
                title='Track your reading'
                description='Keep books in Reading, Completed, and Want to Read shelves.'
              />

              <FeatureCard
                icon={<Star className='h-7 w-7' />}
                iconClassName='bg-[#fff0d3] text-[#9a6515]'
                title='Remember each book'
                description='Add your thoughts and build a personal archive of what you learn.'
              />

              <FeatureCard
                icon={<Users className='h-7 w-7' />}
                iconClassName='bg-[#f8e4de] text-accent'
                title='Discover authors'
                description='Organize books by author and keep your favorite voices close.'
              />
            </div>
          </div>
        </section>

        <section className='border-y border-border bg-canvas-elevated py-16'>
          <div className='container mx-auto px-4'>
            <div className='mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center md:grid-cols-4'>
              <Stat value='Your' label='private collection' />
              <Stat value='3' label='reading shelves' />
              <Stat value='∞' label='books to remember' />
              <Stat value='One' label='calm library' />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function FeatureCard({
  icon,
  iconClassName,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconClassName: string;
  title: string;
  description: string;
}) {
  return (
    <article className='rounded-2xl border border-border bg-surface p-7 shadow-[0_8px_24px_rgba(29,39,33,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#c9b99d] hover:shadow-[0_16px_34px_rgba(29,39,33,0.10)]'>
      <div className={`mb-5 inline-flex rounded-xl p-3 ${iconClassName}`}>
        {icon}
      </div>

      <h3 className='text-xl font-bold text-primary'>{title}</h3>

      <p className='mt-3 leading-7 text-text-secondary'>{description}</p>
    </article>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className='font-[family-name:var(--font-display)] text-3xl font-semibold text-primary md:text-4xl'>
        {value}
      </p>

      <p className='mt-2 text-sm text-text-secondary'>{label}</p>
    </div>
  );
}
