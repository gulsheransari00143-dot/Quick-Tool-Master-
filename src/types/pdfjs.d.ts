declare module "pdfjs-dist/build/pdf.mjs" {
  type LoadingTask<T> = { promise: Promise<T> };
  type PDFPage = {
    getViewport: (options: { scale: number }) => { width: number; height: number };
    render: (options: { canvasContext: CanvasRenderingContext2D; viewport: { width: number; height: number } }) => { promise: Promise<void> };
  };
  type PDFDocument = { numPages: number; getPage: (page: number) => Promise<PDFPage> };
  export function getDocument(options: { data: Uint8Array; disableWorker?: boolean }): LoadingTask<PDFDocument>;
}
