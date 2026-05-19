"use client";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { ease } from "@/lib/motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Hire" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 140) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease }}
      className="fixed top-0 inset-x-0 z-50 px-5 md:px-10 lg:px-14 py-5 flex items-center justify-between mix-blend-difference"
    >
      <a href="#top" className="font-serif text-xl md:text-2xl tracking-tight text-white flex items-center gap-1.5">
        <span>Shinas</span>
        <span className="text-white/60">·</span>
        <span className="italic">AR</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-white transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2 md:gap-3">
        <a
          href="/Shinas_AR_Resume.pdf"
          download="Shinas_AR_Resume.pdf"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white px-3 py-2 transition-colors"
          aria-label="Download résumé"
        >
          CV
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
        <a
          href="#contact"
          className="text-sm text-white/90 border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
        >
          Get in touch
        </a>
      </div>
    </motion.header>
  );
}
