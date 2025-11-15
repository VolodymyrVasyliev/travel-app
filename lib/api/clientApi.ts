import { api } from './api';
import type { User } from '@/types/user';

interface AuthPayload {
  email: string;
  password: string;
}

// ================ Session and Login ========

export async function getAuthSession() {
  const res = await api.get("/auth/refresh-session");
  return res.data;
}

export async function getCurrentUser(): Promise<User> {
  const res = await api.get<User>('/users/me');
  return res.data;
}

export async function patchUserProfile(data: Partial<User>): Promise<User> {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
}

export async function registerUser(data: User): Promise<User> {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
}

export async function loginUser(data: AuthPayload): Promise<User> {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout');
}
