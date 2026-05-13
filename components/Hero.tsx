"use client";
import { motion } from "motion/react";

const NAME = "SHINAS AR";
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-10 overflow-hidden grid-bg noise"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[55vw] h-[55vw] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[55vw] h-[55vw] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.4 }}
        className="relative text-xs md:text-sm tracking-[0.3em] uppercase text-white/50 mb-6 md:mb-10"
      >
        ◆ Dubai, UAE · Available for AI engineer roles · 2026
      </motion.p>

      <h1 className="relative font-serif font-normal leading-[0.85] tracking-[-0.02em] text-[14vw] md:text-[12vw] lg:text-[11vw]">
        {NAME.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.0, ease, delay: 0.3 + i * 0.04 }}
            className="inline-block text-grad animate-shine"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.2 }}
        className="relative mt-8 md:mt-12 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed"
      >
        <span className="text-white">AI Engineer & Automation Specialist.</span>{" "}
        I ship production systems with{" "}
        <em className="font-serif italic text-white/90">agentic AI tooling</em> —
        trading platforms, education platforms, MCP servers, and the marketing
        automation that runs in the background.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.4 }}
        className="relative mt-10 md:mt-14 flex flex-wrap items-center gap-4"
      >
        <a
          href="#work"
          className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black text-sm font-medium overflow-hidden"
        >
          <span className="relative z-10">See the work</span>
          <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
        </a>
        <a
          href="https://github.com/shinas123"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 text-sm text-white/80 hover:border-white hover:text-white transition-all"
        >
          GitHub <span aria-hidden>↗</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-8 right-6 md:right-10 text-[10px] tracking-[0.3em] uppercase text-white/40 flex items-center gap-3 rotate-90 origin-bottom-right md:rotate-0 md:origin-center"
      >
        <span className="w-10 h-px bg-white/30" /> Scroll
      </motion.div>
    </section>
  );
}
