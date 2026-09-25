import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quick-tool-master.gulsheransari00143.workers.dev"),
  alternates: { canonical: "/" },
  title: { default: "Quick Tool Master — Free Online Tools", template: "%s | Quick Tool Master" },
  description: "Fast, simple, privacy-friendly online tools, calculators and utilities.",
};

const GA_ID = "G-0X33TFDKGC";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Quick Tool Master",
    url: "https://quick-tool-master.gulsheransari00143.workers.dev/",
    description: "Fast, simple, privacy-friendly online tools, calculators and utilities.",
  };
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Script id="website-schema" type="application/ld+json">{JSON.stringify(websiteSchema)}</Script>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="beforeInteractive" />
        <Script id="google-analytics" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag("js", new Date());
          gtag("config", "${GA_ID}");
        `}</Script>
      </body>
    </html>
  );
}
