"use client";
import Image from "next/image";
import { useState } from "react";
import { compressImage, convertImage, resizeImage, type ImageFormat } from "@/lib/tools/image";
import { pdfToJpg } from "@/lib/tools/pdf-to-jpg";
import { generateQrDataUrl } from "@/lib/tools/qr-code";
import CoreToolWorkspace from "@/components/CoreToolWorkspace";
import AIWorkspace from "@/components/AIWorkspace";
import TemplateWorkspace from "@/components/TemplateWorkspace";
import GameWorkspace from "@/components/GameWorkspace";
import ScienceWorkspace from "@/components/ScienceWorkspace";
import ExcelWorkspace from "@/components/ExcelWorkspace";
type Props = { slug: string };
const formats: { label: string; value: ImageFormat }[] = [
 { label: "JPG", value: "image/jpeg" }, { label: "PNG", value: "image/png" }, { label: "WebP", value: "image/webp" },
];
function saveBlob(blob: Blob, name: string) {
 const url = URL.createObjectURL(blob); const link = document.createElement("a");
 link.href = url; link.download = name; link.rel = "noopener"; link.style.display = "none";
 document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function FilePicker({ accept, onChange }: { accept: string; onChange: (file: File) => void }) {
 return <label className="drop-zone"><input type="file" accept={accept} onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])} /><strong>Choose a file</strong><span>or tap here to browse</span></label>;
}
function ImageTool({ slug }: { slug: string }) {
 const [file, setFile] = useState<File>(); const [busy, setBusy] = useState(false); const [result, setResult] = useState<Blob>(); const [error, setError] = useState("");
 const [quality, setQuality] = useState(70); const [width, setWidth] = useState(1200); const [height, setHeight] = useState(800); const [format, setFormat] = useState<ImageFormat>("image/webp");
 const chooseFile = (nextFile: File) => { setFile(nextFile); setResult(undefined); setError(""); };
 const run = async () => { if (!file) return; setBusy(true); setError(""); try { const blob = slug === "image-compressor" ? await compressImage(file, quality / 100) : slug === "image-resizer" ? await resizeImage(file, width, height, format) : await convertImage(file, format); setResult(blob); } catch (e) { setResult(undefined); setError(e instanceof Error ? e.message : "Image processing failed"); } finally { setBusy(false); } };
 return <div className="workspace"><FilePicker accept="image/*" onChange={chooseFile} />
 {file && <div className="file-pill"><span>{file.name}</span><small>{(file.size / 1024).toFixed(1)} KB</small></div>}
 {slug === "image-compressor" && <label>Quality<input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} /><b>{quality}%</b></label>}
 {slug === "image-resizer" && <div className="control-grid"><label>Width<input type="number" min="1" value={width} onChange={(e) => setWidth(+e.target.value)} /></label><label>Height<input type="number" min="1" value={height} onChange={(e) => setHeight(+e.target.value)} /></label></div>}
 {slug !== "image-compressor" && <div>Output format<select value={format} onChange={(e) => setFormat(e.target.value as ImageFormat)}>{formats.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>}
 <button className="primary-button" disabled={!file || busy} onClick={run}>{busy ? "Processing…" : slug === "image-compressor" ? "Compress image" : slug === "image-resizer" ? "Resize image" : "Convert image"}</button>
 {error && <p className="error-text" role="alert">{error}</p>}
 {result && <div className="result-card"><span>Done — {(result.size / 1024).toFixed(1)} KB</span><button onClick={() => saveBlob(result, `quicktoolmaster-${slug}.` + (format === "image/jpeg" || slug === "image-compressor" ? "jpg" : format === "image/webp" ? "webp" : "png"))}>Download</button></div>}
 </div>;
}
function PdfTool() {
 const [file, setFile] = useState<File>(); const [busy, setBusy] = useState(false); const [results, setResults] = useState<Blob[]>([]); const [error, setError] = useState("");
 const run = async () => { if (!file) return; setBusy(true); setError(""); try { setResults(await pdfToJpg(file)); } catch (e) { setError(e instanceof Error ? e.message : "PDF conversion failed"); } finally { setBusy(false); } };
 const chooseFile = (nextFile: File) => { setFile(nextFile); setResults([]); setError(""); };
 return <div className="workspace"><FilePicker accept="application/pdf" onChange={chooseFile} />
 {file && <div className="file-pill"><span>{file.name}</span><small>{(file.size / 1024).toFixed(1)} KB</small></div>}
 <button className="primary-button" disabled={!file || busy} onClick={run}>{busy ? "Converting…" : "Convert PDF to JPG"}</button>
 {error && <p className="error-text" role="alert">{error}</p>}{results.length > 0 && <div className="result-list">{results.map((blob, i) => <button key={i} onClick={() => saveBlob(blob, `page-${i + 1}.jpg`)}>Download page {i + 1}</button>)}</div>}</div>;
}
function QrTool() {
 const [text, setText] = useState(""); const [src, setSrc] = useState(""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
 const run = async () => { setBusy(true); setError(""); try { setSrc(await generateQrDataUrl(text)); } catch (e) { setSrc(""); setError(e instanceof Error ? e.message : "QR generation failed"); } finally { setBusy(false); } };
 const download = async () => { if (!src) return; try { const response = await fetch(src); if (!response.ok) throw new Error("QR download failed"); saveBlob(await response.blob(), "quicktoolmaster-qr.png"); } catch (e) { setError(e instanceof Error ? e.message : "QR download failed"); } };
 const updateText = (value: string) => { setText(value); setSrc(""); setError(""); };
 return <div className="workspace"><label>Text or URL<textarea rows={5} value={text} onChange={(e) => updateText(e.target.value)} placeholder="https://example.com" /></label><button className="primary-button" disabled={!text.trim() || busy} onClick={run}>{busy ? "Generating…" : "Generate QR code"}</button>{error && <p className="error-text" role="alert">{error}</p>}{src && <div className="qr-result"><Image src={src} alt="Generated QR code" width={320} height={320} unoptimized /><button onClick={download}>Download PNG</button></div>}</div>;
}
export default function ToolWorkspace({ slug }: Props) {
 if (["json-formatter", "base64", "percentage-calculator", "age-calculator", "unit-converter"].includes(slug)) return <CoreToolWorkspace slug={slug} />;
 if (["image-compressor", "image-resizer", "image-converter"].includes(slug)) return <ImageTool slug={slug} />;
 if (slug === "pdf-to-jpg") return <PdfTool />;
 if (slug === "qr-code-generator") return <QrTool />;
 if (slug === "science-qa") return <ScienceWorkspace />;
 if (slug === "excel-csv-viewer") return <ExcelWorkspace />;
 if (slug.startsWith("ai-")) return <AIWorkspace slug={slug} />;
 if (["resume-template","invoice-template","meeting-notes-template"].includes(slug)) return <TemplateWorkspace slug={slug} />;
 if (["tic-tac-toe","number-guess","reaction-timer"].includes(slug)) return <GameWorkspace slug={slug} />;
 return null;
}
