import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
export default function SciencePage() { const tools = getToolsByCategory("science"); return <main className="section shell"><p className="eyebrow">Category</p><h1>Science</h1><p>Ask science questions and explore clear explanations.</p><div className="tool-grid">{tools.map(t => <ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>; }
