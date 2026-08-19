'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { AdminSidebar } from './admin-sidebar';

type AdminShellProps = {
  children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-canvas'>
      <div className='hidden lg:fixed lg:inset-y-0 lg:flex'>
        <AdminSidebar />
      </div>

      <div className='lg:pl-72'>
        <header className='sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-canvas/90 px-5 backdrop-blur-xl sm:px-8'>
          <div>
            <p className='text-xs font-bold uppercase tracking-[0.16em] text-[#9a6515]'>
              Administration
            </p>

            <h1 className='mt-1 font-display text-xl font-semibold text-primary'>
              BookRaq management
            </h1>
          </div>

          <button
            type='button'
            onClick={() => setIsSidebarOpen(true)}
            className='grid size-10 place-items-center rounded-xl border border-border bg-surface text-text-secondary transition hover:bg-[#fff0d3] hover:text-[#9a6515] lg:hidden'
            aria-label='Open admin menu'
          >
            <Menu className='size-5' />
          </button>
        </header>

        <main>{children}</main>
      </div>

      {isSidebarOpen ? (
        <div className='fixed inset-0 z-50 lg:hidden'>
          <button
            type='button'
            aria-label='Close admin menu'
            onClick={() => setIsSidebarOpen(false)}
            className='absolute inset-0 bg-primary/30 backdrop-blur-sm'
          />

          <div className='relative h-full w-72 shadow-2xl'>
            <button
              type='button'
              onClick={() => setIsSidebarOpen(false)}
              className='absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-xl border border-border bg-surface text-text-secondary'
              aria-label='Close admin menu'
            >
              <X className='size-4' />
            </button>

            <AdminSidebar onNavigate={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
