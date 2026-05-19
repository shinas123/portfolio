"use client";
import { useEffect } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";

/**
 * Chrome blob, rendered as a child of the Hero section's DOM.
 * Uses `absolute inset-0` so it lives inside Hero's bounding box and
 * scrolls away naturally with it — no fixed positioning, no scroll-driven
 * opacity tricks.
 *
 * Only motion is non-scroll:
 *   - idle liquid float (continuous bob/breathe/drift)
 *   - cursor-tracking 3D tilt
 *   - SVG displacement filter for morphing liquid edge
 *   - ambient lavender→blue halo pulse
 */
export default function HeroObject() {
  // Cursor-tracking 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltY = useSpring(useTransform(mouseX, [-1, 1], [-18, 18]), {
    stiffness: 60, damping: 18, mass: 0.6,
  });
  const tiltX = useSpring(useTransform(mouseY, [-1, 1], [12, -12]), {
    stiffness: 60, damping: 18, mass: 0.6,
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* SVG filter: black→transparent + continuous liquid-edge displacement */}
      <svg
        aria-hidden
        width="0"
        height="0"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter
            id="liquidMorph"
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves="2"
              seed="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.008 0.012; 0.014 0.018; 0.010 0.014; 0.008 0.012"
                dur="16s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      1 1 1 0 0"
              result="keyed"
            />
            <feComponentTransfer in="keyed" result="cleaned">
              <feFuncA type="linear" slope="1.4" intercept="-0.1" />
            </feComponentTransfer>
            <feDisplacementMap
              in="cleaned"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Absolute inside Hero — scrolls with Hero, vanishes when Hero leaves */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ perspective: 1400 }}
        aria-hidden
      >
        <div className="absolute top-[10vh] right-[2vw] md:right-[4vw] w-[min(70vw,620px)] aspect-[2/3]">
          <motion.div
            style={{
              rotateX: tiltX,
              rotateY: tiltY,
              transformStyle: "preserve-3d",
            }}
            className="w-full h-full"
          >
            <motion.div
              aria-hidden
              animate={{
                opacity: [0.55, 0.85, 0.55],
                scale: [0.9, 1.05, 0.9],
              }}
              transition={{
                duration: 9,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute inset-[10%] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(155,135,245,0.30), rgba(59,130,246,0.10) 55%, transparent 75%)",
              }}
            />

            <motion.div
              animate={{
                y: [0, -28, 4, -14, 0],
                x: [0, 10, -8, 6, 0],
                rotate: [0, 2.5, -2, 1.5, 0],
                scale: [1, 1.04, 0.98, 1.02, 1],
              }}
              transition={{
                duration: 14,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="relative w-full h-full"
            >
              <div
                className="absolute inset-0"
                style={{ filter: "url(#liquidMorph)", opacity: 0.9 }}
              >
                <Image
                  src="/hero-object-1.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 70vw, 620px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
