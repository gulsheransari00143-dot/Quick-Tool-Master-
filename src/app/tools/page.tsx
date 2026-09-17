import Link from "next/link";
import { toolRegistry } from "@/lib/tools/registry";

export const metadata = {
  title: "Free Online Tools | QuickToolMaster",
  description: "Browse free online tools for files, calculations, development, and productivity.",
};

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Free Online Tools</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">Fast browser-first utilities for everyday tasks.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {toolRegistry.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:-translate-y-0.5">
            <span className="text-2xl">{tool.icon}</span>
            <h2 className="mt-3 font-semibold">{tool.name}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
