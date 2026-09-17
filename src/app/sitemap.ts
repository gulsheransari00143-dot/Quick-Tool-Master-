import type { MetadataRoute } from "next";
import { toolRegistry } from "@/lib/tools/registry";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = ["file-tools", "calculators", "developer", "generators", "ai-tools", "templates", "games"];
  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/tools`, lastModified: new Date() },
    ...categories.map((category) => ({ url: `${siteUrl}/${category}`, lastModified: new Date() })),
    ...toolRegistry.map((tool) => ({ url: `${siteUrl}/tools/${tool.slug}`, lastModified: new Date() })),
  ];
}
