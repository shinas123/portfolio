"use client";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 md:px-10 py-32 md:py-44 max-w-7xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease }}
        className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8"
      >
        ◇ Contact
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="font-serif text-5xl md:text-8xl leading-[0.95] tracking-tight"
      >
        Got a project? <br />
        <em className="italic accent-grad">Let&apos;s build it.</em>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease, delay: 0.25 }}
        className="mt-12 md:mt-16"
      >
        <a
          href="mailto:shinasar123@gmail.com"
          className="font-serif text-2xl md:text-4xl text-white hover:text-white/70 transition-colors"
        >
          shinasar123@gmail.com →
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.4 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm"
      >
        {[
          { k: "LinkedIn", v: "linkedin.com/in/shinas-ar", href: "https://linkedin.com/in/shinas-ar" },
          { k: "GitHub", v: "github.com/shinas123", href: "https://github.com/shinas123" },
          { k: "Phone", v: "+971 526 581 900", href: "tel:+971526581900" },
          { k: "Based", v: "Dubai, UAE", href: null },
        ].map((s, i) => (
          <div key={i} className="border-t border-white/10 pt-4">
            <div className="text-[10px] tracking-[0.25em] uppercase text-white/40">{s.k}</div>
            {s.href ? (
              <a href={s.href} target="_blank" rel="noreferrer" className="mt-2 block text-white/90 hover:text-white transition-colors">
                {s.v}
              </a>
            ) : (
              <div className="mt-2 text-white/90">{s.v}</div>
            )}
          </div>
        ))}
      </motion.div>

      <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/40">
        <div>© {new Date().getFullYear()} Shinas AR. Built with Next.js + Motion. Shipped via Claude Code.</div>
        <a href="#top" className="hover:text-white transition-colors">Back to top ↑</a>
      </div>
    </section>
  );
}
