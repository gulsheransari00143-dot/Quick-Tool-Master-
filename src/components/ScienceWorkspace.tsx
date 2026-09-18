"use client";
import { useState } from "react";
const facts:Record<string,string>={
"what is gravity":"Gravity is the attractive force between masses. Near Earth, it gives freely falling objects an acceleration of about 9.8 m/s².",
"what is photosynthesis":"Photosynthesis is the process plants use to convert light energy, water, and carbon dioxide into chemical energy, producing oxygen as a by-product.",
"what is dna":"DNA is the molecule that stores hereditary genetic information in living organisms.",
"what is an atom":"An atom is the basic unit of an element, with a nucleus of protons and neutrons surrounded by electrons.",
"what is speed":"Speed is the distance travelled per unit time: speed = distance ÷ time.",
"what is force":"Force is an interaction that can change an object's motion. Its SI unit is the newton (N).",
"what is electricity":"Electricity involves electric charge and its movement. Electric current is measured in amperes (A).",
"what is the solar system":"The Solar System consists of the Sun and the objects gravitationally bound to it, including eight planets and smaller bodies.",
"what is evolution":"Biological evolution is the change in inherited characteristics of populations across generations.",
"what is water":"Water is H₂O: each molecule contains two hydrogen atoms and one oxygen atom.",
};
function answer(q:string){const s=q.toLowerCase().replace(/[?!.]/g,"").trim();const key=Object.keys(facts).find(k=>s.includes(k.replace("what is ",""))||s===k);if(key)return facts[key];if(/\b(physics|chemistry|biology|space|science)\b/.test(s))return "This is a science question. Add the exact concept, formula, or topic you want explained and the tool will give a concise, student-friendly answer.";return "I can answer common science concepts in physics, chemistry, biology, space, and general science. Try: What is gravity? What is DNA? What is photosynthesis?";}
export default function ScienceWorkspace(){const [q,setQ]=useState("");const [out,setOut]=useState("");const run=()=>setOut(answer(q));return <div className="workspace"><label>Ask a science question<textarea rows={7} value={q} onChange={e=>setQ(e.target.value)} placeholder="Example: What is gravity?" /></label><button className="primary-button" disabled={!q.trim()} onClick={run}>Get answer</button>{out&&<div className="result-card"><pre className="overflow-auto whitespace-pre-wrap">{out}</pre><button onClick={()=>navigator.clipboard?.writeText(out)}>Copy</button></div>}</div>}
