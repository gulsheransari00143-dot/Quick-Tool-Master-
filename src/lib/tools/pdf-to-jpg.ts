const MIN_SCALE = 0.25;
const MAX_SCALE = 3;
const MAX_PAGE_PIXELS = 16_000_000;

function assertPdfFile(file: Blob) {
  if (file.size <= 0) throw new Error("PDF file must be non-empty");
  if (file.type && file.type !== "application/pdf") throw new Error("Selected file is not a PDF");
}

export function normalizePdfScale(scale: number) {
  if (!Number.isFinite(scale) || scale <= 0) throw new Error("Scale must be a positive number");
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
}

export async function pdfToJpg(file: Blob, scale = 1.5): Promise<Blob[]> {
  if (typeof window === "undefined") throw new Error("PDF conversion must run in a browser");
  assertPdfFile(file);
  const normalizedScale = normalizePdfScale(scale);
  const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
  const data = new Uint8Array(await file.arrayBuffer());
  let pdf: Awaited<ReturnType<typeof pdfjs.getDocument>["promise"]>;
  try {
    pdf = await pdfjs.getDocument({ data, disableWorker: true }).promise;
  } catch {
    throw new Error("Could not read the PDF. The file may be corrupt or password-protected.");
  }

  const pages: Blob[] = [];
  for (let index = 1; index <= pdf.numPages; index += 1) {
      const page = await pdf.getPage(index);
      const viewport = page.getViewport({ scale: normalizedScale });
      const width = Math.ceil(viewport.width);
      const height = Math.ceil(viewport.height);
      if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0 || width * height > MAX_PAGE_PIXELS) {
        throw new Error("PDF page is too large to render safely");
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is not supported");
      await page.render({ canvasContext: context, viewport }).promise;
      pages.push(await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("JPG encoding failed")), "image/jpeg", 0.92);
      }));
    }
  return pages;
}
