// src/features/admin/admin.types.ts
export type AdminUserRole = 'USER' | 'ADMIN';

export type AdminBookStatus = 'WANT_TO_READ' | 'READING' | 'COMPLETED';

export type RecentAdminUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: AdminUserRole;
  createdAt: string;
  _count: {
    books: number;
  };
};

export type RecentAdminBook = {
  id: string;
  title: string;
  coverImageUrl: string | null;
  status: AdminBookStatus;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type AdminDashboardData = {
  totalUsers: number;
  totalBooks: number;
  totalAuthors: number;
  recentUsers: RecentAdminUser[];
  recentBooks: RecentAdminBook[];
};

export type AdminDashboardResponse = {
  success: boolean;
  data: AdminDashboardData;
  message?: string;
};
export type AdminUsersPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AdminUsersResponse = {
  success: boolean;
  data: RecentAdminUser[];
  pagination: AdminUsersPagination;
  message?: string;
};

export type AdminBook = {
  id: string;
  title: string;
  coverImageUrl: string | null;
  publishedYear: number | null;
  status: AdminBookStatus;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type AdminBooksResponse = {
  success: boolean;
  data: AdminBook[];
  pagination: AdminUsersPagination;
  message?: string;
};
