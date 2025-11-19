import { Story } from "@/types/story";
import axios from "axios";

export const api = axios.create({
  baseURL: `https://travel-app-backend-9pto.onrender.com`,
  withCredentials: true,
});

export async function savedArticles(articleId: string) {
  const res = await api.post<Story>(`/saved-articles/${articleId}`);
  return res.data;
}
