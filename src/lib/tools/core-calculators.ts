export function calculateAge(birth: string, target: string) {
  const b = new Date(`${birth}T00:00:00Z`);
  const t = new Date(`${target}T00:00:00Z`);
  if (Number.isNaN(b.getTime()) || Number.isNaN(t.getTime()) || t < b) throw new Error("Invalid dates");
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
  const source = units[from];
  const target = units[to];
  if (source === undefined || target === undefined) throw new Error("Unsupported unit");
  if (dimensions[from] !== dimensions[to]) throw new Error("Incompatible units");
  return (value * source) / target;
}
