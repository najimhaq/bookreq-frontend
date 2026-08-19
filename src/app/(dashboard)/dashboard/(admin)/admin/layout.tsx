// src/app/(admin)/admin/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session?.user.role !== 'ADMIN') {
      router.replace('/dashboard');
    }
  }, [isPending, router, session?.user.role]);

  if (isPending) {
    return (
      <div className='grid min-h-screen place-items-center bg-canvas'>
        <div className='h-10 w-44 animate-pulse rounded-xl bg-[#ded3c1]' />
      </div>
    );
  }

  if (session?.user.role !== 'ADMIN') {
    return null;
  }

  return <div className='min-h-screen bg-canvas'>{children}</div>;
}
