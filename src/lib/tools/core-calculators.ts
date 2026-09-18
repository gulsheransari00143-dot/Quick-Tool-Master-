function parseDateOnly(value: string, label: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error(`${label} must be a valid date`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new Error(`${label} must be a valid date`);
  }
  return date;
}

export function calculateAge(birth: string, target: string) {
  const b = parseDateOnly(birth, "Birth date");
  const t = parseDateOnly(target, "Target date");
  if (t < b) throw new Error("Target date cannot be before birth date");
  let age = t.getUTCFullYear() - b.getUTCFullYear();
  const beforeBirthday = t.getUTCMonth() < b.getUTCMonth() ||
    (t.getUTCMonth() === b.getUTCMonth() && t.getUTCDate() < b.getUTCDate());
  if (beforeBirthday) age -= 1;
  return age;
}

const units: Record<string, number> = {
  m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, ft: 0.3048, in: 0.0254, yd: 0.9144,
  g: 1, kg: 1000, mg: 0.001, lb: 453.59237, oz: 28.349523125,
  l: 1, ml: 0.001, gal: 3.785411784,
};
const dimensions: Record<string, string> = {
  m: "length", km: "length", cm: "length", mm: "length", mi: "length", ft: "length", in: "length", yd: "length",
  g: "weight", kg: "weight", mg: "weight", lb: "weight", oz: "weight",
  l: "volume", ml: "volume", gal: "volume",
};

export function calculateUnit(value: number, from: string, to: string) {
  if (!Number.isFinite(value)) throw new Error("Value must be a valid number");
  const source = units[from];
  const target = units[to];
  if (source === undefined || target === undefined) throw new Error("Unsupported unit");
  if (dimensions[from] !== dimensions[to]) throw new Error("Incompatible units");
  return (value * source) / target;
}

export function calculateTemperature(value: number, from: string, to: string) {
  if (!Number.isFinite(value)) throw new Error("Value must be a valid number");
  const supported = new Set(["C", "F", "K"]);
  if (!supported.has(from) || !supported.has(to)) throw new Error("Unsupported temperature unit");
  const celsius = from === "C" ? value : from === "F" ? (value - 32) * (5 / 9) : value - 273.15;
  return to === "C" ? celsius : to === "F" ? celsius * (9 / 5) + 32 : celsius + 273.15;
}
