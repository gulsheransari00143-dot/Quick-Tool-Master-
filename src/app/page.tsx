import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import PopularTools from "@/components/PopularTools";
import RecentlyUsed from "@/components/RecentlyUsed";
export default function Home() { return <><Hero /><section className="section shell" aria-labelledby="categories-heading"><div className="section-heading"><div><h2 id="categories-heading">Explore by category</h2><p>Find the right utility for your task.</p></div></div><CategoryGrid /></section><PopularTools /><div className="shell"><RecentlyUsed /></div></>; }
