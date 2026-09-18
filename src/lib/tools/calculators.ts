function assertFinite(value: number, label: string) {
  if (!Number.isFinite(value)) throw new Error(`${label} must be a valid number`);
}

export function calculatePercentage(value: number, total: number) {
  assertFinite(value, "Value");
  assertFinite(total, "Total");
  if (total === 0) throw new Error("Total cannot be zero");
  return (value / total) * 100;
}

export function percentageChange(from: number, to: number) {
  assertFinite(from, "Starting value");
  assertFinite(to, "New value");
  if (from === 0) throw new Error("Starting value cannot be zero");
  return ((to - from) / Math.abs(from)) * 100;
}

export function calculateDiscount(price: number, discount: number) {
  assertFinite(price, "Price");
  assertFinite(discount, "Discount");
  if (price < 0) throw new Error("Price cannot be negative");
  if (discount < 0 || discount > 100) throw new Error("Discount must be between 0 and 100");
  return price - price * (discount / 100);
}
