import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("/auth/login", body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };

        if (parsed.accessToken)
          cookieStore.set("accessToken", parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        if (parsed.sessionId)
          cookieStore.set("sessionId", parsed.sessionId, options);
      }

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }
    console.log("NO COOKIE");

    return NextResponse.json({ message: "No cookie" }, { status: 567 });
  } catch (error) {
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ full: error }, { status: 567 });
  }
}
