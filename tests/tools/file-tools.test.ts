import { describe, expect, it } from "vitest";
import { compressImage, resizeImage, convertImage } from "@/lib/tools/image";

describe("image tools", () => {
  const image = () => new Blob(["x"], { type: "image/png" });

  it("compresses an image to JPEG", async () => {
    const blob = await compressImage(image(), 0.7);
    expect(blob.type).toBe("image/jpeg");
  });

  it("resizes to requested dimensions", async () => {
    const blob = await resizeImage(image(), 800, 600);
    expect(blob.type).toBe("image/png");
  });

  it("converts to the requested image type", async () => {
    const blob = await convertImage(image(), "image/webp");
    expect(blob.type).toBe("image/webp");
  });

  it("rejects empty or non-image files", async () => {
    await expect(compressImage(new Blob([], { type: "image/png" }))).rejects.toThrow("non-empty");
    await expect(compressImage(new Blob(["x"], { type: "text/plain" }))).rejects.toThrow("not an image");
  });

  it("rejects invalid resize dimensions", async () => {
    await expect(resizeImage(image(), Number.NaN, 600)).rejects.toThrow("positive numbers");
    await expect(resizeImage(image(), 0, 600)).rejects.toThrow("positive numbers");
  });

  it("rejects unsupported output formats", async () => {
    await expect(convertImage(image(), "image/avif" as never)).rejects.toThrow("Unsupported image format");
  });
});
