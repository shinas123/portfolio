"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ClipReveal } from "@/components/ScrollReveal";
import ArticleProgress from "@/components/ArticleProgress";
import AnimatedNumber from "@/components/AnimatedNumber";
import { projects, type Project } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CaseStudy({ project }: { project: Project }) {
  const otherProjects = projects
    .filter((p) => p.slug !== project.slug && p.era === "current")
    .slice(0, 3);
  const articleRef = useRef<HTMLElement>(null);

  return (
    <main ref={articleRef} className="relative min-h-screen">
      <ArticleProgress target={articleRef} />
      {/* Tiny top nav — back link */}
      <div className="fixed top-0 inset-x-0 z-40 px-5 md:px-10 lg:px-14 py-5 flex items-center justify-between mix-blend-difference">
        <Link
          href="/#work"
          className="group flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Back to work</span>
        </Link>
        <Link
          href="/"
          className="font-serif text-lg md:text-xl tracking-tight text-white"
        >
          Shinas <span className="text-white/60">·</span>{" "}
          <span className="italic">AR</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="relative px-5 md:px-10 lg:px-14 pt-32 md:pt-44 pb-14 md:pb-24 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="absolute inset-0 pointer-events-none grid-bg opacity-60" />
        <div className="absolute -top-40 -right-40 w-[55vw] h-[55vw] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="relative text-xs tracking-[0.3em] uppercase text-white/40 mb-6"
        >
          ◇ Case study / {project.index} · {project.year}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease, delay: 0.2 }}
          className="relative font-serif tracking-tight leading-[0.95]"
          style={{ fontSize: "clamp(2.5rem, 9vw, 9rem)" }}
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.35 }}
          className="relative mt-4 md:mt-6 text-base md:text-xl text-white/65 max-w-3xl"
        >
          {project.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="relative mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl"
        >
          {[
            { k: "Role", v: project.caseStudy.role },
            { k: "Duration", v: project.caseStudy.duration },
            { k: "Status", v: project.status },
            { k: "Stack", v: project.stack.slice(0, 4).join(" · ") },
          ].map((m) => (
            <div key={m.k} className="border-t border-white/10 pt-3">
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/40">
                {m.k}
              </div>
              <div className="mt-2 text-sm text-white/85">{m.v}</div>
            </div>
          ))}
        </motion.div>

        {project.links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.65 }}
            className="relative mt-10 md:mt-14 flex flex-wrap gap-4"
          >
            {project.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={
                  i === 0
                    ? "group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black text-sm font-medium"
                    : "inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-sm text-white/85 hover:border-white hover:text-white transition-all"
                }
              >
                {l.label}
                <span aria-hidden>↗</span>
              </a>
            ))}
          </motion.div>
        )}
      </section>

      {/* Hero image — clip-path wipe-on from center for premium reveal */}
      {project.image && (
        <motion.section
          initial={{ clipPath: "inset(0% 50% 0% 50%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease }}
          className="relative px-5 md:px-10 lg:px-14 mb-16 md:mb-24 max-w-screen-2xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden glow-border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1536px) 100vw, 1500px"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${project.imageAccent} opacity-10`}
            />
          </div>
        </motion.section>
      )}

      {/* Problem */}
      <Section eyebrow="◇ The problem" title="What we were trying to solve">
        <p className="font-serif text-2xl md:text-4xl leading-[1.2] tracking-tight text-white/85">
          {project.caseStudy.problem}
        </p>
      </Section>

      {/* Solution */}
      <Section eyebrow="◇ The solution" title="How it shipped">
        <p className="text-base md:text-lg leading-[1.7] text-white/70 max-w-4xl">
          {project.caseStudy.solution}
        </p>
      </Section>

      {/* Decisions */}
      <Section eyebrow="◇ Decisions" title="Engineering choices worth flagging">
        <div className="space-y-10 md:space-y-12 max-w-5xl">
          {project.caseStudy.decisions.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease, delay: i * 0.08 }}
              className="grid md:grid-cols-[14ch_1fr] gap-3 md:gap-12 items-baseline border-t border-white/10 pt-6 md:pt-8"
            >
              <div className="text-xs tracking-[0.25em] uppercase text-white/40 tabular-nums">
                {String(i + 1).padStart(2, "0")} · Decision
              </div>
              <div>
                <h4
                  className="font-serif leading-tight tracking-tight text-white"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)" }}
                >
                  {d.label}
                </h4>
                <p className="mt-3 text-base md:text-lg leading-[1.7] text-white/65 max-w-3xl">
                  {d.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Results */}
      <Section eyebrow="◇ Results" title="What shipped">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {project.caseStudy.results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease, delay: i * 0.07 }}
              className="border-t border-white/10 pt-5"
            >
              <div
                className="font-serif leading-[0.95] tracking-tight accent-grad block"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
              >
                <AnimatedNumber value={r.value} />
              </div>
              <div className="mt-3 text-sm text-white/70">{r.label}</div>
              {r.sub && (
                <div className="mt-1 text-xs text-white/40">{r.sub}</div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stack chips */}
      <Section eyebrow="◇ Stack" title="Tools used">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-sm text-white/75 border border-white/15 rounded-full px-4 py-2"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* Other work */}
      <section className="relative px-5 md:px-10 lg:px-14 py-24 md:py-36 max-w-screen-2xl mx-auto border-t border-white/10">
        <ClipReveal>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            ◇ Keep exploring
          </p>
        </ClipReveal>
        <ClipReveal delay={0.1}>
          <h2
            className="font-serif tracking-tight mb-10 md:mb-14"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Other <em className="italic accent-grad">case studies.</em>
          </h2>
        </ClipReveal>
        <ul className="divide-y divide-white/10 border-t border-b border-white/10">
          {otherProjects.map((p, i) => (
            <li key={p.id}>
              <Link
                href={`/work/${p.slug}`}
                className="group flex items-center justify-between gap-6 py-5 md:py-7"
              >
                <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
                  <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40 tabular-nums">
                    {p.index}
                  </span>
                  <div>
                    <div
                      className="font-serif tracking-tight leading-[1] text-white/85 group-hover:text-white transition-colors"
                      style={{ fontSize: "clamp(1.25rem, 3.5vw, 2.5rem)" }}
                    >
                      {p.title}
                    </div>
                    <div className="text-xs md:text-sm text-white/50 mt-1">
                      {p.subtitle}
                    </div>
                  </div>
                </div>
                <span className="text-xl md:text-3xl text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 md:mt-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <span>←</span> All projects
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black text-sm font-medium self-start md:self-auto"
          >
            Get in touch <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative px-5 md:px-10 lg:px-14 py-16 md:py-28 max-w-screen-2xl mx-auto">
      <ClipReveal>
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
          {eyebrow}
        </p>
      </ClipReveal>
      <ClipReveal delay={0.1}>
        <h2
          className="font-serif tracking-tight mb-10 md:mb-14"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)" }}
        >
          {title}
        </h2>
      </ClipReveal>
      <div>{children}</div>
    </section>
  );
}
