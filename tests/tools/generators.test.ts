import { describe, expect, it } from "vitest";
import { normalizeQrSize, generateQrDataUrl } from "@/lib/tools/qr-code";
import { normalizePdfScale } from "@/lib/tools/pdf-to-jpg";

describe("QR generator", () => {
  it("returns a data URL for text", async () => {
    const result = await generateQrDataUrl("QuickToolMaster");
    expect(result.startsWith("data:image/png;base64,")).toBe(true);
  });

  it("rejects empty input and invalid sizes", async () => {
    await expect(generateQrDataUrl("   ")).rejects.toThrow("Enter text or a URL");
    expect(() => normalizeQrSize(Number.NaN)).toThrow("positive number");
    expect(normalizeQrSize(64)).toBe(128);
    expect(normalizeQrSize(9999)).toBe(2048);
  });
});

describe("PDF to JPG validation", () => {
  it("normalizes valid scale and rejects invalid scale", () => {
    expect(normalizePdfScale(1.5)).toBe(1.5);
    expect(normalizePdfScale(0.01)).toBe(0.25);
    expect(normalizePdfScale(9)).toBe(3);
    expect(() => normalizePdfScale(Number.NaN)).toThrow("positive number");
    expect(() => normalizePdfScale(0)).toThrow("positive number");
  });
});
