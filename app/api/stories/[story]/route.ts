import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import { logErrorResponse } from "@/app/api/_utils/utils";
import { isAxiosError } from "axios";

type Props = {
  params: Promise<{ storyId: string }>;
};

export async function GET(req: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { storyId } = await params;

    const res = await api.get(`/stories/${storyId}`, {
      headers: {
        Cookie: cookieStore.toString(),
        // Authorization: `Bearer ${accessToken}`, // если нужен токен
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
