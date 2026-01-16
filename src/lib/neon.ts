import { Client } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
export const neonClient = connectionString ? new Client({ connectionString }) : null;

let extensionsReady = false;
let uploadsReady = false;
let settlementReady = false;
let capturesReady = false;

async function ensureExtensions() {
  if (!neonClient || extensionsReady) return;
  await neonClient.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
  extensionsReady = true;
}

export async function ensureUploadSchema() {
  if (!neonClient || uploadsReady) return;
  await ensureExtensions();
  await neonClient.query(`
    CREATE TABLE IF NOT EXISTS uploads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      target TEXT NOT NULL,
      filename TEXT NOT NULL,
      size BIGINT NOT NULL,
      blob_url TEXT NOT NULL,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  uploadsReady = true;
}

export async function ensureSettlementSchema() {
  if (!neonClient || settlementReady) return;
  await ensureUploadSchema();
  await neonClient.query(`
    CREATE TABLE IF NOT EXISTS settlement_records (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      upload_id UUID NOT NULL REFERENCES uploads(id) ON DELETE CASCADE,
      trip_date DATE,
      vehicle TEXT,
      driver TEXT,
      route TEXT,
      miles NUMERIC,
      fuel_rate NUMERIC,
      total_rate NUMERIC,
      fuel_spend NUMERIC,
      total_pay NUMERIC,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  settlementReady = true;
}

export type SettlementRecord = {
  tripDate: string;
  vehicle?: string;
  driver?: string;
  route?: string;
  miles?: number | null;
  fuelRate?: number | null;
  totalRate?: number | null;
  fuelSpend?: number | null;
  totalPay?: number | null;
};

export async function insertSettlementRecords(uploadId: string, records: SettlementRecord[]) {
  if (!neonClient || !records.length) return;
  const columns =
    "(upload_id, trip_date, vehicle, driver, route, miles, fuel_rate, total_rate, fuel_spend, total_pay)";
  const placeholders: string[] = [];
  const params: unknown[] = [];

  records.forEach((record, index) => {
    const start = index * 10;
    placeholders.push(
      `($${start + 1}, $${start + 2}, $${start + 3}, $${start + 4}, $${start + 5}, $${start + 6}, $${start + 7}, $${start + 8}, $${start + 9}, $${start +
        10})`,
    );
    params.push(
      uploadId,
      record.tripDate,
      record.vehicle ?? null,
      record.driver ?? null,
      record.route ?? null,
      record.miles ?? null,
      record.fuelRate ?? null,
      record.totalRate ?? null,
      record.fuelSpend ?? null,
      record.totalPay ?? null,
    );
  });

  await neonClient.query(`INSERT INTO settlement_records ${columns} VALUES ${placeholders.join(", ")}`, params);
}

export type DashboardMetrics = {
  tripCount: number;
  totalMiles: number;
  totalFuelSpend: number;
  totalPay: number;
  uploadCount: number;
  lastUpload: string | null;
};

const defaultMetrics: DashboardMetrics = {
  tripCount: 0,
  totalMiles: 0,
  totalFuelSpend: 0,
  totalPay: 0,
  uploadCount: 0,
  lastUpload: null,
};

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  if (!neonClient) {
    return defaultMetrics;
  }
  try {
    await ensureSettlementSchema();
    const summary = await neonClient.query(`
      SELECT
        COUNT(*) AS trip_count,
        COALESCE(SUM(miles), 0) AS total_miles,
        COALESCE(SUM(fuel_spend), 0) AS total_fuel_spend,
        COALESCE(SUM(total_pay), 0) AS total_pay
      FROM settlement_records;
    `);
    const uploads = await neonClient.query(`
      SELECT
        COUNT(*) AS upload_count,
        MAX(uploaded_at) AS last_upload
      FROM uploads;
    `);
    const row = summary.rows[0] ?? {};
    const uploadRow = uploads.rows[0] ?? {};
    return {
      tripCount: Number(row.trip_count ?? 0),
      totalMiles: Number(row.total_miles ?? 0),
      totalFuelSpend: Number(row.total_fuel_spend ?? 0),
      totalPay: Number(row.total_pay ?? 0),
      uploadCount: Number(uploadRow.upload_count ?? 0),
      lastUpload: uploadRow.last_upload ? new Date(uploadRow.last_upload).toISOString() : null,
    };
  } catch (error) {
    console.error("Unable to fetch dashboard metrics", error);
    return defaultMetrics;
  }
}

export async function ensureCaptureSchema() {
  if (!neonClient || capturesReady) return;
  await ensureExtensions();
  await neonClient.query(`
    CREATE TABLE IF NOT EXISTS chrome_captures (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      url TEXT NOT NULL,
      title TEXT,
      timestamp TEXT NOT NULL,
      received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  capturesReady = true;
}
