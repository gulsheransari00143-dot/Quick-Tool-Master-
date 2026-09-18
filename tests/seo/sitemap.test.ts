import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { siteUrl } from "@/lib/seo";

describe("sitemap", () => {
  it("includes discovery category pages", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${siteUrl}/calculators`);
    expect(urls).toContain(`${siteUrl}/developer`);
    expect(urls).toContain(`${siteUrl}/generators`);
    expect(urls).toContain(`${siteUrl}/file-tools`);
  });
});
