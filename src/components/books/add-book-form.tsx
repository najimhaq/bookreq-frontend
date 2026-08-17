'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, BookPlus, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  createBookSchema,
  readingStatuses,
  type CreateBookFormInput,
} from '@/features/books/book.schema';

const statusOptions: Record<
  (typeof readingStatuses)[number],
  { label: string; description: string }
> = {
  WANT_TO_READ: {
    label: 'Want to read',
    description: 'Keep it on your future reading shelf',
  },
  READING: {
    label: 'Reading',
    description: 'You are reading it now',
  },
  COMPLETED: {
    label: 'Completed',
    description: 'You have finished this book',
  },
};

export function AddBookForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<CreateBookFormInput>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: '',
      authorName: '',
      status: 'WANT_TO_READ',
      publishedYear: '',
      description: '',
      coverImageUrl: '',
    },
  });

  const selectedStatus = watch('status');

  const onSubmit = async (values: CreateBookFormInput) => {
    const publishedYear = values.publishedYear
      ? Number(values.publishedYear)
      : undefined;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.title,
          authorName: values.authorName,
          status: values.status,
          publishedYear,
          description: values.description || undefined,
          coverImageUrl: values.coverImageUrl || undefined,
        }),
      }
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      setError('root', {
        message: result?.message ?? 'Unable to add this book.',
      });

      return;
    }

    toast.success('Book added to your library!');
    router.push('/dashboard/books');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
      <section className='rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-start'>
          <div>
            <p className='text-sm font-bold uppercase tracking-[0.16em] text-accent'>
              Add a book
            </p>

            <h1 className='mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-primary sm:text-4xl'>
              Give a new story a shelf.
            </h1>

            <p className='mt-3 max-w-2xl leading-7 text-text-secondary'>
              Add the details you want to remember. You can edit them anytime.
            </p>
          </div>

          <Link
            href='/dashboard/books'
            className='inline-flex shrink-0 items-center gap-2 text-sm font-bold text-text-secondary transition-colors hover:text-accent'
          >
            <ArrowLeft className='size-4' />
            Back to my books
          </Link>
        </div>

        <div className='mt-8 grid gap-5 sm:grid-cols-2'>
          <label className='block space-y-2 sm:col-span-2'>
            <span className='text-sm font-semibold text-primary'>
              Book title <span className='text-danger'>*</span>
            </span>

            <Input
              placeholder='For example: Atomic Habits'
              hasError={Boolean(errors.title)}
              {...register('title')}
            />

            {errors.title ? (
              <p className='text-xs font-medium text-danger'>
                {errors.title.message}
              </p>
            ) : null}
          </label>

          <label className='block space-y-2'>
            <span className='text-sm font-semibold text-primary'>
              Author name <span className='text-danger'>*</span>
            </span>

            <Input
              placeholder='For example: James Clear'
              hasError={Boolean(errors.authorName)}
              {...register('authorName')}
            />

            {errors.authorName ? (
              <p className='text-xs font-medium text-danger'>
                {errors.authorName.message}
              </p>
            ) : null}
          </label>

          <label className='block space-y-2'>
            <span className='text-sm font-semibold text-primary'>
              Publication year
            </span>

            <Input
              inputMode='numeric'
              placeholder='For example: 2018'
              hasError={Boolean(errors.publishedYear)}
              {...register('publishedYear')}
            />

            {errors.publishedYear ? (
              <p className='text-xs font-medium text-danger'>
                {errors.publishedYear.message}
              </p>
            ) : (
              <p className='text-xs text-text-muted'>Optional</p>
            )}
          </label>
        </div>

        <fieldset className='mt-8'>
          <legend className='text-sm font-semibold text-primary'>
            Reading status <span className='text-danger'>*</span>
          </legend>

          <div className='mt-3 grid gap-3 sm:grid-cols-3'>
            {readingStatuses.map((status) => {
              const option = statusOptions[status];
              const checked = selectedStatus === status;

              return (
                <label
                  key={status}
                  className={[
                    'cursor-pointer rounded-2xl border p-4 transition-colors',
                    checked
                      ? 'border-primary bg-[#e7f0e8]'
                      : 'border-border bg-surface-elevated hover:border-[#c9b99d]',
                  ].join(' ')}
                >
                  <input
                    type='radio'
                    value={status}
                    className='sr-only'
                    {...register('status')}
                  />

                  <span className='block font-bold text-primary'>
                    {option.label}
                  </span>

                  <span className='mt-1 block text-xs leading-5 text-text-secondary'>
                    {option.description}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </section>

      <section className='rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
        <div>
          <h2 className='font-[family-name:var(--font-display)] text-2xl font-semibold text-primary'>
            Optional details
          </h2>

          <p className='mt-2 text-sm leading-6 text-text-secondary'>
            These details can make your collection feel more personal.
          </p>
        </div>

        <div className='mt-6 space-y-5'>
          <label className='block space-y-2'>
            <span className='text-sm font-semibold text-primary'>
              Cover image URL
            </span>

            <Input
              type='url'
              placeholder='https://example.com/book-cover.jpg'
              hasError={Boolean(errors.coverImageUrl)}
              {...register('coverImageUrl')}
            />

            {errors.coverImageUrl ? (
              <p className='text-xs font-medium text-danger'>
                {errors.coverImageUrl.message}
              </p>
            ) : (
              <p className='text-xs text-text-muted'>
                You can add a cover image later.
              </p>
            )}
          </label>

          <label className='block space-y-2'>
            <span className='text-sm font-semibold text-primary'>
              A note about this book
            </span>

            <textarea
              rows={5}
              placeholder='Why do you want to read it? What do you hope to remember?'
              className='w-full resize-y rounded-xl border border-border bg-surface-elevated px-4 py-3 text-base text-text-primary outline-none transition placeholder:text-text-muted hover:border-[#c9b99d] focus:border-primary focus:ring-4 focus:ring-[#183b2b]/10'
              {...register('description')}
            />

            {errors.description ? (
              <p className='text-xs font-medium text-danger'>
                {errors.description.message}
              </p>
            ) : null}
          </label>
        </div>
      </section>

      {errors.root ? (
        <div
          role='alert'
          className='rounded-2xl border border-[#dfaaa0] bg-[#fff0ed] px-4 py-3 text-sm font-medium text-danger'
        >
          {errors.root.message}
        </div>
      ) : null}

      <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
        <Link href='/dashboard/books'>
          <Button type='button' variant='ghost' className='w-full sm:w-auto'>
            Cancel
          </Button>
        </Link>

        <Button
          type='submit'
          size='lg'
          isLoading={isSubmitting}
          className='w-full sm:w-auto'
        >
          {isSubmitting ? (
            <LoaderCircle className='size-4 animate-spin' />
          ) : (
            <BookPlus className='size-4' />
          )}
          Add to my library
        </Button>
      </div>
    </form>
  );
}
