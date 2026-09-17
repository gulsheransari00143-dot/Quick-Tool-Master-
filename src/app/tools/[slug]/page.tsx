import { notFound } from "next/navigation";
import { getToolBySlug, toolRegistry } from "@/lib/tools/registry";
import { toolMetadata } from "@/lib/seo";
import ToolWorkspace from "@/components/ToolWorkspace";
import RecentToolTracker from "@/components/RecentToolTracker";

export function generateStaticParams() {
  return toolRegistry.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getToolBySlug((await params).slug);
  return tool ? toolMetadata(tool) : { title: "Tool not found | QuickToolMaster" };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const tool = getToolBySlug((await params).slug);
  if (!tool) notFound();
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7">
        <RecentToolTracker slug={tool.slug} />
        <span className="text-4xl">{tool.icon}</span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{tool.name}</h1>
        <p className="mt-3 text-[var(--muted)]">{tool.description}</p>
        <ToolWorkspace slug={tool.slug} />
      </div>
    </main>
  );
}
