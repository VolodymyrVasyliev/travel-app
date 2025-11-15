import { api } from "./api";
import { Story } from "@/types/story";

export async function savedArticles(articleId: string) {
  const res = await api.post<Story>(`saved-articles/${articleId}`);
  return res.data;
}
