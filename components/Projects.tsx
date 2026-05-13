"use client";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  currentProjects,
  earlierProjects,
  type Project,
} from "@/data/projects";
import { ClipReveal } from "@/components/ScrollReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  return (
    <section
      id="work"
      className="relative px-5 md:px-10 lg:px-14 py-28 md:py-44 max-w-screen-2xl mx-auto"
    >
      <div className="flex items-end justify-between mb-12 md:mb-20">
        <div>
          <ClipReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              ◇ Selected work
            </p>
          </ClipReveal>
          <ClipReveal delay={0.15}>
            <h2
              className="font-serif tracking-tight"
              style={{ fontSize: "clamp(2.25rem, 7vw, 7rem)" }}
            >
              Things I&apos;ve <em className="italic accent-grad">shipped.</em>
            </h2>
          </ClipReveal>
        </div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="hidden md:block text-xs tracking-[0.3em] uppercase text-white/30"
        >
          {currentProjects.length.toString().padStart(2, "0")} projects · 2026
        </motion.span>
      </div>

      <ProjectList projects={currentProjects} />

      {earlierProjects.length > 0 && (
        <div className="mt-28 md:mt-36">
          <ClipReveal>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
              ◇ Earlier work
            </p>
          </ClipReveal>
          <ClipReveal delay={0.1}>
            <h3
              className="font-serif tracking-tight text-white/85 mb-10 md:mb-14"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)" }}
            >
              Before the AI engineering era —{" "}
              <em className="italic text-white/60">
                e-commerce, dropshipping, and freelance design.
              </em>
            </h3>
          </ClipReveal>
          <ProjectList projects={earlierProjects} dim />
        </div>
      )}
    </section>
  );
}

function ProjectList({ projects, dim = false }: { projects: Project[]; dim?: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const previewIdx = hovered !== null && projects[hovered]?.image ? hovered : null;

  return (
    <div ref={containerRef} onMouseMove={onMove} className="relative">
      <AnimatePresence>
        {previewIdx !== null && (
          <motion.div
            key={projects[previewIdx].id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease }}
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
            className="pointer-events-none absolute z-30 w-[28vw] max-w-[420px] aspect-[16/10] rounded-lg overflow-hidden glow-border hidden md:block"
          >
            <Image
              src={projects[previewIdx].image as string}
              alt={projects[previewIdx].title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0px, 420px"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${projects[previewIdx].imageAccent} opacity-15`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="divide-y divide-white/10 border-t border-b border-white/10">
        {projects.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            dim={dim}
            onEnter={() => setHovered(i)}
            onLeave={() => setHovered((curr) => (curr === i ? null : curr))}
            active={hovered === i}
          />
        ))}
      </ul>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  dim,
  onEnter,
  onLeave,
  active,
}: {
  project: Project;
  index: number;
  dim: boolean;
  onEnter: () => void;
  onLeave: () => void;
  active: boolean;
}) {
  const isMuted = dim || project.status === "Archived";

  return (
    <li>
      <Link href={`/work/${project.slug}`} aria-label={`${project.title} case study`} className="block">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease, delay: (index % 3) * 0.06 }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="group relative py-6 md:py-8 flex items-center justify-between gap-6 cursor-pointer"
        >
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
                  color: active
                    ? "#FFFFFF"
                    : isMuted
                    ? "rgba(255,255,255,0.6)"
                    : "rgba(255,255,255,0.9)",
                }}
                transition={{ duration: 0.4, ease }}
                className="font-serif tracking-tight leading-[0.95]"
                style={{ fontSize: dim ? "clamp(1.5rem, 4.5vw, 4rem)" : "clamp(1.75rem, 6vw, 6rem)" }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                animate={{ x: active ? 16 : 0 }}
                transition={{ duration: 0.4, ease }}
                className="mt-2 text-xs md:text-sm text-white/50"
              >
                {project.subtitle} <span className="text-white/30 mx-2">/</span>{" "}
                {project.year}
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
              →
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </li>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const styles: Record<Project["status"], string> = {
    Live: "text-emerald-300/90 border-emerald-300/30 bg-emerald-300/5",
    "In launch": "text-amber-300/90 border-amber-300/30 bg-amber-300/5",
    Internal: "text-sky-300/90 border-sky-300/30 bg-sky-300/5",
    Archived: "text-white/40 border-white/15 bg-white/5",
  };
  return (
    <span
      className={`text-[10px] tracking-[0.2em] uppercase border rounded-full px-2.5 py-1 ${styles[status]}`}
    >
      {status === "Live" && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle animate-pulse" />
      )}
      {status}
    </span>
  );
}
