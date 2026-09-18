import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/lib/tools/registry";

export default function ExcelToolsPage() {
  const tools = getToolsByCategory("excel-tools");
  return <main className="section shell"><p className="eyebrow">Category</p><h1>Excel Tools</h1><p>Work with Excel and CSV spreadsheet files directly in your browser.</p><div className="tool-grid">{tools.map(t => <ToolCard key={t.slug} {...t} href={`/tools/${t.slug}`} />)}</div></main>;
}