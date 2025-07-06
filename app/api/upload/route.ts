import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { isR2Configured, uploadToR2 } from "@/lib/r2-client";

export async function POST(req: NextRequest) {
  if (!isR2Configured()) {
    return NextResponse.json(
      { error: "R2 storage is not configured." },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    const publicUrl = await uploadToR2(fileBuffer, fileName, file.type, "temp");

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Error uploading to R2:", error);
    const e = error as Error;
    return NextResponse.json(
      { error: `Failed to upload file: ${e.message}` },
      { status: 500 }
    );
  }
}
