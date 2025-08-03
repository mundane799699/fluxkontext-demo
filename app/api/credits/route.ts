import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    // 从请求中获取session信息
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Query user credit information
    const userCredit = await prisma.userCredit.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!userCredit) {
      return NextResponse.json(
        { error: "User credit information not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      credits: userCredit.credits,
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
