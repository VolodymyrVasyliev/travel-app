// import { NextResponse } from "next/server";
// import { api } from "../../../api";
// import { cookies } from "next/headers";
// import { logErrorResponse } from "../../../_utils/utils";
// import { isAxiosError } from "axios";

// export async function POST(
//   request: Request,
//   { params }: { params: { articleId: string } }
// ) {
//   try {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;

//     const res = await api.post(
//       `/saved-articles/${params.articleId}`,
//  {},
//       {
//         headers: {
//           Cookie: cookieStore.toString(),
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     return NextResponse.json(res.data, { status: res.status });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       logErrorResponse(error.response?.data);
//       return NextResponse.json(
//         { error: error.message, response: error.response?.data },
//         { status: error.status }
//       );
//     }

//     logErrorResponse({ message: (error as Error).message });
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
