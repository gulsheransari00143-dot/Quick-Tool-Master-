import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
export default function GeneratorsPage() { const tools = getToolsByCategory("generators"); return <main className="section shell"><p className="eyebrow">Category</p><h1>Free Generators</h1><p>Create useful assets directly in your browser.</p><div className="tool-grid">{tools.map(t => <ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>; }
