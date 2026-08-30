'use client';

import { createContext, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

interface AuthContextType {
  user: Record<string, unknown> | null;
  session: Record<string, unknown> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<Record<string, unknown>>;
  signUp: (name: string, email: string, password: string) => Promise<Record<string, unknown>>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicPaths = ['/', '/login', '/register', '/forgot-password'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const isLoading = isPending;

  useEffect(() => {
    if (!isPending && !session && !publicPaths.includes(pathname)) {
      router.push('/login');
    }

    if (session && (pathname === '/login' || pathname === '/register')) {
      router.push('/dashboard');
    }
  }, [session, isPending, pathname, router]);

  const value: AuthContextType = {
    user: session?.user ?? null,
    session: session ?? null,
    isLoading,
    isAuthenticated: Boolean(session),

    signIn: async (email: string, password: string) => {
      return authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });
    },

    signUp: async (name: string, email: string, password: string) => {
      return authClient.signUp.email({
        name,
        email,
        password,
        role: 'USER',
        callbackURL: '/login',
      });
    },

    signOut: async () => {
      await authClient.signOut();

      router.push('/');
      router.refresh();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
