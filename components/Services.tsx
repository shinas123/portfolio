"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Magnetic from "@/components/Magnetic";
import { ClipReveal, StaggerReveal, staggerChild } from "@/components/ScrollReveal";
import { ease } from "@/lib/motion";

type Capability = {
  k: string;
  title: string;
  body: string;
};

const capabilities: Capability[] = [
  {
    k: "01",
    title: "Scroll as the interface",
    body: "Lenis-smoothed scroll, layered parallax, and clip-path reveals that make every section feel deliberate — not stitched together.",
  },
  {
    k: "02",
    title: "3D scenes that earn the weight",
    body: "Three.js / R3F for hero moments, product objects, or background atmospheres. Optimised so it loads, not just looks.",
  },
  {
    k: "03",
    title: "Motion that means something",
    body: "Micro-interactions, magnetic cursors, and reveal choreography tuned per-section. Not a template — a system built around your brand.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative px-5 md:px-10 lg:px-14 py-28 md:py-44 max-w-screen-2xl mx-auto overflow-hidden"
    >
      {/* Parallax accent layer */}
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-x-0 -inset-y-32 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px] rounded-full blur-3xl opacity-[0.08] bg-[radial-gradient(closest-side,#9b87f5,transparent_70%)]" />
      </motion.div>

      <div className="flex items-end justify-between mb-12 md:mb-20">
        <div>
          <ClipReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              ◇ Services
            </p>
          </ClipReveal>
          <motion.div style={{ y: headlineY }}>
            <ClipReveal delay={0.15} duration={1.3}>
              <h2
                className="font-serif tracking-tight leading-[0.95]"
                style={{ fontSize: "clamp(2.25rem, 7vw, 7rem)" }}
              >
                I also build the kind of website{" "}
                <em className="italic accent-grad">you&apos;re scrolling through.</em>
              </h2>
            </ClipReveal>
          </motion.div>
        </div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="hidden md:block text-xs tracking-[0.3em] uppercase text-white/30 shrink-0 ml-8"
        >
          By inquiry · {new Date().getFullYear()}
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="max-w-2xl text-white/70 text-base md:text-lg leading-relaxed mb-16 md:mb-24"
      >
        Parallax and 3D motion websites — that&apos;s the only kind of site I take on.
        If you want a marketing site, a launch page, or a portfolio that moves like
        this one, I&apos;ll design and ship it end-to-end. Built in Next.js, animated with
        Motion, smoothed with Lenis, and 3D where it earns it.
      </motion.div>

      <motion.div style={{ y: cardsY }}>
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border-y border-white/10">
          {capabilities.map((c) => (
            <motion.div
              key={c.k}
              variants={staggerChild}
              className="bg-black p-8 md:p-10 flex flex-col gap-6 min-h-[280px] group"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 tabular-nums">
                  {c.k}
                </span>
                <span className="text-white/20 group-hover:text-white/60 transition-colors duration-500">
                  ◇
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight text-white/95">
                {c.title}
              </h3>
              <p className="text-sm md:text-base text-white/55 leading-relaxed mt-auto">
                {c.body}
              </p>
            </motion.div>
          ))}
        </StaggerReveal>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease, delay: 0.3 }}
        className="mt-20 md:mt-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
      >
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
            ◇ Proof
          </p>
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            The selected work above is the brief. If something there feels like the
            site you want — or you want to push it further — start a project.
          </p>
        </div>

        <Magnetic strength={0.25}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 md:gap-5 rounded-full border border-white/25 hover:border-white/70 transition-colors duration-500 pl-7 md:pl-9 pr-3 md:pr-4 py-3 md:py-4"
          >
            <span
              className="font-serif text-white"
              style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}
            >
              Start a project
            </span>
            <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-[-45deg]">
              →
            </span>
          </a>
        </Magnetic>
      </motion.div>
    </section>
  );
}
