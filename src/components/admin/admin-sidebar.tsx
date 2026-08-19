'use client';

import {
  ArrowLeft,
  BookUser,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Logo } from '@/components/shared/logo';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

type AdminSidebarProps = {
  onNavigate?: () => void;
};

const navigationItems = [
  {
    label: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: UsersRound,
  },
  {
    label: 'Books',
    href: '/admin/books',
    icon: LibraryBig,
  },
  {
    label: 'Authors',
    href: '/admin/authors',
    icon: BookUser,
  },
] as const;

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

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

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className='flex h-full w-72 flex-col border-r border-border bg-surface'>
      <div className='flex h-20 items-center border-b border-border px-6'>
        <Logo />
      </div>

      <nav
        aria-label='Admin navigation'
        className='flex-1 space-y-1 overflow-y-auto px-4 py-6'
      >
        <div className='mb-6 rounded-2xl border border-[#ead6aa] bg-[#fff8e8] p-4'>
          <div className='flex items-center gap-3'>
            <div className='grid size-10 place-items-center rounded-xl bg-[#9a6515] text-white'>
              <ShieldCheck className='size-5' />
            </div>

            <div>
              <p className='text-xs font-bold uppercase tracking-[0.14em] text-[#9a6515]'>
                Admin area
              </p>

              <p className='mt-1 text-sm font-bold text-primary'>
                BookRaq control
              </p>
            </div>
          </div>
        </div>

        <p className='mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-text-muted'>
          Management
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
                  ? 'bg-[#fff0d3] text-[#9a6515]'
                  : 'text-text-secondary hover:bg-[#efe5d5] hover:text-primary'
              )}
            >
              <Icon
                className={cn(
                  'size-[18px]',
                  active ? 'text-[#9a6515]' : 'text-text-muted'
                )}
              />
              {item.label}
            </Link>
          );
        })}

        <div className='my-6 border-t border-border' />

        <Link
          href='/dashboard'
          onClick={onNavigate}
          className='flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-[#e7f0e8] hover:text-primary'
        >
          <ArrowLeft className='size-[18px] text-text-muted' />
          Back to my library
        </Link>
      </nav>

      <div className='border-t border-border p-4'>
        <div className='mb-3 rounded-xl bg-[#fff8e8] p-3'>
          {isPending ? (
            <div className='h-10 animate-pulse rounded-lg bg-[#ead6aa]' />
          ) : (
            <div className='flex items-center gap-3'>
              <div className='relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-[#9a6515] text-sm font-bold text-white'>
                {session?.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={`${session.user.name ?? 'Admin'}'s profile photo`}
                    fill
                    sizes='40px'
                    className='object-cover'
                  />
                ) : (
                  (session?.user.name?.slice(0, 1).toUpperCase() ?? 'A')
                )}
              </div>

              <div className='min-w-0'>
                <p className='truncate text-sm font-bold text-primary'>
                  {session?.user.name ?? 'Administrator'}
                </p>

                <p className='mt-0.5 truncate text-xs text-[#9a6515]'>
                  Administrator
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          type='button'
          onClick={handleSignOut}
          className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-[#fff0ed] hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a6515] focus-visible:ring-offset-2 focus-visible:ring-offset-surface'
        >
          <LogOut className='size-[18px]' />
          Sign out
        </button>
      </div>
    </aside>
  );
}
