"use client";
import { useEffect, useRef, useState } from "react";

type Mode = "auto" | "portrait" | "landscape";

function clamp(v:number){ return Math.max(0, Math.min(255, v)); }
function saveBlob(blob:Blob, name:string){ const u=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=u; a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(u),1000); }

export default function AIImageEnhancer(){
 const inputRef=useRef<HTMLInputElement>(null); const [file,setFile]=useState<File>(); const [src,setSrc]=useState(""); const [result,setResult]=useState<Blob>();
 const [scale,setScale]=useState(2); const [strength,setStrength]=useState(55); const [hdr,setHdr]=useState(35); const [denoise,setDenoise]=useState(25); const [mode,setMode]=useState<Mode>("auto"); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 useEffect(()=>()=>{if(src)URL.revokeObjectURL(src)},[src]);
 const choose=(f:File)=>{ if(!f.type.startsWith("image/")){setError("Please choose an image.");return;} setFile(f); setResult(undefined); setError(""); const u=URL.createObjectURL(f); setSrc(u); };
 const enhance=async()=>{ if(!file)return; setBusy(true);setError("");setResult(undefined); try{
  const img=new Image(); img.src=src; await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;});
  const w=img.naturalWidth,imgH=img.naturalHeight; const max=scale===4?4096:3072; const factor=Math.min(scale,max/Math.max(w,imgH),scale); const outW=Math.max(1,Math.round(w*factor)),outH=Math.max(1,Math.round(imgH*factor));
  const c=document.createElement("canvas"); c.width=outW;c.height=outH; const x=c.getContext("2d",{willReadFrequently:true}); if(!x)throw new Error("Canvas is unavailable.");
  x.imageSmoothingEnabled=true;x.imageSmoothingQuality="high";x.drawImage(img,0,0,outW,outH); const im=x.getImageData(0,0,outW,outH),d=im.data;
  const original=new Uint8ClampedArray(d); const radius=denoise>0?1:0;
  if(radius){ for(let y=1;y<outH-1;y++) for(let xx=1;xx<outW-1;xx++){ const i=(y*outW+xx)*4; for(let ch=0;ch<3;ch++){ let sum=0,n=0; for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){sum+=original[((y+dy)*outW+xx+dx)*4+ch];n++;} d[i+ch]=original[i+ch]*(1-denoise/100)+sum/n*(denoise/100); } } }
  const s=strength/100; const hdrAmount=hdr/100;
  for(let y=1;y<outH-1;y++) for(let xx=1;xx<outW-1;xx++){ const i=(y*outW+xx)*4;
   for(let ch=0;ch<3;ch++){ const center=d[i+ch], up=d[((y-1)*outW+xx)*4+ch], down=d[((y+1)*outW+xx)*4+ch], left=d[(y*outW+xx-1)*4+ch], right=d[(y*outW+xx+1)*4+ch]; const edge=center-(up+down+left+right)/4; d[i+ch]=clamp(center+edge*s); }
   const lum=(0.2126*d[i]+0.7152*d[i+1]+0.0722*d[i+2])/255; const tone=lum<0.5?1+hdrAmount*(0.5-lum):1+hdrAmount*(lum-0.5)*0.55; d[i]=clamp((d[i]-128)*tone+128);d[i+1]=clamp((d[i+1]-128)*tone+128);d[i+2]=clamp((d[i+2]-128)*tone+128);
  }
  x.putImageData(im,0,0); const blob=await new Promise<Blob|null>(r=>c.toBlob(r,"image/jpeg",0.94)); if(!blob)throw new Error("Enhancement failed."); setResult(blob);
 }catch(e){setError(e instanceof Error?e.message:"Enhancement failed.");}finally{setBusy(false);} };
 return <div className="workspace">
  <label className="drop-zone"><input ref={inputRef} type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&choose(e.target.files[0])}/><strong>Upload photo</strong><span>JPG, PNG, WebP — processing stays in your browser</span></label>
  {file&&<div className="file-pill"><span>{file.name}</span><small>{(file.size/1024).toFixed(1)} KB</small></div>}
  <div className="control-grid"><label>Enhancement mode<select value={mode} onChange={e=>setMode(e.target.value as Mode)}><option value="auto">Auto</option><option value="portrait">Portrait</option><option value="landscape">Landscape</option></select></label><label>Upscale<select value={scale} onChange={e=>setScale(+e.target.value)}><option value="2">2×</option><option value="4">4×</option></select></label></div>
  <label>Detail recovery<input type="range" min="0" max="100" value={strength} onChange={e=>setStrength(+e.target.value)}/><b>{strength}%</b></label>
  <label>Noise reduction<input type="range" min="0" max="100" value={denoise} onChange={e=>setDenoise(+e.target.value)}/><b>{denoise}%</b></label>
  <label>HDR recovery<input type="range" min="0" max="100" value={hdr} onChange={e=>setHdr(+e.target.value)}/><b>{hdr}%</b></label>
  <button className="primary-button" disabled={!file||busy} onClick={enhance}>{busy?"Enhancing…":"✨ Enhance image"}</button>
  {error&&<p className="error-text" role="alert">{error}</p>}
  {src&&<div className="result-card"><img src={src} alt="Original preview" style={{maxWidth:"100%",maxHeight:320,objectFit:"contain"}}/><span>Original preview</span></div>}
  {result&&<div className="result-card"><span>Enhanced image ready — {(result.size/1024).toFixed(1)} KB</span><button onClick={()=>saveBlob(result,"quicktoolmaster-enhanced.jpg")}>Download enhanced image</button></div>}
  <p className="text-sm opacity-70">Advanced browser enhancement: upscale, detail recovery, noise reduction and HDR-style tonal recovery. Large images are capped for mobile performance.</p>
 </div>;
}
