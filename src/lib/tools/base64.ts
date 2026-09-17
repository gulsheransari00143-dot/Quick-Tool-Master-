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
  const binary = atob(input.trim());
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
