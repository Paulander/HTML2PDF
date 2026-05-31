import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "pdfforge-lite",
    auth: env.pdfApiKey ? "required" : "demo-mode",
    storage: env.storageMode,
    urlRendering: env.enableUrlRendering ? "enabled" : "disabled-by-default"
  });
}
