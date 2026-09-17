import { describe, expect, it } from "vitest";
import { compressImage, resizeImage, convertImage } from "@/lib/tools/image";

describe("image tools", () => {
  it("compresses an image with requested quality", async () => {
    const blob = await compressImage(new Blob(["x"], { type: "image/png" }), 0.7);
    expect(blob.type).toBe("image/jpeg");
  });
  it("resizes to requested dimensions", async () => {
    const blob = await resizeImage(new Blob(["x"], { type: "image/png" }), 800, 600);
    expect(blob.type).toBe("image/png");
  });
  it("converts to the requested image type", async () => {
    const blob = await convertImage(new Blob(["x"], { type: "image/png" }), "image/webp");
    expect(blob.type).toBe("image/webp");
  });
});
