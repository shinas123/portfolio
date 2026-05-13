"use client";
import { motion } from "motion/react";
import { ClipReveal, StaggerReveal, staggerChild } from "@/components/ScrollReveal";
import { currentlyBuilding } from "@/data/projects";

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
      <ClipReveal>
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-10">
          ◇ About
        </p>
      </ClipReveal>

      <StaggerReveal
        className="font-serif leading-[1.1] tracking-tight"
        stagger={0.1}
      >
        <div style={{ fontSize: "clamp(1.75rem, 4.5vw, 4.5rem)" }}>
          {lines.map((l, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              className={i === 0 ? "text-white" : "text-white/55"}
            >
              {l}
            </motion.div>
          ))}
        </div>
      </StaggerReveal>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease, delay: 0.4 }}
        className="mt-14 md:mt-16 max-w-3xl flex items-start gap-3 text-sm md:text-base text-white/65 leading-relaxed"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mt-2 md:mt-2.5 shrink-0" />
        <span>{currentlyBuilding}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.55 }}
        className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-sm"
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
