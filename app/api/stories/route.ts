import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";
import { logErrorResponse } from "../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const apiRes = await api.post("/stories", form, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: any) {
    logErrorResponse({
      message: error?.response?.data || error.message || "Unknown error",
    });

    return NextResponse.json(
      { error: error?.response?.data || error.message },
      { status: 567 }
    );
  }
}
