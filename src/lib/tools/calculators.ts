export function calculatePercentage(value: number, total: number) {
  if (total === 0) throw new Error("Total cannot be zero");
  return (value / total) * 100;
}

export function percentageChange(from: number, to: number) {
  if (from === 0) throw new Error("Starting value cannot be zero");
  return ((to - from) / Math.abs(from)) * 100;
}

export function calculateDiscount(price: number, discount: number) {
  return price - price * (discount / 100);
}
