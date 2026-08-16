// src/app/page.tsx
import Link from 'next/link';
import { BookOpen, Users, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900'>
      {/* Hero Section */}
      <section className='container mx-auto px-4 py-20 text-center'>
        <div className='mx-auto max-w-4xl'>
          {/* Badge */}
          <div className='mb-6 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'>
            📚 Your Personal Library Manager
          </div>

          {/* Main Heading */}
          <h1 className='mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl'>
            Welcome to{' '}
            <span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              Bookraq
            </span>
          </h1>

          {/* Subtitle */}
          <p className='mb-10 text-xl text-slate-600 dark:text-slate-400 md:text-2xl'>
            Organize, track, and discover your reading journey like never
            before. Your personal library, always with you.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link
              href='/dashboard'
              className='inline-flex items-center rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30'
            >
              Get Started
              <ArrowRight className='ml-2 h-5 w-5' />
            </Link>
            <Link
              href='/books'
              className='inline-flex items-center rounded-lg border-2 border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 transition-all hover:border-indigo-600 hover:bg-indigo-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/30'
            >
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-bold text-slate-900 dark:text-white md:text-4xl'>
              Everything you need to manage your library
            </h2>
            <p className='mt-4 text-lg text-slate-600 dark:text-slate-400'>
              Track your reading, organize your books, and achieve your goals.
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            {/* Feature 1 */}
            <div className='rounded-2xl bg-white p-8 shadow-lg transition-transform hover:scale-105 dark:bg-slate-800/50'>
              <div className='mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'>
                <BookOpen className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-slate-900 dark:text-white'>
                Track Your Reading
              </h3>
              <p className='text-slate-600 dark:text-slate-400'>
                Log books you&apos;ve read, are reading, or want to read. Keep
                notes and highlights.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='rounded-2xl bg-white p-8 shadow-lg transition-transform hover:scale-105 dark:bg-slate-800/50'>
              <div className='mb-4 inline-flex rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'>
                <Star className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-slate-900 dark:text-white'>
                Rate & Review
              </h3>
              <p className='text-slate-600 dark:text-slate-400'>
                Rate every book you read and write reviews to remember your
                thoughts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='rounded-2xl bg-white p-8 shadow-lg transition-transform hover:scale-105 dark:bg-slate-800/50'>
              <div className='mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400'>
                <Users className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-slate-900 dark:text-white'>
                Share with Friends
              </h3>
              <p className='text-slate-600 dark:text-slate-400'>
                Connect with friends and discover what they&apos;re reading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900/50'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl'>
            <div className='grid grid-cols-2 gap-8 text-center md:grid-cols-4'>
              <div>
                <div className='text-4xl font-bold text-indigo-600 dark:text-indigo-400'>
                  10K+
                </div>
                <div className='mt-2 text-sm text-slate-600 dark:text-slate-400'>
                  Books Tracked
                </div>
              </div>
              <div>
                <div className='text-4xl font-bold text-purple-600 dark:text-purple-400'>
                  5K+
                </div>
                <div className='mt-2 text-sm text-slate-600 dark:text-slate-400'>
                  Active Readers
                </div>
              </div>
              <div>
                <div className='text-4xl font-bold text-green-600 dark:text-green-400'>
                  50K+
                </div>
                <div className='mt-2 text-sm text-slate-600 dark:text-slate-400'>
                  Reviews
                </div>
              </div>
              <div>
                <div className='text-4xl font-bold text-orange-600 dark:text-orange-400'>
                  4.8
                </div>
                <div className='mt-2 text-sm text-slate-600 dark:text-slate-400'>
                  Average Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
