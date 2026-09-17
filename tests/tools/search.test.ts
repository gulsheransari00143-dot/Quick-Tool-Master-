import { describe, expect, it } from "vitest";
import { toolRegistry } from "@/lib/tools/registry";
import { searchTools } from "@/lib/tools/search";

describe("tool search", () => {
  it("finds tools case-insensitively", () => {
    expect(searchTools(toolRegistry, "JSON")[0]?.slug).toBe("json-formatter");
  });

  it("filters by category", () => {
    const results = searchTools(toolRegistry, "", "calculators");
    expect(results.length).toBeGreaterThanOrEqual(3);
    expect(results.every((tool) => tool.category === "calculators")).toBe(true);
  });
});
