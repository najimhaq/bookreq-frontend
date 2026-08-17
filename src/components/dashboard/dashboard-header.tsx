'use client';

import { Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

type DashboardHeaderProps = {
  onOpenSidebar: () => void;
};

export function DashboardHeader({ onOpenSidebar }: DashboardHeaderProps) {
  return (
    <header className='sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border bg-canvas/90 px-5 backdrop-blur-md sm:px-8'>
      <div className='flex items-center gap-3'>
        <button
          type='button'
          onClick={onOpenSidebar}
          aria-label='Open navigation menu'
          className='grid size-10 place-items-center rounded-xl text-primary transition-colors hover:bg-[#efe5d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden'
        >
          <Menu className='size-5' />
        </button>

        <div>
          <p className='text-xs font-bold uppercase tracking-[0.16em] text-accent'>
            BookRaq
          </p>

          <h1 className='font-[family-name:var(--font-display)] text-xl font-semibold text-primary sm:text-2xl'>
            My reading room
          </h1>
        </div>
      </div>

      <Button
        variant='secondary'
        size='sm'
        className='hidden gap-2 sm:inline-flex'
        disabled
        title='Search will be available after Book CRUD is implemented'
      >
        <Search className='size-4' />
        Search books
      </Button>
    </header>
  );
}
