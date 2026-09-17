import QRCode from "qrcode";

export async function generateQrDataUrl(text: string, size = 320) {
  const value = text.trim();
  if (!value) throw new Error("Enter text or a URL");
  return QRCode.toDataURL(value, { width: size, margin: 2, errorCorrectionLevel: "M" });
}
