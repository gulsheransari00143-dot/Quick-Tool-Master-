import Link from "next/link";
import { categories } from "@/lib/tools/categories";
const routes: Record<string, string> = { "file-tools": "/file-tools", calculators: "/calculators", developer: "/developer", generators: "/generators", "ai-tools": "/ai-tools", templates: "/templates", games: "/games", science: "/science", "excel-tools": "/excel-tools" };
const icons: Record<string, string> = { "file-tools": "▣", calculators: "⌁", developer: "</>", generators: "◇", "ai-tools": "✦", templates: "▤", games: "⌘", science: "🔬", "excel-tools": "📊" };
export default function CategoryGrid() {
  return <div className="category-grid">{categories.map((category) => <Link className="category-card" key={category.slug} href={routes[category.slug]}><span className="category-icon" aria-hidden="true">{icons[category.slug] ?? "✦"}</span><span className="category-content"><strong>{category.name}</strong><span>{category.description}</span></span><span className="category-arrow" aria-hidden="true">↗</span></Link>)}</div>;
}
