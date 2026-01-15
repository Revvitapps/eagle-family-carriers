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

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const blobPath = `uploads/${sanitizePath(target)}/${Date.now()}-${sanitizePath(file.name)}`;
  const { url } = await put(blobPath, buffer, {
    access: "private",
    contentType: file.type || "application/octet-stream",
  });

  await ensureUploadSchema();
  await neonClient.sql`
    INSERT INTO uploads (target, filename, size, blob_url)
    VALUES (${target}, ${file.name}, ${file.size}, ${url});
  `;

  uploadStore.push({
    target,
    fileName: file.name,
    size: file.size,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({
    message: "Upload recorded",
    total: uploadStore.length,
    blobUrl: url,
  });
}
