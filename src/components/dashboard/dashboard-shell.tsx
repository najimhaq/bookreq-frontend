// src/components/dashboard/dashboard-shell.tsx
'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-canvas'>
      <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block'>
        <DashboardSidebar />
      </div>

      {isSidebarOpen ? (
        <div className='fixed inset-0 z-40 lg:hidden'>
          <button
            type='button'
            aria-label='Close navigation menu'
            onClick={() => setIsSidebarOpen(false)}
            className='absolute inset-0 bg-[#1d2721]/35 backdrop-blur-[1px]'
          />

          <div className='relative h-full w-72 shadow-[12px_0_30px_rgba(29,39,33,0.2)]'>
            <DashboardSidebar onNavigate={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className='lg:pl-72'>
        <DashboardHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className='mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10'>
          {children}
        </main>
      </div>
    </div>
  );
}
