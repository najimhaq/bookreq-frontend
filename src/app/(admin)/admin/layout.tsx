// src/app/(admin)/admin/layout.tsx
'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';
import { AdminShell } from '@/components/admin/admin-shell';

export default function AdminLayout({ children }: { children: ReactNode }) {

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const role = session?.user.role;


  useEffect(() => {
    if (!isPending && role !== 'ADMIN') {
      router.replace('/dashboard');
    }
  }, [isPending, role, router]);

  if (isPending) {
    return (
      <div className='grid min-h-screen place-items-center bg-canvas'>
        <div className='h-10 w-44 animate-pulse rounded-xl bg-[#ded3c1]' />
      </div>
    );
  }

  if (role !== 'ADMIN') {
    return null;
  }

  return <AdminShell>{children}</AdminShell>;
}
