import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(globalThis, "createImageBitmap", { configurable: true, value: async () => ({ width: 1200, height: 800, close: () => undefined }) });
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { configurable: true, value: () => ({ drawImage: () => undefined }) });
Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", { configurable: true, value: (cb: BlobCallback, type = "image/png") => cb(new Blob(["encoded"], { type })) });
