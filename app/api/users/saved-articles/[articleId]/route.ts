// import { NextResponse } from "next/server";
// import { api } from "@/lib/api/api";
// import { cookies } from "next/headers";
// import { logErrorResponse } from "@/app/api/_utils/utils";
// import { isAxiosError } from "axios";

// type Props = {
//   params: { storyId: string };
// };

// export async function POST(request: Request, { params }: Props) {
//   try {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;

//     const res = await api.post(
//       `/saved-stories/${params.storyId}`,
//       {},
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
//         {
//           error: error.message,
//           response: error.response?.data,
//         },
//         { status: error.response?.status || 500 }
//       );
//     }

//     logErrorResponse({ message: (error as Error).message });

//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
