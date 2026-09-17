import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
export default function TemplatesPage() { const tools = getToolsByCategory("templates"); return <main className="section shell"><p className="eyebrow">Category</p><h1>Templates</h1><p>Practical templates and reusable resources for work and productivity.</p><div className="tool-grid">{tools.map(t => <ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>; }
