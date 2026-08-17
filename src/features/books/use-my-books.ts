// src/features/books/use-my-books.ts
'use client';

import { useCallback, useEffect, useState } from 'react';

import { getMyBooks } from './book.api';
import type { Book } from './book.types';

export function useMyBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await getMyBooks();

      setBooks(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to load your books.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch(false);
  }, [refetch]);

  return {
    books,
    isLoading,
    error,
    refetch,
  };
}
