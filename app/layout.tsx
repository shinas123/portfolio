import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shinas AR — AI Engineer & Automation Specialist",
  description:
    "Solo-shipping AI engineer building production systems with agentic tooling. Dubai. Trading platforms, education platforms, MCP servers, automation pipelines.",
  metadataBase: new URL("https://shinasar.vercel.app"),
  openGraph: {
    title: "Shinas AR — AI Engineer & Automation Specialist",
    description:
      "Solo-shipping AI engineer building production systems with agentic tooling. Dubai.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-ink text-chrome antialiased">
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
