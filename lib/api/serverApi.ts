import { cookies } from 'next/headers';
import { api } from './api';
import type { User } from '@/types/user';

export async function getAuthSessionServer() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}

export async function getUserServer(): Promise<User> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}

export async function patchUserProfileServer(data: Partial<User>): Promise<User> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.patch<User>('/users/me', data, {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res;
}
