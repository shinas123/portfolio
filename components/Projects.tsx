"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Floating image position (relative to container)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.5 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section id="work" className="relative px-5 md:px-10 lg:px-14 py-28 md:py-44 max-w-screen-2xl mx-auto">
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
            className="font-serif tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 7vw, 7rem)" }}
          >
            Things I&apos;ve <em className="italic accent-grad">shipped.</em>
          </motion.h2>
        </div>
        <span className="hidden md:block text-xs tracking-[0.3em] uppercase text-white/30">
          {projects.length.toString().padStart(2, "0")} projects
        </span>
      </div>

      <div
        ref={containerRef}
        onMouseMove={onMove}
        className="relative"
      >
        {/* Floating preview image (desktop only) */}
        <AnimatePresence>
          {hovered !== null && projects[hovered].image && (
            <motion.div
              key={projects[hovered].id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease }}
              style={{
                x: sx,
                y: sy,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="pointer-events-none absolute z-30 w-[28vw] max-w-[420px] aspect-[16/10] rounded-lg overflow-hidden glow-border hidden md:block"
            >
              <Image
                src={projects[hovered].image as string}
                alt={projects[hovered].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 420px"
                priority={false}
              />
              <div className={`absolute inset-0 bg-gradient-to-tr ${projects[hovered].imageAccent} opacity-15`} />
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="divide-y divide-white/10 border-t border-b border-white/10">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.id}
              project={p}
              index={i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered((curr) => (curr === i ? null : curr))}
              active={hovered === i}
            />
          ))}
        </ul>
      </div>

      {/* Mobile: render expanded cards under the list */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:hidden">
        {projects.map((p) => (
          <MobileCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  onEnter,
  onLeave,
  active,
}: {
  project: Project;
  index: number;
  onEnter: () => void;
  onLeave: () => void;
  active: boolean;
}) {
  const dim = project.status === "Archived";
  const primary = project.links[0];

  const RowInner = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease, delay: (index % 3) * 0.06 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative py-6 md:py-9 flex items-center justify-between gap-6 cursor-pointer"
    >
      {/* hover slide bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
        className="absolute left-0 top-0 h-px bg-white/40 w-full origin-left"
      />

      <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
        <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40 tabular-nums">
          {project.index}
        </span>
        <div className="min-w-0">
          <motion.h3
            animate={{
              x: active ? 16 : 0,
              color: active ? "#FFFFFF" : dim ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.9)",
            }}
            transition={{ duration: 0.4, ease }}
            className="font-serif tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(1.75rem, 6vw, 6rem)" }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            animate={{ x: active ? 16 : 0 }}
            transition={{ duration: 0.4, ease }}
            className="mt-2 text-xs md:text-sm text-white/50"
          >
            {project.subtitle} <span className="text-white/30 mx-2">/</span> {project.year}
          </motion.p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6 shrink-0">
        <StatusBadge status={project.status} />
        <motion.span
          animate={{ x: active ? 0 : 8, opacity: active ? 1 : 0.4 }}
          transition={{ duration: 0.4, ease }}
          className="text-2xl md:text-4xl text-white/80"
        >
          ↗
        </motion.span>
      </div>
    </motion.div>
  );

  return (
    <li>
      {primary ? (
        <a href={primary.href} target="_blank" rel="noreferrer" aria-label={project.title} className="block">
          {RowInner}
        </a>
      ) : (
        <div>{RowInner}</div>
      )}
    </li>
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
      {status === "Live" && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle animate-pulse" />
      )}
      {status}
    </span>
  );
}

function MobileCard({ project }: { project: Project }) {
  return (
    <article className="relative rounded-xl border border-white/10 bg-carbon p-6 overflow-hidden">
      <div
        className={`pointer-events-none absolute -top-20 -right-20 w-[50%] h-[50%] rounded-full blur-3xl opacity-50 bg-gradient-to-br ${project.accent}`}
      />
      <div className="relative flex items-center justify-between mb-4">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          {project.index} / {project.year}
        </span>
        <StatusBadge status={project.status} />
      </div>
      <h3 className="relative font-serif text-2xl text-white">{project.title}</h3>
      <p className="relative mt-1 text-white/50 text-sm">{project.subtitle}</p>
      <p className="relative mt-4 text-white/65 text-sm leading-relaxed">{project.description}</p>
      <div className="relative mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="text-[10px] text-white/60 border border-white/10 rounded-full px-2 py-0.5">
            {s}
          </span>
        ))}
      </div>
      {project.links.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-4">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/90 border-b border-white/30"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
