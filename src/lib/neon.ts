import { Client } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
export const neonClient = connectionString ? new Client({ connectionString }) : null;

let uploadsReady = false;
let capturesReady = false;
let extensionsReady = false;

export async function ensureUploadSchema() {
  if (!neonClient || uploadsReady) return;
  if (!extensionsReady) {
    await neonClient.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
    extensionsReady = true;
  }
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

export async function ensureCaptureSchema() {
  if (!neonClient || capturesReady) return;
  if (!extensionsReady) {
    await neonClient.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
    extensionsReady = true;
  }
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
