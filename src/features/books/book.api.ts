// src/features/books/book.api.ts
import type { BookResponse, BooksResponse } from './book.types';

export async function getMyBooks(): Promise<BooksResponse['data']> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
    credentials: 'include',
  });

  const result = (await response.json()) as BooksResponse;

  if (!response.ok) {
    throw new Error('Unable to load your books.');
  }

  return result.data;
}

export async function getBookById(id: string): Promise<BookResponse['data']> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
    {
      credentials: 'include',
    }
  );

  const result = (await response.json()) as BookResponse;

  if (!response.ok) {
    throw new Error('Unable to load this book.');
  }

  return result.data;
}
