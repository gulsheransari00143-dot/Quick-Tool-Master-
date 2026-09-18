import { Suspense } from "react";
import SearchableTools from "@/components/SearchableTools";

export const metadata = {
  title: "Free Online Tools | QuickToolMaster",
  description: "Browse free online tools for files, calculations, development, and productivity.",
};

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Free Online Tools</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">Fast browser-first utilities for everyday tasks.</p>
      <div className="mt-8">
        <Suspense fallback={<div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]">Loading tools…</div>}>
          <SearchableTools />
        </Suspense>
      </div>
    </main>
  );
}
