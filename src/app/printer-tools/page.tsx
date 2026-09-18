import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";
export default function PrinterToolsPage() { const tools=getToolsByCategory("printer-tools"); return <main className="section shell"><p className="eyebrow">Category</p><h1>Printer Tools</h1><p>Create print-ready documents and preview them before printing.</p><div className="tool-grid">{tools.map(t=><ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>; }
