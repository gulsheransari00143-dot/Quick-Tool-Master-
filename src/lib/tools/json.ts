export function formatJson(input: string, spaces = 2) {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("JSON input cannot be empty");
  if (!Number.isInteger(spaces) || spaces < 0 || spaces > 10) throw new Error("Indentation must be between 0 and 10");
  return JSON.stringify(JSON.parse(trimmed), null, spaces);
}

export function validateJson(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return { valid: false, error: "JSON input cannot be empty" };
  try {
    JSON.parse(trimmed);
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error instanceof Error ? error.message : "Invalid JSON" };
  }
}
