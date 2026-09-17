"use client";
import Link from "next/link";
type ToolCardProps = { name: string; description: string; href: string; category?: string; slug?: string };
const KEY = "quicktoolmaster:recent-tools";
export default function ToolCard({ name, description, href, category, slug }: ToolCardProps) {
  const remember = () => { if (!slug) return; try { const old = JSON.parse(localStorage.getItem(KEY) || "[]"); localStorage.setItem(KEY, JSON.stringify([slug, ...old.filter((s: string) => s !== slug)].slice(0, 8))); } catch {} };
  return <Link className="tool-card" href={href} onClick={remember}><span className="tool-card-icon" aria-hidden="true">✦</span><span className="tool-card-body">{category && <span className="eyebrow">{category}</span>}<strong>{name}</strong><span>{description}</span></span><span className="tool-card-arrow" aria-hidden="true">→</span></Link>;
}
