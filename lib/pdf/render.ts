import { chromium } from "playwright";
import { env } from "@/lib/env";
import { assertPublicHttpUrl } from "@/lib/pdf/security";
import type { PdfRequest } from "@/lib/pdf/validation";

export type RenderResult = {
  pdf: Buffer;
  durationMs: number;
  payloadType: "html" | "url";
};

function withCss(html: string, css?: string) {
  if (!css?.trim()) return html;
  const styleTag = `<style>${css}</style>`;
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `${styleTag}</head>`);
  }
  return `<!doctype html><html><head>${styleTag}</head><body>${html}</body></html>`;
}

function timeout<T>(promise: Promise<T>, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`PDF rendering timed out after ${ms}ms.`)), ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

export async function renderPdf(input: PdfRequest): Promise<RenderResult> {
  const started = Date.now();
  const browser = await chromium.launch({
    args: ["--disable-dev-shm-usage", "--no-sandbox"]
  });

  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(env.renderTimeoutMs);
    page.setDefaultNavigationTimeout(env.renderTimeoutMs);

    if (input.html) {
      await timeout(page.setContent(withCss(input.html, input.css), { waitUntil: "networkidle" }), env.renderTimeoutMs);
    } else if (input.url) {
      if (!env.enableUrlRendering) {
        throw new Error("URL rendering is disabled by default. Set PDF_ENABLE_URL_RENDERING=true after reviewing SSRF protections.");
      }

      const safeUrl = await assertPublicHttpUrl(input.url);
      await timeout(page.goto(safeUrl.toString(), { waitUntil: "networkidle" }), env.renderTimeoutMs);
      if (input.css) {
        await page.addStyleTag({ content: input.css });
      }
    }

    const pdfOptions = {
      format: input.format,
      landscape: input.landscape,
      margin: input.margin,
      printBackground: input.printBackground
    };

    const pdf = await timeout(page.pdf(pdfOptions), env.renderTimeoutMs);

    return {
      pdf: Buffer.from(pdf),
      durationMs: Date.now() - started,
      payloadType: input.html ? "html" : "url"
    };
  } finally {
    await browser.close();
  }
}
