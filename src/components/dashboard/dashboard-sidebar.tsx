'use client';

import {
  BookCopy,
  BookOpen,
  CircleUserRound,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Logo } from '@/components/shared/logo';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

type DashboardSidebarProps = {
  onNavigate?: () => void;
};

const navigationItems = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Books',
    href: '/dashboard/books',
    icon: LibraryBig,
  },
  {
    label: 'Add Book',
    href: '/dashboard/books/new',
    icon: Plus,
  },
  {
    label: 'Authors',
    href: '/dashboard/authors',
    icon: BookCopy,
  },
  {
    label: 'Reading List',
    href: '/dashboard/reading-list',
    icon: BookOpen,
  },
] as const;

export function DashboardSidebar({ onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

 const isAdmin = session?.user && session?.user.role === 'ADMIN';

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message ?? 'Unable to sign out. Please try again.');
      return;
    }

    toast.success('You have signed out.');
    router.replace('/sign-in');
    router.refresh();
  };

  return (
    <aside className='flex h-full w-72 flex-col border-r border-border bg-surface'>
      <div className='flex h-20 items-center border-b border-border px-6'>
        <Logo />
      </div>

      <nav
        aria-label='Dashboard navigation'
        className='flex-1 space-y-1 overflow-y-auto px-4 py-6'
      >
        <p className='mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-text-muted'>
          My library
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                active
                  ? 'bg-[#e7f0e8] text-primary'
                  : 'text-text-secondary hover:bg-[#efe5d5] hover:text-primary'
              )}
            >
              <Icon
                className={cn(
                  'size-[18px]',
                  active ? 'text-accent' : 'text-text-muted'
                )}
              />
              {item.label}
            </Link>
          );
        })}

        <div className='my-6 border-t border-border' />

        <p className='mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-text-muted'>
          Account
        </p>

        <Link
          href='/dashboard/profile'
          onClick={onNavigate}
          className={cn(
            'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
            isActive('/dashboard/profile')
              ? 'bg-[#e7f0e8] text-primary'
              : 'text-text-secondary hover:bg-[#efe5d5] hover:text-primary'
          )}
        >
          <CircleUserRound
            className={cn(
              'size-[18px]',
              isActive('/dashboard/profile') ? 'text-accent' : 'text-text-muted'
            )}
          />
          Profile
        </Link>

        {isAdmin ? (
          <Link
            href='/admin'
            onClick={onNavigate}
            className='mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#9a6515] transition-colors hover:bg-[#fff0d3]'
          >
            <ShieldCheck className='size-[18px]' />
            Admin panel
          </Link>
        ) : null}
      </nav>

      <div className='border-t border-border p-4'>
        <div className='mb-3 rounded-xl bg-[#efe5d5] p-3'>
          {isPending ? (
            <div className='h-10 animate-pulse rounded-lg bg-[#ded3c1]' />
          ) : (
            <div className='flex items-center gap-3'>
              <div className='grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white'>
                {session?.user.name?.slice(0, 1).toUpperCase() ?? 'R'}
              </div>

              <div className='min-w-0'>
                <p className='truncate text-sm font-bold text-primary'>
                  {session?.user.name ?? 'Reader'}
                </p>

                <p className='truncate text-xs text-text-secondary'>
                  {session?.user.email ?? 'Loading account...'}
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          type='button'
          onClick={handleSignOut}
          className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-[#fff0ed] hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface'
        >
          <LogOut className='size-[18px]' />
          Sign out
        </button>
      </div>
    </aside>
  );
}
