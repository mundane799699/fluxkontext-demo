import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.R2_REGION || "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

export function isR2Configured() {
  return (
    !!process.env.R2_ACCOUNT_ID &&
    !!process.env.R2_ACCESS_KEY_ID &&
    !!process.env.R2_SECRET_ACCESS_KEY &&
    !!R2_BUCKET_NAME &&
    !!R2_PUBLIC_URL
  );
}

export async function uploadToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
) {
  if (!isR2Configured()) {
    throw new Error("R2 storage is not configured.");
  }

  const putCommand = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: "public-read",
  });

  await s3Client.send(putCommand);

  return `${R2_PUBLIC_URL}/${fileName}`;
}

export async function uploadImageFromUrlToR2(imageUrl: string) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const fileBuffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "image/png";
  const fileExtension = contentType.split("/")[1] || "png";
  const fileName = `${uuidv4()}.${fileExtension}`;

  return await uploadToR2(fileBuffer, fileName, contentType);
}
