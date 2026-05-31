import { prisma } from "@/lib/db";

export type UsageInput = {
  label: string;
  keyHash: string | null;
  status: "success" | "error";
  durationMs: number;
  payloadType: "html" | "url" | "unknown";
  approximateBytes: number;
  errorMessage?: string;
};

let schemaReady: Promise<void> | null = null;

async function ensureUsageSchema() {
  schemaReady ??= (async () => {
    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "ApiConsumer" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "label" TEXT NOT NULL,
      "keyHash" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);

    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "ApiConsumer_label_key" ON "ApiConsumer"("label")`);

    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "PdfGeneration" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "consumerId" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "status" TEXT NOT NULL,
      "durationMs" INTEGER NOT NULL,
      "payloadType" TEXT NOT NULL,
      "approximateBytes" INTEGER NOT NULL,
      "errorMessage" TEXT,
      CONSTRAINT "PdfGeneration_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "ApiConsumer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
    )`);

    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "PdfGeneration_createdAt_idx" ON "PdfGeneration"("createdAt")`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "PdfGeneration_consumerId_idx" ON "PdfGeneration"("consumerId")`);
  })();

  await schemaReady;
}

export async function trackGeneration(input: UsageInput) {
  try {
    await ensureUsageSchema();

    const consumer = await prisma.apiConsumer.upsert({
      where: { label: input.label },
      create: { label: input.label, keyHash: input.keyHash },
      update: { keyHash: input.keyHash ?? undefined }
    });

    await prisma.pdfGeneration.create({
      data: {
        consumerId: consumer.id,
        status: input.status,
        durationMs: input.durationMs,
        payloadType: input.payloadType,
        approximateBytes: input.approximateBytes,
        errorMessage: input.errorMessage?.slice(0, 1000)
      }
    });
  } catch (error) {
    console.error("Failed to track PDF generation", error);
  }
}

export async function recentGenerations(limit = 12) {
  try {
    await ensureUsageSchema();

    return await prisma.pdfGeneration.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { consumer: true }
    });
  } catch (error) {
    console.error("Failed to load recent PDF generations", error);
    return [];
  }
}
