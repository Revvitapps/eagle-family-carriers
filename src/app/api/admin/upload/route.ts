import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { ensureUploadSchema, neonClient } from "@/lib/neon";

type UploadEntry = {
  target: string;
  fileName: string;
  size: number;
  timestamp: string;
};

declare global {
  var __efcUploadStore: UploadEntry[] | undefined;
}

const uploadStore = globalThis.__efcUploadStore ?? [];
globalThis.__efcUploadStore = uploadStore;

const sanitizePath = (value: string) => value.replace(/[^a-zA-Z0-9/_-]/g, "_");

export async function POST(req: Request) {
  const formData = await req.formData();
  const target = formData.get("target");
  const file = formData.get("file") as File | null;

  if (!target || typeof target !== "string" || !file) {
    return NextResponse.json({ message: "Missing upload data" }, { status: 400 });
  }

  let blobUrl: string | undefined;
  try {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const blobPath = `uploads/${sanitizePath(target)}/${Date.now()}-${sanitizePath(file.name)}`;
  const result = await put(blobPath, buffer, {
    access: "public",
    contentType: file.type || "application/octet-stream",
  });
  blobUrl = result.url;
  } catch (error) {
    console.error("Blob upload failed", error);
    return NextResponse.json({ message: "Upload failed before storing blob" }, { status: 504 });
  }

  if (!blobUrl) {
    return NextResponse.json({ message: "Blob upload did not return a URL" }, { status: 500 });
  }

  if (neonClient) {
    const timeout = (label: string) =>
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`${label} timed out`)), 20000);
      });

    try {
      await Promise.race([ensureUploadSchema(), timeout("ensureUploadSchema")]);
    } catch (error) {
      console.error("Schema ready failed", error);
    }

    try {
      await Promise.race(
        [
          neonClient.query(
            `
    INSERT INTO uploads (target, filename, size, blob_url)
    VALUES ($1, $2, $3, $4);
  `,
            [target, file.name, file.size, blobUrl],
          ),
          timeout("neon insert"),
        ],
      );
    } catch (error) {
      console.error("Neon insert failed", error);
    }
  }

  uploadStore.push({
    target,
    fileName: file.name,
    size: file.size,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({
    message: "Upload recorded",
    total: uploadStore.length,
    blobUrl,
  });
}
