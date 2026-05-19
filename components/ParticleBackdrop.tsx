"use client";
import { type RefObject } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";

const FinaleParticles = dynamic(() => import("@/components/FinaleParticles"), {
  ssr: false,
});

type Props = {
  containerRef: RefObject<HTMLDivElement | null>;
};

/**
 * Fixed-position WebGL particle backdrop driven by scroll through a target zone.
 * Particles morph: splash → globe → wave → sea wave.
 *
 * Canvas is always mounted (idle cost is low) — visibility is gated only by
 * the clamped opacity transform, which is reliable in both scroll directions.
 */
export default function ParticleBackdrop({ containerRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Clamped — opacity cannot exceed [0,1,1,0.7] regardless of scroll extrapolation
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.95, 1],
    [0, 1, 1, 0.7],
    { clamp: true }
  );

  // Morph only starts after fade-in completes
  const morphProgress = useTransform(scrollYProgress, [0.08, 1], [0, 1], {
    clamp: true,
  });

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <FinaleParticles progress={morphProgress} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.7) 95%)",
        }}
      />
    </motion.div>
  );
}
