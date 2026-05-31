export const DEFAULT_DATABASE_URL = "file:./dev.db";

export function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = DEFAULT_DATABASE_URL;
  }
}

export const env = {
  pdfApiKey: process.env.PDF_API_KEY,
  storageMode: process.env.PDF_STORAGE_MODE ?? "direct",
  maxPayloadBytes: Number(process.env.PDF_MAX_PAYLOAD_BYTES ?? 524_288),
  renderTimeoutMs: Number(process.env.PDF_RENDER_TIMEOUT_MS ?? 20_000),
  enableUrlRendering: process.env.PDF_ENABLE_URL_RENDERING === "true",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeDeveloperPrice: process.env.STRIPE_PRICE_DEVELOPER,
  stripeBusinessPrice: process.env.STRIPE_PRICE_BUSINESS
};
