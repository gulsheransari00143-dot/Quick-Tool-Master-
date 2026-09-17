import { describe, expect, it } from "vitest";
import { formatJson, validateJson } from "@/lib/tools/json";
import { decodeBase64, encodeBase64 } from "@/lib/tools/base64";
import { calculatePercentage, percentageChange } from "@/lib/tools/calculators";
import { calculateAge, calculateUnit } from "@/lib/tools/core-calculators";

describe("developer tools", () => {
  it("formats and validates JSON", () => {
    expect(formatJson('{"a":1}')).toBe('{\n  "a": 1\n}');
    expect(validateJson('{"a":1}').valid).toBe(true);
    expect(validateJson("bad").valid).toBe(false);
  });
  it("round trips Base64 UTF-8 text", () => {
    const encoded = encodeBase64("Hello ✓");
    expect(decodeBase64(encoded)).toBe("Hello ✓");
  });
});

describe("calculators", () => {
  it("calculates percentage and percentage change", () => {
    expect(calculatePercentage(25, 200)).toBe(12.5);
    expect(percentageChange(100, 125)).toBe(25);
  });
  it("calculates age and unit conversions", () => {
    expect(calculateAge("2000-01-15", "2026-01-14")).toBe(25);
    expect(calculateUnit(1, "km", "m")).toBe(1000);
  });
});

describe("core tool edge cases", () => {
  it("rejects cross-dimension unit conversion", () => {
    expect(() => calculateUnit(1, "km", "kg")).toThrow("Incompatible units");
  });
});
