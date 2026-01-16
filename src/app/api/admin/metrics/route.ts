import { NextResponse } from "next/server";
import { fetchDashboardMetrics } from "@/lib/neon";

export async function GET() {
  const metrics = await fetchDashboardMetrics();
  return NextResponse.json(metrics);
}
