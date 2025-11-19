import { Story } from "@/types/story";
import { backendAPI } from "../backendAPI";

export async function savedArticles(articleId: string) {
  const res = await backendAPI.post<Story>(`/saved-articles/${articleId}`);
  return res.data;
}
