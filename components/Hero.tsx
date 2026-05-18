"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import Magnetic from "@/components/Magnetic";
import Starfield from "@/components/Starfield";

const NAME = "SHINAS AR";
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked exit: as the hero leaves the viewport, scale/blur/fade.
  // Starts at the top of the hero, completes by the time you've scrolled
  // one viewport height.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroBlurValue = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const heroFilter = useMotionTemplate`blur(${heroBlurValue}px)`;
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  // Spotlight: raw pixel position of mouse inside the hero
  const spotX = useMotionValue(-500);
  const spotY = useMotionValue(-500);
  const sSpotX = useSpring(spotX, { stiffness: 60, damping: 20, mass: 0.5 });
  const sSpotY = useSpring(spotY, { stiffness: 60, damping: 20, mass: 0.5 });
  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${sSpotX}px ${sSpotY}px, rgba(139,92,246,0.18), rgba(59,130,246,0.06) 30%, transparent 55%)`;

  // Parallax: content shifts gently opposite to cursor direction
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const sPX = useSpring(parallaxX, { stiffness: 50, damping: 22, mass: 0.6 });
  const sPY = useSpring(parallaxY, { stiffness: 50, damping: 22, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotX.set(x);
    spotY.set(y);
    // Subtle parallax: ±15 px on x, ±10 px on y (inverse so content "fights" the cursor)
    parallaxX.set(-((x / rect.width) - 0.5) * 30);
    parallaxY.set(-((y / rect.height) - 0.5) * 20);
  };

  const onLeave = () => {
    parallaxX.set(0);
    parallaxY.set(0);
    spotX.set(-500);
    spotY.set(-500);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-[100svh] px-5 md:px-10 lg:px-14 overflow-hidden grid-bg noise"
    >
      {/* Scroll-linked exit wrapper — everything inside fades/blurs/scales as we leave the hero */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          filter: heroFilter,
          y: heroY,
        }}
        className="absolute inset-0 flex flex-col justify-center px-5 md:px-10 lg:px-14 will-change-transform"
      >
      {/* Cursor-tracked spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: spotlight }}
      />

      {/* Starfield (right half of hero, desktop+) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.6 }}
        aria-hidden
        className="hidden md:block absolute inset-y-0 right-0 w-[55%] z-0 starfield-fade"
      >
        <Starfield density={1.1} />
      </motion.div>

      {/* Static ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[60vw] h-[60vw] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Right-side vertical annotation (desktop only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-10 xl:right-14 z-10 flex-col items-end gap-3 text-[10px] tracking-[0.35em] uppercase text-white/40"
        style={{ writingMode: "vertical-rl" }}
      >
        <span>Portfolio</span>
        <span className="w-px h-12 bg-white/20" />
        <span>v3 · 2026</span>
        <span className="w-px h-12 bg-white/20" />
        <span>Dubai · UAE</span>
      </motion.div>

      {/* Parallax-shifted content */}
      <motion.div
        className="relative z-10 will-change-transform"
        style={{ x: sPX, y: sPY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.4 }}
          className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/50 mb-8 md:mb-12 flex items-center gap-3"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for AI Engineer roles · Dubai, UAE · 2026
        </motion.p>

        <h1
          className="font-serif font-normal leading-[0.85] tracking-[-0.02em] whitespace-nowrap"
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
                whileHover={{
                  scale: 1.12,
                  rotate: [-1, 1, 0][i % 3],
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                className="inline-block text-grad animate-shine cursor-default origin-bottom"
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
          className="mt-10 md:mt-14 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed"
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
          className="mt-10 md:mt-14 flex flex-wrap items-center gap-4"
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
          <Magnetic>
            <a
              href="/Shinas_AR_Resume.pdf"
              download="Shinas_AR_Resume.pdf"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/20 text-sm text-white/85 hover:border-white hover:text-white transition-all"
            >
              <span>Download CV</span>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="transition-transform group-hover:translate-y-0.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3 }}
        className="absolute bottom-8 left-5 md:left-10 lg:left-14 z-10 text-[10px] tracking-[0.35em] uppercase text-white/40 flex items-center gap-3"
      >
        <span className="w-10 h-px bg-white/30" /> Scroll
      </motion.div>
      </motion.div>
    </section>
  );
}
