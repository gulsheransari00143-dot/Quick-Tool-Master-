"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { searchTools } from "@/lib/tools/search";
import { toolRegistry } from "@/lib/tools/registry";

export default function SearchableTools() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const results = searchTools(toolRegistry, query);

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]" aria-live="polite">
          {query ? `${results.length} tool${results.length === 1 ? "" : "s"} found for “${query}”` : `${results.length} tools available`}
        </p>
        {query && <Link href="/tools" className="text-sm font-semibold text-[var(--accent)] hover:underline">Clear search</Link>}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5">
              <span className="text-2xl" aria-hidden="true">{tool.icon}</span>
              <h2 className="mt-3 font-semibold">{tool.name}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{tool.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <div className="text-3xl" aria-hidden="true">⌕</div>
          <h2 className="mt-3 text-xl font-semibold">No tools found</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Try a different name, category, or keyword.</p>
          <Link href="/tools" className="mt-5 inline-flex rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">Show all tools</Link>
        </div>
      )}
    </>
  );
}
