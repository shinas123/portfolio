"use client";
import { motion } from "motion/react";

const TOOLS = [
  "Claude Code",
  "Google Antigravity",
  "Claude API",
  "Model Context Protocol",
  "Next.js",
  "Supabase",
  "Vercel",
  "TypeScript",
  "Python",
  "n8n",
  "Three.js",
  "TradingView",
  "Stripe",
  "Mux",
  "Meta Marketing API",
  "Google Analytics 4",
  "HubSpot",
  "Tailwind CSS",
  "Framer Motion",
  "Shopify",
  "Razorpay",
  "WhatsApp Business API",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Stack() {
  // Duplicate to make the marquee loop seamless
  const row = [...TOOLS, ...TOOLS];

  return (
    <section id="stack" className="relative py-32 md:py-44 border-y border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.7, ease }}
        className="text-center mb-12"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-white/40">◇ Stack</p>
        <h2 className="mt-4 font-serif text-3xl md:text-5xl tracking-tight">
          Tools I <em className="italic accent-grad">reach for.</em>
        </h2>
      </motion.div>

      <div className="relative overflow-hidden mask-fade">
        <div className="flex w-max gap-8 animate-marquee">
          {row.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="text-2xl md:text-4xl font-serif italic text-white/60 hover:text-white transition-colors whitespace-nowrap"
            >
              {t} <span className="text-white/20 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .mask-fade {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 12%,
            #000 88%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 12%,
            #000 88%,
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
}
