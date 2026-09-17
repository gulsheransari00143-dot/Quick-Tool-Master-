import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
export default function FileToolsPage() { const tools = getToolsByCategory("file-tools"); return <main className="section shell"><p className="eyebrow">Category</p><h1>File Tools</h1><p>Compress, resize and convert common files in your browser.</p><div className="tool-grid">{tools.map(t => <ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>; }
