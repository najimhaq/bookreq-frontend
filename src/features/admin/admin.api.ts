// src/features/admin/admin.api.ts
import type {
  AdminDashboardData,
  AdminDashboardResponse,
  AdminUsersResponse,
} from './admin.types';

type GetAdminUsersOptions = {
  page: number;
  limit: number;
  search: string;
};

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`,
    {
      credentials: 'include',
    }
  );

  const result = (await response.json()) as AdminDashboardResponse;

  if (!response.ok) {
    throw new Error(result.message ?? 'Unable to load admin dashboard.');
  }

  return result.data;
}

export async function getAdminUsers({
  page,
  limit,
  search,
}: GetAdminUsersOptions): Promise<AdminUsersResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    searchParams.set('search', search.trim());
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?${searchParams.toString()}`,
    {
      credentials: 'include',
    }
  );

  const result = (await response.json()) as AdminUsersResponse;

  if (!response.ok) {
    throw new Error(result.message ?? 'Unable to load users.');
  }

  return result;
}
