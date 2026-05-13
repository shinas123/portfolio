"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { certifications, type Certification } from "@/data/certifications";
import { ClipReveal } from "@/components/ScrollReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Certifications() {
  return (
    <section
      id="certs"
      className="relative px-5 md:px-10 lg:px-14 py-24 md:py-36 max-w-screen-2xl mx-auto"
    >
      <div className="flex items-end justify-between mb-12 md:mb-16 gap-6">
        <div>
          <ClipReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              ◇ Verified
            </p>
          </ClipReveal>
          <ClipReveal delay={0.15}>
            <h2
              className="font-serif tracking-tight"
              style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
            >
              Certifications &amp; <em className="italic accent-grad">credentials.</em>
            </h2>
          </ClipReveal>
        </div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="hidden md:block text-xs tracking-[0.3em] uppercase text-white/30 whitespace-nowrap"
        >
          {certifications.length.toString().padStart(2, "0")} issued
        </motion.span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
        {certifications.map((c, i) => (
          <Card key={c.id} cert={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function Card({ cert, index }: { cert: Certification; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease, delay: (index % 5) * 0.07 }}
      className="group relative rounded-xl overflow-hidden border border-white/10 bg-carbon hover:border-white/30 transition-colors duration-500 flex flex-col"
    >
      {/* Cert image / placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        {cert.image ? (
          <>
            <Image
              src={cert.image}
              alt={`${cert.title} certificate`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 320px"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${cert.accent} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
            />
          </>
        ) : (
          <Placeholder cert={cert} />
        )}
      </div>

      {/* Card body */}
      <div className="p-5 md:p-6 flex flex-col flex-1 gap-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/45">
            {cert.issuer}
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/35 tabular-nums shrink-0">
            {cert.date}
          </span>
        </div>

        <h3 className="font-serif text-lg md:text-xl leading-tight tracking-tight text-white">
          {cert.title}
        </h3>

        {cert.details && (
          <p className="text-xs text-white/55 leading-snug">{cert.details}</p>
        )}

        <div className="mt-auto pt-3">
          {cert.verifyUrl ? (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
            >
              <span className="border-b border-white/30 hover:border-white">
                Verify
              </span>
              <span aria-hidden>↗</span>
            </a>
          ) : (
            <span className="text-xs text-white/30">
              On request
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Placeholder({ cert }: { cert: Certification }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${cert.accent} opacity-30`}
      />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative z-10 text-center px-4">
        <svg
          viewBox="0 0 24 24"
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/70 mx-auto mb-2"
          aria-hidden
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5" />
        </svg>
        <div className="font-serif italic text-white/80 text-sm md:text-base">
          {cert.issuer}
        </div>
      </div>
    </div>
  );
}
