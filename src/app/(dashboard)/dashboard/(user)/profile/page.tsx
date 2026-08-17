'use client';

import {
  BadgeCheck,
  Camera,
  CircleUserRound,
  LoaderCircle,
  Mail,
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { authClient } from '@/lib/auth-client';

type ProfileImageResponse = {
  success: boolean;
  data?: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  message?: string;
};

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const maximumFileSize = 5 * 1024 * 1024;

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  if (isPending) {
    return (
      <div className='rounded-3xl border border-border bg-surface p-8'>
        <div className='h-7 w-52 animate-pulse rounded bg-[#ded3c1]' />
        <div className='mt-6 h-32 animate-pulse rounded-2xl bg-[#efe5d5]' />
      </div>
    );
  }

  const user = session?.user;
  const isAdmin = user?.role === 'ADMIN';
  const currentImageUrl = imageUrl ?? user?.image ?? null;

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadError('');
    setUploadSuccess('');

    if (!allowedImageTypes.has(file.type)) {
      setUploadError('Please choose a JPEG, PNG, or WebP image.');
      event.target.value = '';
      return;
    }

    if (file.size > maximumFileSize) {
      setUploadError('Profile image must be 5 MB or smaller.');
      event.target.value = '';
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/profile-image`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: formData,
        }
      );

      const result = (await response.json()) as ProfileImageResponse;

      if (!response.ok || !result.success || !result.data?.image) {
        throw new Error(result.message ?? 'Profile image upload failed.');
      }

      setImageUrl(result.data.image);
      setUploadSuccess('Profile photo updated successfully.');
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : 'Profile image upload failed.'
      );
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className='max-w-3xl'>
      <section className='rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
        <p className='text-sm font-bold uppercase tracking-[0.16em] text-accent'>
          Your profile
        </p>

        <h1 className='mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl'>
          Account details
        </h1>

        <p className='mt-3 leading-7 text-text-secondary'>
          This is the account connected to your personal BookRaq library.
        </p>

        <div className='mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-[#fffaf0] p-5 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex min-w-0 items-center gap-4'>
            <div className='relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-primary text-xl font-bold text-white'>
              {currentImageUrl ? (
                <Image
                  src={currentImageUrl}
                  alt={`${user?.name ?? 'Reader'}'s profile photo`}
                  fill
                  sizes='64px'
                  className='object-cover'
                />
              ) : (
                <span>{user?.name?.slice(0, 1).toUpperCase() ?? 'R'}</span>
              )}
            </div>

            <div className='min-w-0'>
              <h2 className='truncate text-lg font-bold text-primary'>
                {user?.name ?? 'Reader'}
              </h2>

              <p className='truncate text-sm text-text-secondary'>
                {user?.email ?? 'No email available'}
              </p>
            </div>
          </div>

          <div className='shrink-0'>
            <input
              ref={fileInputRef}
              id='profile-image'
              type='file'
              accept='image/jpeg,image/png,image/webp'
              className='sr-only'
              disabled={isUploading}
              onChange={handleImageChange}
            />

            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className='inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isUploading ? (
                <>
                  <LoaderCircle className='size-4 animate-spin' />
                  Uploading...
                </>
              ) : (
                <>
                  <Camera className='size-4' />
                  Change photo
                </>
              )}
            </button>
          </div>
        </div>

        {uploadError ? (
          <p className='mt-4 rounded-xl border border-[#dfaaa0] bg-[#fff0ed] px-4 py-3 text-sm font-medium text-danger'>
            {uploadError}
          </p>
        ) : null}

        {uploadSuccess ? (
          <p className='mt-4 rounded-xl border border-[#a9cfad] bg-[#edf7ee] px-4 py-3 text-sm font-medium text-primary'>
            {uploadSuccess}
          </p>
        ) : null}

        <p className='mt-3 text-xs text-text-muted'>
          JPEG, PNG, or WebP. Maximum file size: 5 MB.
        </p>

        <dl className='mt-6 divide-y divide-border rounded-2xl border border-border'>
          <div className='flex items-center gap-4 p-4'>
            <CircleUserRound className='size-5 text-accent' />

            <div>
              <dt className='text-xs font-bold uppercase tracking-[0.12em] text-text-muted'>
                Display name
              </dt>

              <dd className='mt-1 font-semibold text-primary'>
                {user?.name ?? 'Reader'}
              </dd>
            </div>
          </div>

          <div className='flex items-center gap-4 p-4'>
            <Mail className='size-5 text-accent' />

            <div>
              <dt className='text-xs font-bold uppercase tracking-[0.12em] text-text-muted'>
                Email address
              </dt>

              <dd className='mt-1 font-semibold text-primary'>
                {user?.email ?? 'No email available'}
              </dd>
            </div>
          </div>

          <div className='flex items-center gap-4 p-4'>
            <BadgeCheck className='size-5 text-accent' />

            <div>
              <dt className='text-xs font-bold uppercase tracking-[0.12em] text-text-muted'>
                Account role
              </dt>

              <dd className='mt-1 font-semibold text-primary'>
                {isAdmin ? 'Administrator' : 'Reader'}
              </dd>
            </div>
          </div>
        </dl>
      </section>
    </div>
  );
}
