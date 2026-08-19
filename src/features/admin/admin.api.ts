// src/features/admin/admin.api.ts
import type { AdminDashboardData, AdminDashboardResponse } from './admin.types';

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
