"use client";
import { motion } from "motion/react";
import { ClipReveal } from "@/components/ScrollReveal";

const ROW_1 = [
  "Claude Code",
  "Antigravity",
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
];

const ROW_2 = [
  "Stripe",
  "Mux",
  "Meta Marketing API",
  "Google Analytics 4",
  "HubSpot",
  "Tailwind CSS",
  "Motion",
  "Shopify",
  "Razorpay",
  "WhatsApp Business API",
  "Webhooks",
  "Postgres",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Stack() {
  return (
    <section id="stack" className="relative py-28 md:py-40 border-y border-white/10 overflow-hidden">
      <div className="text-center mb-14 md:mb-20 px-6">
        <ClipReveal>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40">◇ Stack</p>
        </ClipReveal>
        <ClipReveal delay={0.15}>
          <h2
            className="mt-4 font-serif tracking-tight"
            style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
          >
            Tools I <em className="italic accent-grad">reach for.</em>
          </h2>
        </ClipReveal>
      </div>

      <div className="space-y-8 md:space-y-12">
        <Row items={ROW_1} direction="left" speed="38s" />
        <Row items={ROW_2} direction="right" speed="46s" italic />
      </div>
    </section>
  );
}

function Row({
  items,
  direction,
  speed,
  italic,
}: {
  items: string[];
  direction: "left" | "right";
  speed: string;
  italic?: boolean;
}) {
  const row = [...items, ...items];
  const animClass = direction === "left" ? "animate-[marquee_var(--d)_linear_infinite]" : "animate-[marquee-rev_var(--d)_linear_infinite]";
  return (
    <div className="relative overflow-hidden mask-fade">
      <div
        className={`flex w-max gap-10 md:gap-14 ${animClass}`}
        style={{ ["--d" as never]: speed }}
      >
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className={`font-serif ${italic ? "italic" : ""} text-white/70 whitespace-nowrap`}
            style={{ fontSize: "clamp(1.75rem, 5vw, 5rem)" }}
          >
            {t}
            <span className="text-white/15 mx-4 md:mx-6">◇</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        .mask-fade {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 10%,
            #000 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 10%,
            #000 90%,
            transparent 100%
          );
        }
        @keyframes marquee-rev {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
