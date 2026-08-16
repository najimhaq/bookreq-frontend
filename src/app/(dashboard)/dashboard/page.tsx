// src/app/(dashboard)/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, BookMarked, CheckCircle, Clock, Plus } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  readingStatus: 'READING' | 'COMPLETED' | 'WANT_TO_READ';
  rating?: number;
  coverImage?: string;
}

interface Stats {
  total: number;
  reading: number;
  completed: number;
  wantToRead: number;
}

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    reading: 0,
    completed: 0,
    wantToRead: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data.data);
        updateStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (books: Book[]) => {
    const reading = books.filter((b) => b.readingStatus === 'READING').length;
    const completed = books.filter(
      (b) => b.readingStatus === 'COMPLETED'
    ).length;
    const wantToRead = books.filter(
      (b) => b.readingStatus === 'WANT_TO_READ'
    ).length;

    setStats({
      total: books.length,
      reading,
      completed,
      wantToRead,
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'READING':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'COMPLETED':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'WANT_TO_READ':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>
              My Library
            </h1>
            <p className='text-slate-600 dark:text-slate-400'>
              Welcome back! Here&apos;s your reading summary
            </p>
          </div>
          <Link
            href='/books/new'
            className='inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30'
          >
            <Plus className='mr-2 h-5 w-5' />
            Add Book
          </Link>
        </div>

        {/* Stats Grid */}
        <div className='mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  Total Books
                </p>
                <p className='text-3xl font-bold text-slate-900 dark:text-white'>
                  {stats.total}
                </p>
              </div>
              <div className='rounded-full bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'>
                <BookOpen className='h-6 w-6' />
              </div>
            </div>
          </div>

          <div className='rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  Currently Reading
                </p>
                <p className='text-3xl font-bold text-yellow-600 dark:text-yellow-400'>
                  {stats.reading}
                </p>
              </div>
              <div className='rounded-full bg-yellow-100 p-3 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'>
                <BookMarked className='h-6 w-6' />
              </div>
            </div>
          </div>

          <div className='rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  Completed
                </p>
                <p className='text-3xl font-bold text-green-600 dark:text-green-400'>
                  {stats.completed}
                </p>
              </div>
              <div className='rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400'>
                <CheckCircle className='h-6 w-6' />
              </div>
            </div>
          </div>

          <div className='rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-slate-600 dark:text-slate-400'>
                  Want to Read
                </p>
                <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                  {stats.wantToRead}
                </p>
              </div>
              <div className='rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'>
                <Clock className='h-6 w-6' />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Books */}
        <div>
          <h2 className='mb-4 text-xl font-semibold text-slate-900 dark:text-white'>
            Recently Added
          </h2>
          {books.length === 0 ? (
            <div className='rounded-xl bg-white p-12 text-center dark:bg-slate-800'>
              <BookOpen className='mx-auto h-12 w-12 text-slate-400' />
              <h3 className='mt-4 text-lg font-semibold text-slate-900 dark:text-white'>
                No books yet
              </h3>
              <p className='text-slate-600 dark:text-slate-400'>
                Start adding your books to build your library
              </p>
              <Link
                href='/books/new'
                className='mt-4 inline-block rounded-lg bg-indigo-600 px-6 py-2 text-white transition hover:bg-indigo-700'
              >
                Add Your First Book
              </Link>
            </div>
          ) : (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {books.slice(0, 6).map((book) => (
                <div
                  key={book.id}
                  className='rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-slate-800'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-slate-900 dark:text-white'>
                        {book.title}
                      </h3>
                      <p className='text-sm text-slate-600 dark:text-slate-400'>
                        {book.author}
                      </p>
                      <span
                        className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                          book.readingStatus
                        )}`}
                      >
                        {book.readingStatus.replace('_', ' ')}
                      </span>
                    </div>
                    {book.rating && (
                      <div className='flex items-center text-yellow-500'>
                        <span className='text-sm font-medium'>★</span>
                        <span className='ml-1 text-sm'>{book.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
