import { describe, expect, it } from "vitest";
import { renderPdf } from "@/lib/pdf/render";

describe("renderPdf", () => {
  it("renders a basic html document", async () => {
    const result = await renderPdf({
      html: "<html><body><h1>Hello PDFForge</h1></body></html>",
      format: "A4",
      landscape: false,
      margin: { top: "24px", right: "24px", bottom: "24px", left: "24px" },
      printBackground: true
    });

    expect(result.pdf.subarray(0, 4).toString()).toBe("%PDF");
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
  }, 30_000);
});
