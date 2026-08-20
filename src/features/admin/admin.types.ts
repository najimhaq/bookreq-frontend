// src/features/admin/admin.types.ts
export type AdminUserRole = 'USER' | 'ADMIN';

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

export interface AdminAuthor {
  id: string;
  name: string;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    books: number;
  };
}

export interface AdminAuthorsResponse {
  success: boolean;
  data: AdminAuthor[];
  pagination: AdminUsersPagination;
}

export interface CreateAdminAuthorPayload {
  name: string;
  bio?: string;
}

export interface CreateAdminAuthorResponse {
  success: boolean;
  message: string;
  data: AdminAuthor;
}

//dashboard types
export type AdminBookStatus = 'WANT_TO_READ' | 'READING' | 'COMPLETED';

export interface AdminDashboardUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  _count: {
    books: number;
  };
}

export interface AdminDashboardBook {
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
}

export interface AdminDashboardData {
  totalUsers: number;
  totalBooks: number;
  totalAuthors: number;
  recentUsers: AdminDashboardUser[];
  recentBooks: AdminDashboardBook[];
}

export interface AdminDashboardResponse {
  success: boolean;
  data: AdminDashboardData;
  message?: string;
}
