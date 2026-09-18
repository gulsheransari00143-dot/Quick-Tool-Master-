export const siteUrl = "https://quick-tool-master.gulsheransari00143.workers.dev";

export function toolMetadata(tool: {
  name: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
}) {
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: { canonical: `${siteUrl}/tools/${tool.slug}` },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `${siteUrl}/tools/${tool.slug}`,
      type: "website" as const,
    },
  };
}
