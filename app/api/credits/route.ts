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
      return NextResponse.json({ error: "未授权访问" }, { status: 401 });
    }

    // 查询用户的credit信息
    const userCredit = await prisma.userCredit.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!userCredit) {
      return NextResponse.json(
        { error: "未找到用户credit信息" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      credits: userCredit.credits,
    });
  } catch (error) {
    console.error("获取用户credit出错:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
