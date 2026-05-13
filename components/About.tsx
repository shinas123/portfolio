"use client";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const lines = [
  "I build production AI systems solo —",
  "trading platforms with broker integration,",
  "education platforms with cohort delivery,",
  "MCP servers that pipe Meta Ads & GA4 into Claude,",
  "and n8n automations that replace manual ops.",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-5 md:px-10 lg:px-14 py-28 md:py-44 max-w-screen-2xl mx-auto"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.7, ease }}
        className="text-xs tracking-[0.3em] uppercase text-white/40 mb-10"
      >
        ◇ About
      </motion.p>
      <div
        className="font-serif leading-[1.1] tracking-tight"
        style={{ fontSize: "clamp(1.75rem, 4.5vw, 4.5rem)" }}
      >
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-25%" }}
            transition={{ duration: 0.9, ease, delay: i * 0.08 }}
            className={i === 0 ? "text-white" : "text-white/55"}
          >
            {l}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.6 }}
        className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-sm"
      >
        {[
          { k: "Based", v: "Dubai, UAE" },
          { k: "Stack", v: "Next.js · Supabase · Python · n8n" },
          { k: "Building with", v: "Claude Code · Antigravity" },
          { k: "Open to", v: "AI Engineer · Automation roles" },
        ].map((s, i) => (
          <div key={i} className="border-t border-white/10 pt-4">
            <div className="text-[10px] tracking-[0.25em] uppercase text-white/40">
              {s.k}
            </div>
            <div className="mt-2 text-white/90">{s.v}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
