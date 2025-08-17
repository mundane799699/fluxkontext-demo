import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  const startTime = performance.now();
  console.log("Orders API: Request started");

  try {
    // Get session information from request
    const sessionStartTime = performance.now();
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const sessionEndTime = performance.now();
    console.log(
      `Orders API: Session authentication took ${(
        sessionEndTime - sessionStartTime
      ).toFixed(2)}ms`
    );

    if (!session) {
      const endTime = performance.now();
      console.log(
        `Orders API: Request completed (unauthorized) in ${(
          endTime - startTime
        ).toFixed(2)}ms`
      );
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Parse query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    // Query user orders (payments) with pagination
    const dbQueryStartTime = performance.now();
    const [orders, totalCount] = await Promise.all([
      prisma.payment.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: limit,
        skip: offset,
      }),
      prisma.payment.count({
        where: {
          userId: session.user.id,
        },
      }),
    ]);
    const dbQueryEndTime = performance.now();
    console.log(
      `Orders API: Database query took ${(
        dbQueryEndTime - dbQueryStartTime
      ).toFixed(2)}ms`
    );

    const totalPages = Math.ceil(totalCount / limit);

    const endTime = performance.now();
    console.log(
      `Orders API: Request completed successfully in ${(
        endTime - startTime
      ).toFixed(2)}ms`
    );

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    const endTime = performance.now();
    console.error("Orders API: Error occurred:", error);
    console.log(
      `Orders API: Request completed (error) in ${(endTime - startTime).toFixed(
        2
      )}ms`
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
