import { Client } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required for Neon storage.");
}

export const neonClient = new Client({ connectionString });

let uploadsReady = false;
let capturesReady = false;
let extensionsReady = false;

export async function ensureUploadSchema() {
  if (uploadsReady) return;
  if (!extensionsReady) {
    await neonClient.sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;
    extensionsReady = true;
  }
  await neonClient.sql`
    CREATE TABLE IF NOT EXISTS uploads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      target TEXT NOT NULL,
      filename TEXT NOT NULL,
      size BIGINT NOT NULL,
      blob_url TEXT NOT NULL,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  uploadsReady = true;
}

export async function ensureCaptureSchema() {
  if (capturesReady) return;
  if (!extensionsReady) {
    await neonClient.sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;
    extensionsReady = true;
  }
  await neonClient.sql`
    CREATE TABLE IF NOT EXISTS chrome_captures (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      url TEXT NOT NULL,
      title TEXT,
      timestamp TEXT NOT NULL,
      received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  capturesReady = true;
}
