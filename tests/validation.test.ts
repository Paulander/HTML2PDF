import { describe, expect, it } from "vitest";
import { isPrivateAddress } from "@/lib/pdf/security";
import { validatePdfRequest } from "@/lib/pdf/validation";

describe("pdf request validation", () => {
  it("requires html or url", () => {
    const result = validatePdfRequest({});
    expect(result.success).toBe(false);
  });

  it("accepts minimal html requests with defaults", () => {
    const result = validatePdfRequest({ html: "<h1>Hello</h1>" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.format).toBe("A4");
      expect(result.data.printBackground).toBe(true);
    }
  });

  it("rejects requests that mix html and url", () => {
    const result = validatePdfRequest({ html: "<h1>Hello</h1>", url: "https://example.com" });
    expect(result.success).toBe(false);
  });
});

describe("SSRF helpers", () => {
  it("flags private addresses", () => {
    expect(isPrivateAddress("127.0.0.1")).toBe(true);
    expect(isPrivateAddress("10.0.0.4")).toBe(true);
    expect(isPrivateAddress("192.168.1.10")).toBe(true);
  });

  it("allows public addresses", () => {
    expect(isPrivateAddress("8.8.8.8")).toBe(false);
    expect(isPrivateAddress("1.1.1.1")).toBe(false);
  });
});
