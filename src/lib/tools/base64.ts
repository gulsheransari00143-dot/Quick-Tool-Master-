function utf8Bytes(text: string) {
  return new TextEncoder().encode(text);
}

export function encodeBase64(input: string) {
  const bytes = utf8Bytes(input);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

export function decodeBase64(input: string) {
  const normalized = input.trim();
  if (!normalized) throw new Error("Base64 input cannot be empty");
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized) || normalized.length % 4 !== 0) {
    throw new Error("Invalid Base64 input");
  }
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}
