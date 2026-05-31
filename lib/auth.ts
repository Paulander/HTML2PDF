import crypto from "node:crypto";
import { env } from "@/lib/env";

export type AuthResult =
  | { ok: true; label: string; keyHash: string | null; demoMode: boolean }
  | { ok: false; status: number; message: string };

export function hashApiKey(apiKey: string) {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
}

export function readApiKey(headers: Headers) {
  const explicit = headers.get("x-api-key");
  if (explicit) return explicit.trim();

  const authorization = headers.get("authorization");
  if (authorization?.toLowerCase().startsWith("bearer ")) {
    return authorization.slice("bearer ".length).trim();
  }

  return null;
}

export function authenticateRequest(headers: Headers): AuthResult {
  const configuredKey = env.pdfApiKey;

  if (!configuredKey) {
    console.warn("PDF_API_KEY is not set. PDFForge Lite is accepting demo requests without authentication.");
    return {
      ok: true,
      label: "anonymous-demo",
      keyHash: null,
      demoMode: true
    };
  }

  const providedKey = readApiKey(headers);
  if (!providedKey) {
    return { ok: false, status: 401, message: "Missing API key. Send x-api-key or Authorization: Bearer <key>." };
  }

  const expected = Buffer.from(configuredKey);
  const actual = Buffer.from(providedKey);
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
    return { ok: false, status: 401, message: "Invalid API key." };
  }

  return {
    ok: true,
    label: "development-key",
    keyHash: hashApiKey(providedKey),
    demoMode: false
  };
}
