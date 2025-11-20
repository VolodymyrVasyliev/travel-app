import { NextResponse } from "next/server";
import { api } from "../api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "4");

    const res = await api("/notes", {
      params: {
        page,
        perPage,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    console.error("API /users error:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error", data: null },
      { status: 500 }
    );
  }
}
