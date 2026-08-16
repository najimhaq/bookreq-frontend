//React 19-এ function component-এ ref prop হিসেবে pass করা যায়; পুরোনো forwardRef pattern নতুন component-এর জন্য আর বাধ্যতামূলক নয়। তাই React Hook Form-এর register() থেকে আসা ref input পর্যন্ত পৌঁছে যাবে।

// src/app/(auth)/layout.tsx
import type { ReactNode } from 'react';

import { AuthShell } from '@/components/auth/auth-shell';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthShell>{children}</AuthShell>;
}
