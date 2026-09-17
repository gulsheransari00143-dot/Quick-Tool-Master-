import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
export default function CalculatorsPage() { const tools = getToolsByCategory("calculators"); return <main className="section shell"><p className="eyebrow">Category</p><h1>Free Calculators</h1><p>Practical calculators for everyday decisions and quick answers.</p><div className="tool-grid">{tools.map(t => <ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>; }
