import { describe, expect, it } from "vitest";
import { keywordCategories } from "@/lib/keyword-categories";

describe("keyword SEO pages", () => {
  it("has 59 unique keyword categories with distinct core content", () => {
    expect(keywordCategories.length).toBe(59);
    for (const field of ["slug", "description", "catch"]) {
      const values = keywordCategories.map((x) => x[field as keyof typeof x]);
      expect(new Set(values)).toHaveLength(keywordCategories.length);
    }
  });
  it("gives every keyword page its own intent paths, use cases and FAQs", () => {
    for (const item of keywordCategories) {
      expect(item.intentModes.length).toBeGreaterThanOrEqual(3);
      expect(item.useCases.length).toBe(3);
      expect(item.faq.length).toBe(3);
      expect(item.keywords.length).toBeGreaterThanOrEqual(3);
      expect(item.examples.length).toBeGreaterThanOrEqual(3);
    }
  });
});
