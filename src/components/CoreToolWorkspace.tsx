"use client";
import { useState } from "react";
import { formatJson, validateJson } from "@/lib/tools/json";
import { decodeBase64, encodeBase64 } from "@/lib/tools/base64";
import { calculatePercentage, percentageChange } from "@/lib/tools/calculators";
import { calculateAge, calculateUnit } from "@/lib/tools/core-calculators";

const unitGroups = {
  Length: ["m", "km", "cm", "mm", "mi", "ft", "in", "yd"],
  Weight: ["g", "kg", "mg", "lb", "oz"],
  Volume: ["l", "ml", "gal"],
};
const field = "w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3";
function Button({ children, onClick, disabled = false }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return <button type="button" disabled={disabled} className="rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-white disabled:opacity-50" onClick={onClick}>{children}</button>;
}
function Box({ children }: { children: React.ReactNode }) { return <div className="workspace-panel">{children}</div>; }

function DeveloperTool({ slug }: { slug: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [valid, setValid] = useState<boolean>();
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const run = () => {
    try {
      if (slug === "json-formatter") {
        const result = validateJson(input); setValid(result.valid);
        setOutput(result.valid ? formatJson(input) : result.error ?? "Invalid JSON");
      } else { setOutput(mode === "encode" ? encodeBase64(input) : decodeBase64(input)); }
    } catch (e) { setOutput(e instanceof Error ? e.message : "Invalid input"); }
  };
  return <Box>
    {slug === "base64" && <div className="mb-4 flex gap-2" role="group" aria-label="Base64 mode">
      <button type="button" aria-pressed={mode === "encode"} className="rounded-xl border px-4 py-2" onClick={() => setMode("encode")}>Encode</button>
      <button type="button" aria-pressed={mode === "decode"} className="rounded-xl border px-4 py-2" onClick={() => setMode("decode")}>Decode</button>
    </div>}
    <label className="grid gap-2 font-semibold">{slug === "json-formatter" ? "JSON input" : mode === "encode" ? "Text input" : "Base64 input"}
      <textarea aria-label="Tool input" className={field} rows={9} value={input} onChange={e => setInput(e.target.value)} placeholder={slug === "json-formatter" ? '{"hello":"world"}' : "Enter text or Base64..."} />
    </label>
    <div className="mt-4 flex gap-3"><Button onClick={run}>{slug === "json-formatter" ? "Format & Validate" : mode === "encode" ? "Encode" : "Decode"}</Button><button type="button" className="rounded-xl border px-5 py-3" onClick={() => { setInput(""); setOutput(""); setValid(undefined); }}>Clear</button></div>
    {valid !== undefined && <p className="mt-4 font-medium" role="status">{valid ? "✓ Valid JSON" : "✕ Invalid JSON"}</p>}
    {output && <pre className="mt-4 overflow-auto rounded-xl bg-[var(--background)] p-4 text-sm" aria-label="Tool output">{output}</pre>}
  </Box>;
}

function UnitOptions() { return <>{Object.entries(unitGroups).map(([group, items]) => <optgroup key={group} label={group}>{items.map(unit => <option key={unit} value={unit}>{unit}</option>)}</optgroup>)}</>; }
function Calculator({ slug }: { slug: string }) {
  const [a, setA] = useState(25); const [b, setB] = useState(200); const [result, setResult] = useState("");
  const [from, setFrom] = useState("km"); const [to, setTo] = useState("m"); const [birth, setBirth] = useState("2000-01-15"); const [date, setDate] = useState("2026-01-14");
  if (slug === "age-calculator") return <Box><label className="grid gap-2 font-semibold">Date of birth<input aria-label="Date of birth" className={field} type="date" value={birth} onChange={e => setBirth(e.target.value)} /></label><label className="mt-4 grid gap-2 font-semibold">Calculate age on<input aria-label="Calculate age on" className={field} type="date" value={date} onChange={e => setDate(e.target.value)} /></label><div className="mt-4"><Button onClick={() => { try { setResult(`${calculateAge(birth, date)} years`); } catch (e) { setResult(e instanceof Error ? e.message : "Invalid dates"); } }}>Calculate Age</Button></div>{result && <p className="mt-4 text-2xl font-bold" role="status">{result}</p>}</Box>;
  if (slug === "unit-converter") return <Box><div className="grid gap-4 sm:grid-cols-3"><label className="grid gap-2 font-semibold">Value<input aria-label="Conversion value" className={field} type="number" value={a} onChange={e => setA(Number(e.target.value))} /></label><label className="grid gap-2 font-semibold">From<select aria-label="From unit" className={field} value={from} onChange={e => setFrom(e.target.value)}><UnitOptions /></select></label><label className="grid gap-2 font-semibold">To<select aria-label="To unit" className={field} value={to} onChange={e => setTo(e.target.value)}><UnitOptions /></select></label></div><div className="mt-4"><Button onClick={() => { try { setResult(String(calculateUnit(a, from, to))); } catch (e) { setResult(e instanceof Error ? e.message : "Unsupported unit"); } }}>Convert</Button></div>{result && <p className="mt-4 text-2xl font-bold" role="status">{result}</p>}</Box>;
  return <Box><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 font-semibold">Value<input aria-label="Value" className={field} type="number" value={a} onChange={e => setA(Number(e.target.value))} /></label><label className="grid gap-2 font-semibold">Total / new value<input aria-label="Total or new value" className={field} type="number" value={b} onChange={e => setB(Number(e.target.value))} /></label></div><div className="mt-4"><Button onClick={() => setResult(`${slug === "percentage-calculator" ? calculatePercentage(a, b) : percentageChange(a, b)}%`)}>Calculate</Button></div>{result && <p className="mt-4 text-2xl font-bold" role="status">{result}</p>}</Box>;
}

export default function CoreToolWorkspace({ slug }: { slug: string }) { return ["json-formatter", "base64"].includes(slug) ? <DeveloperTool slug={slug} /> : <Calculator slug={slug} />; }
