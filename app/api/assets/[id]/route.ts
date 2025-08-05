import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { deleteFromR2ByUrl } from "@/lib/r2-client";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: assetId } = await params;

    // First, find the asset and verify ownership
    const asset = await prisma.assets.findUnique({
      where: { id: assetId },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Verify that the asset belongs to the authenticated user
    if (asset.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: You don't own this asset" },
        { status: 403 }
      );
    }

    // Delete the file from R2 storage first
    try {
      await deleteFromR2ByUrl(asset.url);
    } catch (r2Error) {
      console.error("Failed to delete file from R2:", r2Error);
      // We continue with database deletion even if R2 deletion fails
      // This prevents orphaned database records
    }

    // Delete the asset from the database
    await prisma.assets.delete({
      where: { id: assetId },
    });

    return NextResponse.json({ message: "Asset deleted successfully" });
  } catch (error) {
    console.error("Error deleting asset:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
