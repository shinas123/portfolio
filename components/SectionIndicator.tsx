"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const sections = [
  { id: "top", label: "Hero" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function SectionIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) {
            best = e;
          }
        }
        if (best) {
          const idx = sections.findIndex((s) => s.id === best!.target.id);
          if (idx !== -1) setActive(idx);
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Hide on Hero (it has its own right-side annotation)
  const visible = active > 0;

  return (
    <motion.nav
      aria-label="Section navigation"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="hidden md:flex fixed left-5 lg:left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 text-[10px] tracking-[0.3em] uppercase mix-blend-difference"
    >
      {sections.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center gap-3"
          aria-current={i === active ? "true" : undefined}
        >
          <motion.span
            initial={false}
            animate={{
              width: i === active ? 32 : 12,
              backgroundColor: i === active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-px"
          />
          <motion.span
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
              x: i === active ? 0 : -6,
            }}
            transition={{ duration: 0.3 }}
            className="text-white whitespace-nowrap"
          >
            {String(i + 1).padStart(2, "0")} · {s.label}
          </motion.span>
        </a>
      ))}
    </motion.nav>
  );
}
