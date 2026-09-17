import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
export default function DeveloperPage() { const tools = getToolsByCategory("developer"); return <main className="section shell"><p className="eyebrow">Category</p><h1>Developer Tools</h1><p>Fast browser tools for formatting, encoding and working with data.</p><div className="tool-grid">{tools.map(t => <ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>; }
