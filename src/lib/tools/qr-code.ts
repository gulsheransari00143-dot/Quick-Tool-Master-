import QRCode from "qrcode";

const MIN_SIZE = 128;
const MAX_SIZE = 2048;

export function normalizeQrSize(size: number) {
  if (!Number.isFinite(size) || size <= 0) throw new Error("QR size must be a positive number");
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(size)));
}

export async function generateQrDataUrl(text: string, size = 320) {
  const value = text.trim();
  if (!value) throw new Error("Enter text or a URL");
  const normalizedSize = normalizeQrSize(size);
  return QRCode.toDataURL(value, {
    width: normalizedSize,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}
