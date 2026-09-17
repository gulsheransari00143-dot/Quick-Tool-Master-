"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getToolBySlug } from "@/lib/tools/registry";
const KEY = "quicktoolmaster:recent-tools";
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]") as string[]; } catch { return []; } };
export default function RecentlyUsed() {
  const [slugs, setSlugs] = useState<string[]>(() => typeof window === "undefined" ? [] : read());
  useEffect(() => { const onStorage = () => setSlugs(read()); window.addEventListener("storage", onStorage); return () => window.removeEventListener("storage", onStorage); }, []);
  const tools = slugs.map(getToolBySlug).filter(Boolean).slice(0, 4);
  return <section className="section" aria-labelledby="recently-used-heading"><div className="section-heading"><div><h2 id="recently-used-heading">Recently used</h2><p>Your recent tools stay on this device.</p></div></div>{tools.length ? <div className="tool-grid">{tools.map((tool) => tool && <Link className="tool-card" key={tool.slug} href={`/tools/${tool.slug}`}><strong>{tool.name}</strong><span>{tool.description}</span><span aria-hidden="true">→</span></Link>)}</div> : <p className="muted">No recent tools yet. Pick a tool above to get started.</p>}</section>;
}
