"use client";
import { motion } from "motion/react";
import Magnetic from "@/components/Magnetic";

const NAME = "SHINAS AR";
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center px-5 md:px-10 lg:px-14 overflow-hidden grid-bg noise"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Right-side vertical annotation (desktop only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-10 xl:right-14 flex-col items-end gap-3 text-[10px] tracking-[0.35em] uppercase text-white/40"
        style={{ writingMode: "vertical-rl" }}
      >
        <span>Portfolio</span>
        <span className="w-px h-12 bg-white/20" />
        <span>v3 · 2026</span>
        <span className="w-px h-12 bg-white/20" />
        <span>Dubai · UAE</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 1.4 }}
        className="relative text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/50 mb-8 md:mb-12 flex items-center gap-3"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Available for AI Engineer roles · Dubai, UAE · 2026
      </motion.p>

      <h1
        className="relative font-serif font-normal leading-[0.85] tracking-[-0.02em] whitespace-nowrap"
        style={{ fontSize: "clamp(3.25rem, 17vw, 28rem)" }}
      >
        {NAME.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 1.3 + i * 0.05 }}
              className="inline-block text-grad animate-shine"
            >
              {char === " " ? " " : char}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 2.2 }}
        className="relative mt-10 md:mt-14 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed"
      >
        <span className="text-white">AI Engineer & Automation Specialist.</span> I ship
        production systems with{" "}
        <em className="font-serif italic text-white/95">agentic AI tooling</em> —
        trading platforms, education platforms, MCP servers, and the marketing automation
        that runs in the background.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 2.4 }}
        className="relative mt-10 md:mt-14 flex flex-wrap items-center gap-4"
      >
        <Magnetic>
          <a
            href="#work"
            className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-black text-sm font-medium overflow-hidden"
          >
            <span className="relative z-10">See the work</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/20 text-sm text-white/85 hover:border-white hover:text-white transition-all"
          >
            Get in touch <span aria-hidden>↗</span>
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3 }}
        className="absolute bottom-8 left-5 md:left-10 lg:left-14 text-[10px] tracking-[0.35em] uppercase text-white/40 flex items-center gap-3"
      >
        <span className="w-10 h-px bg-white/30" /> Scroll
      </motion.div>
    </section>
  );
}
