import { describe, expect, it } from "vitest";
import { generateQrDataUrl } from "@/lib/tools/qr-code";

describe("QR generator", () => {
  it("returns a data URL for text", async () => {
    const result = await generateQrDataUrl("QuickToolMaster");
    expect(result.startsWith("data:image/png;base64,")).toBe(true);
  });
});
