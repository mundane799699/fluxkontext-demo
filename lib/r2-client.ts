import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
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
  contentType: string,
  directory?: string
) {
  if (!isR2Configured()) {
    throw new Error("R2 storage is not configured.");
  }

  const key = directory ? `${directory}/${fileName}` : fileName;

  const putCommand = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: "public-read",
  });

  await s3Client.send(putCommand);

  return `${R2_PUBLIC_URL}/${key}`;
}

export async function uploadImageFromUrlToR2(
  imageUrl: string,
  directory?: string
) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const fileBuffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "image/png";
  const fileExtension = contentType.split("/")[1] || "png";
  const fileName = `${uuidv4()}.${fileExtension}`;

  return await uploadToR2(fileBuffer, fileName, contentType, directory);
}

/**
 * Extract the R2 key from a public URL
 * @param url - The public R2 URL
 * @returns The R2 key (file path)
 */
export function extractR2KeyFromUrl(url: string): string {
  if (!R2_PUBLIC_URL) {
    throw new Error("R2_PUBLIC_URL is not configured");
  }

  // Remove the public URL base and leading slash
  const key = url.replace(R2_PUBLIC_URL, "").replace(/^\//, "");
  return key;
}

/**
 * Delete a file from R2 storage
 * @param key - The R2 key (file path) to delete
 */
export async function deleteFromR2(key: string) {
  if (!isR2Configured()) {
    throw new Error("R2 storage is not configured.");
  }

  const deleteCommand = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(deleteCommand);
}

/**
 * Delete a file from R2 storage using its public URL
 * @param url - The public R2 URL to delete
 */
export async function deleteFromR2ByUrl(url: string) {
  const key = extractR2KeyFromUrl(url);
  console.log("Deleting file from R2:", key);
  await deleteFromR2(key);
}
