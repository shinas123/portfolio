"use client";
import { motion } from "motion/react";
import { projects, type Project } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  return (
    <section id="work" className="relative px-6 md:px-10 py-32 md:py-44 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-16 md:mb-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease }}
            className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6"
          >
            ◇ Selected work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl tracking-tight"
          >
            Things I&apos;ve <em className="italic accent-grad">shipped.</em>
          </motion.h2>
        </div>
        <span className="hidden md:block text-xs tracking-[0.3em] uppercase text-white/30">
          {projects.length.toString().padStart(2, "0")} projects
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((p, i) => (
          <Card key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function Card({ project, index }: { project: Project; index: number }) {
  const dim = project.status === "Archived";
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease, delay: (index % 2) * 0.1 }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-carbon p-7 md:p-9 transition-colors duration-500 hover:border-white/30"
    >
      {/* halo */}
      <div
        className={`pointer-events-none absolute -top-32 -right-32 w-[60%] h-[60%] rounded-full blur-3xl opacity-60 bg-gradient-to-br ${project.accent}`}
      />

      <div className="relative flex items-start justify-between mb-8">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          {project.index} / {project.year}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className={`relative font-serif text-3xl md:text-4xl tracking-tight ${dim ? "text-white/80" : "text-white"}`}>
        {project.title}
      </h3>
      <p className="relative mt-1 text-white/50 text-sm md:text-base">{project.subtitle}</p>

      <p className="relative mt-6 text-white/65 text-sm md:text-[15px] leading-relaxed">
        {project.description}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[11px] tracking-wide text-white/60 border border-white/10 rounded-full px-2.5 py-1"
          >
            {s}
          </span>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className="relative mt-8 flex flex-wrap gap-4">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
            >
              <span className="border-b border-white/30 group-hover/btn:border-white">
                {l.label}
              </span>
              <span className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const styles: Record<Project["status"], string> = {
    Live: "text-emerald-300/90 border-emerald-300/30 bg-emerald-300/5",
    "In launch": "text-amber-300/90 border-amber-300/30 bg-amber-300/5",
    Archived: "text-white/40 border-white/15 bg-white/5",
  };
  return (
    <span className={`text-[10px] tracking-[0.2em] uppercase border rounded-full px-2.5 py-1 ${styles[status]}`}>
      {status === "Live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle animate-pulse" />}
      {status}
    </span>
  );
}
