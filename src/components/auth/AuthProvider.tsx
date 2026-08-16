// src/components/auth/AuthProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authClient, useSession } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: any;
  session: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (name: string, email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicPaths = ['/login', '/register', '/forgot-password', '/'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  // Auto-redirect logic
  useEffect(() => {
    if (!isPending && !session) {
      // Redirect to login for protected routes
      if (!publicPaths.includes(pathname as string)) {
        router.push('/login');
      }
    }

    if (session && (pathname === '/login' || pathname === '/register')) {
      router.push('/dashboard');
    }
  }, [session, isPending, pathname, router]);

  const value: AuthContextType = {
    user: session?.user || null,
    session: session || null,
    isLoading,
    isAuthenticated: !!session,
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
