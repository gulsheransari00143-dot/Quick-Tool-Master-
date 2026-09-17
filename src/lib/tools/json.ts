export function formatJson(input: string, spaces = 2) {
  return JSON.stringify(JSON.parse(input), null, spaces);
}

export function validateJson(input: string) {
  try {
    JSON.parse(input);
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error instanceof Error ? error.message : "Invalid JSON" };
  }
}
