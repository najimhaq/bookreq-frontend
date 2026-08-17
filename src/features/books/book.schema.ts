import { z } from 'zod';

export const readingStatuses = [
  'WANT_TO_READ',
  'READING',
  'COMPLETED',
] as const;

export const createBookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Book title is required')
    .max(200, 'Book title must be at most 200 characters'),

  authorName: z
    .string()
    .trim()
    .min(2, 'Author name must be at least 2 characters')
    .max(120, 'Author name must be at most 120 characters'),

  status: z.enum(readingStatuses),

  publishedYear: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === '' ||
        (/^\d{4}$/.test(value) &&
          Number(value) >= 1000 &&
          Number(value) <= new Date().getFullYear()),
      'Enter a valid publication year'
    ),

  description: z
    .string()
    .trim()
    .max(2_000, 'Description must be at most 2000 characters'),

  coverImageUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || z.url().safeParse(value).success,
      'Enter a valid cover image URL'
    ),
});

export type CreateBookFormInput = z.infer<typeof createBookSchema>;
