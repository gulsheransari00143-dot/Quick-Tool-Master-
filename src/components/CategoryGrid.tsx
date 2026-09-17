import Link from "next/link";
import { categories } from "@/lib/tools/categories";
const routes: Record<string, string> = { "file-tools": "/file-tools", calculators: "/calculators", developer: "/developer", generators: "/generators", "ai-tools": "/ai-tools", templates: "/templates", games: "/games" };
export default function CategoryGrid() {
  return <div className="category-grid">{categories.map((category) => <Link className="category-card" key={category.slug} href={routes[category.slug]}><span className="tool-card-icon" aria-hidden="true">✦</span><strong>{category.name}</strong><span>{category.description}</span></Link>)}</div>;
}
