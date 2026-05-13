"use client";
import { motion } from "motion/react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between mix-blend-difference"
    >
      <a href="#top" className="font-serif text-xl tracking-tight text-white">
        Shinas<span className="italic">·</span>AR
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-white transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="text-sm text-white/90 border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
      >
        Get in touch
      </a>
    </motion.header>
  );
}
