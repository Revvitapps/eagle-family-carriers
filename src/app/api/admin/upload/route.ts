import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  const formData = await req.formData();
  const target = formData.get("target");
  const file = formData.get("file") as File | null;

  if (!target || typeof target !== "string" || !file) {
    return NextResponse.json({ message: "Missing upload data" }, { status: 400 });
  }

  uploadStore.push({
    target,
    fileName: file.name,
    size: file.size,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ message: "Upload recorded", total: uploadStore.length });
}
