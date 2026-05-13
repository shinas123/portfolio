"use client";
import { motion } from "motion/react";
import Magnetic from "@/components/Magnetic";
import { ClipReveal } from "@/components/ScrollReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-5 md:px-10 lg:px-14 pt-28 md:pt-44 pb-10 max-w-screen-2xl mx-auto min-h-[90svh] flex flex-col justify-between overflow-hidden"
    >
      <div>
        <ClipReveal>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">
            ◇ Contact
          </p>
        </ClipReveal>

        <ClipReveal delay={0.15} duration={1.3}>
          <h2
            className="font-serif leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 9vw, 10rem)" }}
          >
            Got a <em className="italic accent-grad">project?</em>
            <br />
            Let&apos;s build it.
          </h2>
        </ClipReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="mt-12 md:mt-20"
        >
          <Magnetic strength={0.2}>
            <a
              href="mailto:shinasar123@gmail.com"
              className="group inline-flex items-center gap-3 md:gap-4 font-serif text-white"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
            >
              <span className="relative break-all md:break-normal">
                shinasar123@gmail.com
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-white/30 origin-left transition-transform duration-500 group-hover:scale-x-0" />
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 shrink-0">↗</span>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm"
        >
          {[
            { k: "Résumé", v: "Download PDF ↓", href: "/Shinas_AR_Resume.pdf", download: true },
            { k: "LinkedIn", v: "linkedin.com/in/shinas-ar", href: "https://linkedin.com/in/shinas-ar" },
            { k: "GitHub", v: "github.com/shinas123", href: "https://github.com/shinas123" },
            { k: "Phone", v: "+971 526 581 900", href: "tel:+971526581900" },
            { k: "Based", v: "Dubai, UAE", href: null },
          ].map((s, i) => (
            <div key={i} className="border-t border-white/10 pt-4">
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/40">{s.k}</div>
              {s.href ? (
                <a
                  href={s.href}
                  target={s.download ? undefined : "_blank"}
                  rel="noreferrer"
                  download={s.download ? "Shinas_AR_Resume.pdf" : undefined}
                  className="mt-2 block text-white/90 hover:text-white transition-colors break-all md:break-normal"
                >
                  {s.v}
                </a>
              ) : (
                <div className="mt-2 text-white/90">{s.v}</div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Giant footer wordmark */}
      <div className="relative mt-28 md:mt-40 select-none">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease }}
          className="font-serif leading-[0.85] tracking-[-0.02em] text-grad whitespace-nowrap"
          style={{ fontSize: "clamp(4rem, 20vw, 32rem)" }}
        >
          shinas<span className="italic accent-grad">·</span>ar
        </motion.div>
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Shinas AR. Built with Next.js + Motion. Shipped via Claude Code.</div>
          <a href="#top" className="hover:text-white transition-colors">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
