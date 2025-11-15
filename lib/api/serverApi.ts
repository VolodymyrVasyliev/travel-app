import { api } from "./api";
import { Story } from "@/types/story";

export async function getCurrentStory(storyId: string) {
  const res = await api.get<Story>(`/stories/${storyId}`);
  return res.data;
}
