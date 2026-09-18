import { describe, expect, it } from "vitest";
import { formatJson, validateJson } from "@/lib/tools/json";
import { decodeBase64, encodeBase64 } from "@/lib/tools/base64";
import { calculatePercentage, percentageChange } from "@/lib/tools/calculators";
import { calculateAge, calculateTemperature, calculateUnit } from "@/lib/tools/core-calculators";

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
    expect(calculateTemperature(32, "F", "C")).toBeCloseTo(0);
    expect(calculateTemperature(0, "C", "K")).toBeCloseTo(273.15);
  });
});

describe("core tool edge cases", () => {
  it("rejects invalid numeric input", () => {
    expect(() => calculateUnit(Number.NaN, "km", "m")).toThrow("valid number");
  });

  it("rejects cross-dimension unit conversion", () => {
    expect(() => calculateUnit(1, "km", "kg")).toThrow("Incompatible units");
  });
});

describe("developer edge cases", () => {
  it("handles empty and malformed JSON explicitly", () => {
    expect(validateJson("   ")).toEqual({ valid: false, error: "JSON input cannot be empty" });
    expect(() => formatJson("")).toThrow("JSON input cannot be empty");
    expect(() => formatJson('{"a":1}', 11)).toThrow("Indentation");
  });

  it("rejects malformed Base64 and empty decode input", () => {
    expect(() => decodeBase64("")).toThrow("cannot be empty");
    expect(() => decodeBase64("not-base64!")).toThrow("Invalid Base64");
    expect(() => decodeBase64("SGVsbG8")).toThrow("Invalid Base64");
  });
});

describe("calculator validation", () => {
  it("rejects non-finite and invalid discount values", async () => {
    const { calculateDiscount } = await import("@/lib/tools/calculators");
    expect(() => calculatePercentage(Number.POSITIVE_INFINITY, 10)).toThrow("valid number");
    expect(() => calculateDiscount(-1, 10)).toThrow("negative");
    expect(() => calculateDiscount(100, 101)).toThrow("between 0 and 100");
  });

  it("handles same units and strict calendar dates", () => {
    expect(calculateUnit(42, "km", "km")).toBe(42);
    expect(() => calculateAge("2026-02-30", "2026-03-01")).toThrow("valid date");
    expect(calculateAge("2000-02-29", "2026-02-28")).toBe(25);
  });
});
