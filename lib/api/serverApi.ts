import { localAPI } from "../localAPI";
import { Story } from "@/types/story";
import { cookies } from "next/headers";
import type { User } from "@/types/user";

export async function getAuthSessionServer() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await localAPI.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}

export async function getUserServer(): Promise<User> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await localAPI.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
}

export async function patchUserProfileServer(
  data: Partial<User>
): Promise<User> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await localAPI.patch<User>("/users/me", data, {
    headers: { Cookie: cookieHeader },
  });

  return res.data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await localAPI.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res;
}

export const getServerCurrentStory = async (
  storyId: string
): Promise<Story> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await localAPI.get<Story>(`/stories/${storyId}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};
