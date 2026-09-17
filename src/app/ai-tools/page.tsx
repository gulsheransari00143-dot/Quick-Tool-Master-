import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
export default function AiToolsPage() { const tools = getToolsByCategory("ai-tools"); return <main className="section shell"><p className="eyebrow">Category</p><h1>AI Tools</h1><p>Explore useful AI resources and productivity utilities.</p><div className="tool-grid">{tools.map(t => <ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>; }
