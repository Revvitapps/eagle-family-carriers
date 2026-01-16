import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import Papa from "papaparse";
import {
  ensureSettlementSchema,
  ensureUploadSchema,
  insertSettlementRecords,
  neonClient,
  SettlementRecord,
} from "@/lib/neon";

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

const monthLookup: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

const normalizeRow = (row: Record<string, string>) => {
  const normalized: Record<string, string> = {};
  Object.entries(row).forEach(([key, value]) => {
    if (!key) return;
    normalized[key.trim().toUpperCase()] = (value ?? "").trim();
  });
  return normalized;
};

const parseDecimal = (value?: string) => {
  if (!value) return null;
  const cleaned = value.replace(/[^0-9.\-]/g, "");
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
};

const parseSettlementDate = (value?: string) => {
  if (!value) return null;
  const trimmed = value.trim();
  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString();
  }
  const match = trimmed.toUpperCase().match(/^(\d{1,2})-([A-Z]{3})-(\d{4})$/);
  if (match) {
    const day = Number(match[1]);
    const month = monthLookup[match[2]];
    const year = Number(match[3]);
    if (!Number.isNaN(month)) {
      return new Date(Date.UTC(year, month, day)).toISOString();
    }
  }
  return null;
};

const parseSettlementRecords = (text: string) => {
  const { data } = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });
  const parsed: SettlementRecord[] = [];
  data.forEach((row) => {
    const normalized = normalizeRow(row);
    const tripDate = parseSettlementDate(normalized["DATE"]);
    const miles = parseDecimal(normalized["MILES QTY"]);
    if (!tripDate || miles === null) return;
    const fuelRate = parseDecimal(normalized["FUEL"]);
    const totalRate = parseDecimal(normalized["TOTAL RATE"]);
    const fuelSpend = fuelRate !== null ? fuelRate * miles : null;
    const totalPay = totalRate !== null ? totalRate * miles : null;
    const origin = normalized["LEG ORG"] || normalized["LEG ORIG"];
    const destination = normalized["LEG DEST"] || normalized["LEG DESTINATION"];
    const route = [origin, destination].filter(Boolean).join(" → ");
    parsed.push({
      tripDate,
      vehicle: normalized["VEHICLE"] || normalized["VEHICLE ID"] || undefined,
      driver: normalized["DRIVER #1"] || normalized["DRIVER 1"] || normalized["DRIVER"],
      route: route || undefined,
      miles,
      fuelRate,
      totalRate,
      fuelSpend,
      totalPay,
    });
  });
  return parsed;
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const target = formData.get("target");
  const file = formData.get("file") as File | null;

  if (!target || typeof target !== "string" || !file) {
    return NextResponse.json({ message: "Missing upload data" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const blobPath = `uploads/${sanitizePath(target)}/${Date.now()}-${sanitizePath(file.name)}`;

  let blobUrl: string | undefined;
  try {
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

  let parsedRows: SettlementRecord[] = [];
  const shouldParseCsv =
    file.type.includes("csv") || file.name.toLowerCase().endsWith(".csv");
  if (shouldParseCsv) {
    const csvText = buffer.toString("utf-8");
    parsedRows = parseSettlementRecords(csvText);
  }

  if (neonClient) {
    try {
      await ensureUploadSchema();
      const uploadResult = await neonClient.query(
        `
          INSERT INTO uploads (target, filename, size, blob_url)
          VALUES ($1, $2, $3, $4)
          RETURNING id;
        `,
        [target, file.name, file.size, blobUrl],
      );
      const uploadId = uploadResult.rows[0]?.id;
      if (uploadId && parsedRows.length) {
        await ensureSettlementSchema();
        await neonClient.query(`DELETE FROM settlement_records WHERE upload_id = $1`, [uploadId]);
        await insertSettlementRecords(uploadId, parsedRows);
      }
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
    message: parsedRows.length
      ? `Upload recorded with ${parsedRows.length} rows`
      : "Upload recorded",
    total: uploadStore.length,
    blobUrl,
  });
}
