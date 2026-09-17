import { describe, expect, it } from "vitest";
import { categories } from "@/lib/tools/categories";
import { toolRegistry } from "@/lib/tools/registry";

describe("tool registry", () => {
  it("contains unique slugs and valid categories", () => {
    const slugs = toolRegistry.map((tool) => tool.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(toolRegistry.length).toBeGreaterThanOrEqual(10);
    for (const tool of toolRegistry) {
      expect(categories.some((category) => category.slug === tool.category)).toBe(true);
      expect(tool.seoTitle.length).toBeGreaterThan(10);
      expect(tool.seoDescription.length).toBeGreaterThan(30);
    }
  });
});
