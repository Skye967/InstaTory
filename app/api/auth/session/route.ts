
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

interface ApiResponse {
  message: string
}

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "You must be logged in." }, { status: 401 })
  }

  const user = session?.user
  
  return NextResponse.json(user)
  
}