export async function pdfToJpg(file: Blob, scale = 1.5): Promise<Blob[]> {
  if (typeof window === "undefined") throw new Error("PDF conversion must run in a browser");
  const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data, disableWorker: true }).promise;
  const pages: Blob[] = [];
  for (let index = 1; index <= pdf.numPages; index += 1) {
    const page = await pdf.getPage(index);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not supported");
    await page.render({ canvasContext: context, viewport }).promise;
    pages.push(await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("JPG encoding failed")), "image/jpeg", 0.92);
    }));
  }
  return pages;
}
