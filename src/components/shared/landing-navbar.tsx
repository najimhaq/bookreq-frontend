'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

import { authClient } from '@/lib/auth-client';

import { Logo } from './logo';

const navigationItems = [
  { label: 'About', href: '#About' },
  { label: 'Books', href: '/dashboard/books' },
] as const;

export function LandingNavbar() {
  const { data: session, isPending } = authClient.useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const userName = session?.user.name ?? 'Bookreq user';
  const userEmail = session?.user.email ?? '';
  const userInitial = userName.charAt(0).toUpperCase();

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }

      const clickedInsideMobileMenu = mobileMenuRef.current?.contains(target);

      const clickedMobileMenuButton =
        mobileMenuButtonRef.current?.contains(target);

      if (!clickedInsideMobileMenu && !clickedMobileMenuButton) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();

    window.location.replace('/');
  };

  return (
    <header className='sticky top-0 z-50 border-b border-border/70 bg-canvas/85 backdrop-blur-xl'>
      <div className='mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8'>
        <Logo />

        <nav className='hidden items-center gap-7 md:flex'>
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2 sm:gap-3'>
          {isPending ? (
            <div
              aria-label='Loading account'
              className='h-10 w-28 animate-pulse rounded-xl border border-border bg-surface'
            />
          ) : session ? (
            <>
              <Link
                href='/dashboard'
                className='hidden items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_0_25px_rgba(109,93,251,0.32)] sm:inline-flex'
              >
                <LayoutDashboard className='size-4' />
                Dashboard
              </Link>

              <div ref={userMenuRef} className='relative'>
                <button
                  type='button'
                  onClick={() =>
                    setIsUserMenuOpen((currentValue) => !currentValue)
                  }
                  aria-label='Open account menu'
                  aria-expanded={isUserMenuOpen}
                  className='flex items-center gap-2 rounded-xl border border-border bg-surface py-1.5 pl-1.5 pr-2 transition-colors hover:bg-surface-elevated'
                >
                  <span className='relative grid size-7 shrink-0 place-items-center overflow-hidden rounded-lg bg-[rgba(109,93,251,0.2)] text-xs font-bold text-[#C9C4FF]'>
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={`${userName}'s profile photo`}
                        fill
                        sizes='28px'
                        className='object-cover'
                      />
                    ) : (
                      userInitial
                    )}
                  </span>

                  <span className='hidden max-w-28 sm:block'>
                    <span className='block truncate text-left text-xs font-bold text-text-primary'>
                      {userName}
                    </span>

                    <span className='block text-left text-[10px] text-text-muted'>
                      Signed in
                    </span>
                  </span>

                  <ChevronDown className='hidden size-3.5 text-text-muted sm:block' />
                </button>

                {isUserMenuOpen ? (
                  <div className='absolute right-0 top-[calc(100%+0.6rem)] w-64 rounded-xl border border-border bg-surface p-2 shadow-[0_18px_50px_rgba(0,0,0,0.32)]'>
                    <div className='border-b border-border px-2.5 py-2.5'>
                      <p className='truncate text-sm font-bold text-text-primary'>
                        {userName}
                      </p>

                      <p className='mt-0.5 truncate text-xs text-text-muted'>
                        {userEmail}
                      </p>
                    </div>

                    <Link
                      href='/dashboard'
                      onClick={closeMenus}
                      className='mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary'
                    >
                      <LayoutDashboard className='size-4' />
                      Go to dashboard
                    </Link>

                    <button
                      type='button'
                      onClick={handleSignOut}
                      className='mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-semibold text-danger transition-colors hover:bg-[rgba(251,113,133,0.1)]'
                    >
                      <LogOut className='size-4' />
                      Sign out
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Link
                href='/sign-in'
                className='hidden rounded-lg px-3 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary sm:inline-flex'
              >
                Sign in
              </Link>

              <Link
                href='/sign-up'
                className='inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_0_25px_rgba(109,93,251,0.35)]'
              >
                Get started
                <ArrowRight className='size-4' />
              </Link>
            </>
          )}

          <button
            ref={mobileMenuButtonRef}
            type='button'
            onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className='grid size-10 place-items-center rounded-xl border border-border bg-surface text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary md:hidden'
          >
            {isMobileMenuOpen ? (
              <X className='size-5' />
            ) : (
              <Menu className='size-5' />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div
          ref={mobileMenuRef}
          className='border-t border-border bg-canvas px-5 py-5 md:hidden'
        >
          <nav className='flex flex-col gap-1'>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className='rounded-xl px-3 py-3 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface hover:text-text-primary'
              >
                {item.label}
              </Link>
            ))}

            {session ? (
              <Link
                href='/dashboard'
                onClick={closeMenus}
                className='mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white'
              >
                <LayoutDashboard className='size-4' />
                Go to dashboard
              </Link>
            ) : (
              <div className='mt-3 grid grid-cols-2 gap-3'>
                <Link
                  href='/sign-in'
                  onClick={closeMenus}
                  className='inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-text-primary'
                >
                  Sign in
                </Link>

                <Link
                  href='/sign-up'
                  onClick={closeMenus}
                  className='inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white'
                >
                  Get started
                </Link>
              </div>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
