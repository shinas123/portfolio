"use client";
import { motion } from "motion/react";
import { headlineMetrics } from "@/data/projects";
import { ClipReveal } from "@/components/ScrollReveal";
import AnimatedNumber from "@/components/AnimatedNumber";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Metrics() {
  return (
    <section
      aria-label="Key metrics"
      className="relative px-5 md:px-10 lg:px-14 py-20 md:py-32 max-w-screen-2xl mx-auto"
    >
      <ClipReveal>
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-10 md:mb-14">
          ◇ By the numbers
        </p>
      </ClipReveal>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6 md:gap-x-8 border-t border-white/10 pt-10 md:pt-14">
        {headlineMetrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.9, ease, delay: i * 0.07 }}
            className="flex flex-col"
          >
            <span
              className="font-serif leading-[0.95] tracking-tight accent-grad block"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
            >
              <AnimatedNumber value={m.value} />
            </span>
            <span className="mt-3 text-xs md:text-sm text-white/55 leading-snug max-w-[18ch]">
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
