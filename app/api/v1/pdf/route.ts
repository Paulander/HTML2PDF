import { NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { env } from "@/lib/env";
import { renderPdf } from "@/lib/pdf/render";
import { validatePdfRequest } from "@/lib/pdf/validation";
import { trackGeneration } from "@/lib/usage";

export const runtime = "nodejs";
export const maxDuration = 30;

function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status });
}

export async function POST(request: Request) {
  const authenticated = authenticateRequest(request.headers);
  if (!authenticated.ok) {
    return jsonError(authenticated.message, authenticated.status);
  }

  const started = Date.now();
  const raw = await request.text();
  const approximateBytes = Buffer.byteLength(raw);
  let payloadType: "html" | "url" | "unknown" = "unknown";

  if (approximateBytes > env.maxPayloadBytes) {
    return jsonError(`Payload too large. Max size is ${env.maxPayloadBytes} bytes.`, 413);
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return jsonError("Request body must be valid JSON.", 400);
  }

  const parsed = validatePdfRequest(json);
  if (!parsed.success) {
    return jsonError("Invalid PDF request.", 422, parsed.error.flatten());
  }

  payloadType = parsed.data.html ? "html" : "url";

  try {
    const result = await renderPdf(parsed.data);
    await trackGeneration({
      label: authenticated.label,
      keyHash: authenticated.keyHash,
      status: "success",
      durationMs: result.durationMs,
      payloadType: result.payloadType,
      approximateBytes
    });

    const body = result.pdf.buffer.slice(result.pdf.byteOffset, result.pdf.byteOffset + result.pdf.byteLength) as ArrayBuffer;

    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": 'attachment; filename="pdfforge-lite.pdf"',
        "x-pdfforge-duration-ms": String(result.durationMs),
        "x-pdfforge-demo-mode": String(authenticated.demoMode)
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown rendering error.";
    const durationMs = Date.now() - started;
    console.error("PDF render failed", { message, durationMs, payloadType });

    await trackGeneration({
      label: authenticated.label,
      keyHash: authenticated.keyHash,
      status: "error",
      durationMs,
      payloadType,
      approximateBytes,
      errorMessage: message
    });

    return jsonError(message, 500);
  }
}
