'use client';

import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,

  fetchOptions: {
    credentials: 'include',
  },

  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
        },
      },
    }),
  ],
});

export const {
  signIn,
  signOut,
  signUp,
  updateUser,
  changePassword,
  revokeOtherSessions,
} = authClient;
