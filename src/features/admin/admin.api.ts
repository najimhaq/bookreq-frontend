// src/features/admin/admin.api.ts
import { apiClient } from '@/lib/api-client';
import type {
  AdminBooksResponse,
  AdminDashboardData,
  AdminDashboardResponse,
  AdminUsersResponse,
  AdminAuthorsResponse,
  CreateAdminAuthorPayload,
  CreateAdminAuthorResponse,
} from './admin.types';

type GetAdminUsersOptions = {
  page: number;
  limit: number;
  search: string;
  role?: string;
};

//todo: admin dashboard
export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const response =
    await apiClient.get<AdminDashboardResponse>('/api/admin/dashboard');

  return response.data.data;
}


//todo: admin users
export async function getAdminUsers({
  page,
  limit,
  search,
  role = '',
}: GetAdminUsersOptions): Promise<AdminUsersResponse> {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    query.set('search', search.trim());
  }

  if (role) {
    query.set('role', role);
  }

  const response = await apiClient.get<AdminUsersResponse>(
    `/admin/users?${query.toString()}`
  );

  return response.data;
}
type GetAdminBooksOptions = {
  page: number;
  limit: number;
  search: string;
  status: string;
};

//todo: admin books
export async function getAdminBooks({
  page,
  limit,
  search,
  status,
}: GetAdminBooksOptions): Promise<AdminBooksResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    searchParams.set('search', search.trim());
  }

  if (status) {
    searchParams.set('status', status);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/books?${searchParams.toString()}`,
    {
      credentials: 'include',
    }
  );

  const result = (await response.json()) as AdminBooksResponse;

  if (!response.ok) {
    throw new Error(result.message ?? 'Unable to load books.');
  }

  return result;
}

interface GetAdminAuthorsParams {
  page?: number;
  limit?: number;
  search?: string;
}

//todo: admin authors
export async function getAdminAuthors({
  page = 1,
  limit = 10,
  search = '',
}: GetAdminAuthorsParams = {}): Promise<AdminAuthorsResponse> {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search.trim()) {
    query.set('search', search.trim());
  }

  const response = await apiClient.get<AdminAuthorsResponse>(
    `/api/admin/authors?${query.toString()}`
  );

  return response.data;
}

//todo: create admin author
export async function createAdminAuthor(
  payload: CreateAdminAuthorPayload
): Promise<CreateAdminAuthorResponse> {
  const response = await apiClient.post<CreateAdminAuthorResponse>(
    '/api/admin/authors',
    payload
  );

  return response.data;
}
