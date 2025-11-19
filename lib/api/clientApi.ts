import { Story } from "@/types/story";
import { AxiosResponse } from "axios";
import { api } from "./api";
import type { User } from "@/types/user";
import { Story } from "@/types/story";

interface AuthPayload {
  email: string;
  password: string;
}
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

// ================ Session and Login ========

export async function getAuthSession() {
  const res = await api.post("/auth/refresh-session");
  return res.data;
}

export async function getCurrentUser(): Promise<User> {
  const res = await api.get("/users/me");
  return res.data;
}

export async function patchUserProfile(data: Partial<User>): Promise<User> {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
}

export async function registerUser(data: RegisterPayload): Promise<User> {
  const res = await api.post("/auth/register", data);

  return res.data;
}

export async function loginUser(data: AuthPayload): Promise<User> {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await api.post("/auth/logout");
}

// export async function savedArticles(articleId: string): Promise<Story> {
//   const res = await api.post<Story>(`/saved-articles/${articleId}`);
//   return res.data;
// }

export async function getCurrentStory(storyId: string): Promise<Story> {
  const res = await api.get<Story>(`/stories/${storyId}`);
  return res.data;
}
