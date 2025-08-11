import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  const startTime = performance.now();
  console.log("Credits API: Request started");

  try {
    // 从请求中获取session信息
    const sessionStartTime = performance.now();
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const sessionEndTime = performance.now();
    console.log(
      `Credits API: Session authentication took ${(
        sessionEndTime - sessionStartTime
      ).toFixed(2)}ms`
    );

    if (!session) {
      const endTime = performance.now();
      console.log(
        `Credits API: Request completed (unauthorized) in ${(
          endTime - startTime
        ).toFixed(2)}ms`
      );
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Query user credit information
    const dbQueryStartTime = performance.now();
    const userCredit = await prisma.userCredit.findUnique({
      where: {
        userId: session.user.id,
      },
    });
    const dbQueryEndTime = performance.now();
    console.log(
      `Credits API: Database query took ${(
        dbQueryEndTime - dbQueryStartTime
      ).toFixed(2)}ms`
    );

    if (!userCredit) {
      const endTime = performance.now();
      console.log(
        `Credits API: Request completed (user not found) in ${(
          endTime - startTime
        ).toFixed(2)}ms`
      );
      return NextResponse.json(
        { error: "User credit information not found" },
        { status: 404 }
      );
    }

    const endTime = performance.now();
    console.log(
      `Credits API: Request completed successfully in ${(
        endTime - startTime
      ).toFixed(2)}ms`
    );
    return NextResponse.json({
      credits: userCredit.credits,
    });
  } catch (error) {
    const endTime = performance.now();
    console.log(
      `Credits API: Request failed with error in ${(
        endTime - startTime
      ).toFixed(2)}ms`
    );
    console.error("Error fetching user credits:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
