import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("includes discovery category pages", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://quicktoolmaster.com/calculators");
    expect(urls).toContain("https://quicktoolmaster.com/developer");
    expect(urls).toContain("https://quicktoolmaster.com/generators");
    expect(urls).toContain("https://quicktoolmaster.com/file-tools");
  });
});
