import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  fetchOptions: {
    credentials: 'include',
  },
});


// /api/auth/sign-up/email
// /api/auth/sign-in/email
// /api/auth/get-session
// /api/auth/sign-out
