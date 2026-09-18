"use client";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExcelWorkspace() {
  const [fileName, setFileName] = useState("");
  const [sheet, setSheet] = useState("");
  const [sheets, setSheets] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [error, setError] = useState("");

  const openFile = async (file: File) => {
    setFileName(file.name); setError("");
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      setSheets(workbook.SheetNames);
      const first = workbook.SheetNames[0] ?? "";
      setSheet(first);
      setRows(first ? (XLSX.utils.sheet_to_json(workbook.Sheets[first], { header: 1, defval: "" }) as unknown as string[][]) : []);
      if (!first) setError("No spreadsheet sheet found.");
    } catch (e) { setRows([]); setSheets([]); setError(e instanceof Error ? e.message : "Could not open spreadsheet"); }
  };

  const changeSheet = async (name: string) => {
    if (!fileName) return;
    setSheet(name);
    try {
      const input = document.querySelector<HTMLInputElement>("#excel-file");
      if (!input?.files?.[0]) return;
      const workbook = XLSX.read(await input.files[0].arrayBuffer(), { type: "array" });
      setRows(XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, defval: "" }) as unknown as string[][]);
    } catch { setError("Could not read this sheet."); }
  };

  return <div className="workspace-panel">
    <label className="grid gap-2 font-semibold">Excel or CSV file
      <input id="excel-file" type="file" accept=".xlsx,.xls,.csv" className="w-full rounded-xl border border-[var(--border)] p-3" onChange={e => e.target.files?.[0] && openFile(e.target.files[0])} />
    </label>
    {fileName && <p className="mt-3 text-sm">Opened: <strong>{fileName}</strong></p>}
    {sheets.length > 1 && <label className="mt-4 grid gap-2 font-semibold">Sheet
      <select className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3" value={sheet} onChange={e => changeSheet(e.target.value)}>{sheets.map(s => <option key={s}>{s}</option>)}</select>
    </label>}
    {error && <p className="mt-4 font-medium" role="alert">{error}</p>}
    {rows.length > 0 && <div className="mt-4 overflow-auto rounded-xl border border-[var(--border)]"><table className="min-w-full text-sm"><tbody>{rows.slice(0, 100).map((row, r) => <tr key={r} className="border-b border-[var(--border)]">{row.slice(0, 30).map((cell, c) => r === 0 ? <th key={c} className="px-3 py-2 text-left font-semibold">{String(cell)}</th> : <td key={c} className="px-3 py-2">{String(cell)}</td>)}</tr>)}</tbody></table></div>}
    {rows.length > 100 && <p className="mt-2 text-sm">Showing first 100 rows and 30 columns.</p>}
  </div>;
}