import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import { isAxiosError } from "axios";

export async function GET(
  req: Request,
  { params }: { params: { storyId: string } }
) {
  try {
    const { storyId } = params;

    const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;

    const res = await api.get(`/stories/${storyId}`, {
      headers: {
        Cookie: cookieStore.toString(),
        // Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(res.data.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    console.error("Unknown error:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
