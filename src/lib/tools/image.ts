export type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

async function loadBitmap(file: Blob): Promise<ImageBitmap> {
  if (typeof createImageBitmap === "function") return createImageBitmap(file);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image as unknown as ImageBitmap);
    image.onerror = () => reject(new Error("Unable to read image"));
    image.src = URL.createObjectURL(file);
  });
}

function canvasBlob(canvas: HTMLCanvasElement, type: ImageFormat, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Image encoding failed")), type, quality);
  });
}

async function render(bitmap: ImageBitmap, width: number, height: number, type: ImageFormat, quality?: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported");
  context.drawImage(bitmap as CanvasImageSource, 0, 0, width, height);
  return canvasBlob(canvas, type, quality);
}

export async function compressImage(file: Blob, quality = 0.7) {
  const bitmap = await loadBitmap(file);
  const result = await render(bitmap, bitmap.width, bitmap.height, "image/jpeg", Math.min(1, Math.max(0.1, quality)));
  if ("close" in bitmap && typeof bitmap.close === "function") bitmap.close();
  return result;
}

export async function resizeImage(file: Blob, width: number, height: number, format: ImageFormat = "image/png") {
  if (width < 1 || height < 1) throw new Error("Width and height must be positive");
  const bitmap = await loadBitmap(file);
  const result = await render(bitmap, Math.round(width), Math.round(height), format);
  if ("close" in bitmap && typeof bitmap.close === "function") bitmap.close();
  return result;
}

export async function convertImage(file: Blob, format: ImageFormat) {
  const bitmap = await loadBitmap(file);
  const result = await render(bitmap, bitmap.width, bitmap.height, format, format === "image/jpeg" ? 0.92 : undefined);
  if ("close" in bitmap && typeof bitmap.close === "function") bitmap.close();
  return result;
}
