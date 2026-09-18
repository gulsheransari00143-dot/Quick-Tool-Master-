export type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

const formats = new Set<ImageFormat>(["image/jpeg", "image/png", "image/webp"]);

function assertImageFile(file: Blob) {
  if (!file || file.size === 0) throw new Error("Please choose a non-empty image file");
  if (file.type && !file.type.startsWith("image/")) throw new Error("Selected file is not an image");
}

function assertFormat(format: ImageFormat) {
  if (!formats.has(format)) throw new Error("Unsupported image format");
}

async function loadBitmap(file: Blob): Promise<ImageBitmap> {
  assertImageFile(file);
  if (typeof createImageBitmap === "function") return createImageBitmap(file);
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => { URL.revokeObjectURL(url); resolve(image as unknown as ImageBitmap); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Unable to read image")); };
    image.src = url;
  });
}

function canvasBlob(canvas: HTMLCanvasElement, type: ImageFormat, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Image encoding failed")), type, quality);
  });
}

async function render(bitmap: ImageBitmap, width: number, height: number, type: ImageFormat, quality?: number) {
  assertFormat(type);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) throw new Error("Image dimensions must be positive numbers");
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width);
  canvas.height = Math.round(height);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported");
  context.drawImage(bitmap as CanvasImageSource, 0, 0, canvas.width, canvas.height);
  return canvasBlob(canvas, type, quality);
}

function closeBitmap(bitmap: ImageBitmap) {
  if ("close" in bitmap && typeof bitmap.close === "function") bitmap.close();
}

export async function compressImage(file: Blob, quality = 0.7) {
  const bitmap = await loadBitmap(file);
  try {
    const safeQuality = Math.min(1, Math.max(0.1, Number.isFinite(quality) ? quality : 0.7));
    return await render(bitmap, bitmap.width, bitmap.height, "image/jpeg", safeQuality);
  } finally { closeBitmap(bitmap); }
}

export async function resizeImage(file: Blob, width: number, height: number, format: ImageFormat = "image/png") {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) throw new Error("Width and height must be positive numbers");
  const bitmap = await loadBitmap(file);
  try { return await render(bitmap, width, height, format); }
  finally { closeBitmap(bitmap); }
}

export async function convertImage(file: Blob, format: ImageFormat) {
  assertFormat(format);
  const bitmap = await loadBitmap(file);
  try { return await render(bitmap, bitmap.width, bitmap.height, format, format === "image/jpeg" ? 0.92 : undefined); }
  finally { closeBitmap(bitmap); }
}
