"use client";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

// 8 sections: Hero, About, Metrics, Projects, Services, Stack, Certifications, Contact
const STOPS = [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1] as const;

export default function HeroObject() {
  const { scrollYProgress } = useScroll();

  // Spring-smoothed progress so transforms feel buttery, not 1:1 with scroll
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.5,
  });

  // Position / scale / rotation per section
  const x = useTransform(smooth, [...STOPS], [
    "18vw",   // Hero — right side, dominant
    "24vw",   // About — drifts further right
    "-6vw",   // Metrics — pulls toward center-left
    "32vw",   // Projects — pushed mostly off-screen right, behind
    "-18vw",  // Services — swings to left of center
    "6vw",    // Stack — center-right
    "-22vw",  // Certifications — left side
    "0vw",    // Contact — dead center
  ]);

  const y = useTransform(smooth, [...STOPS], [
    "0vh", "12vh", "30vh", "5vh", "22vh", "40vh", "10vh", "15vh",
  ]);

  const scale = useTransform(smooth, [...STOPS], [
    1.1, 0.9, 1.0, 0.5, 1.15, 0.8, 0.7, 1.35,
  ]);

  const rotate = useTransform(smooth, [...STOPS], [
    -8, 12, 45, -25, 90, 180, 220, 350,
  ]);

  // Crossfade between the three blob assets
  // Blob 1: full through Hero+About, fades during Metrics
  const opacity1 = useTransform(smooth, [0, 0.22, 0.34], [0.85, 0.85, 0]);
  // Blob 2: fades in through Metrics, dominant through Projects+Services, out during Stack
  const opacity2 = useTransform(smooth, [0.22, 0.34, 0.6, 0.72], [0, 0.85, 0.85, 0]);
  // Blob 3: fades in during Stack, dominant through Certs+Contact
  const opacity3 = useTransform(smooth, [0.6, 0.72, 1], [0, 0.85, 0.85]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        style={{ x, y, scale, rotate }}
        className="absolute top-[8vh] left-1/2 -translate-x-1/2 w-[min(75vw,720px)] aspect-[2/3] will-change-transform"
      >
        <motion.div
          style={{ opacity: opacity1 }}
          className="absolute inset-0 mix-blend-lighten"
        >
          <Image
            src="/hero-object-1.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 75vw, 720px"
            className="object-contain"
          />
        </motion.div>
        <motion.div
          style={{ opacity: opacity2 }}
          className="absolute inset-0 mix-blend-lighten"
        >
          <Image
            src="/hero-object-2.png"
            alt=""
            fill
            sizes="(max-width: 768px) 75vw, 720px"
            className="object-contain"
          />
        </motion.div>
        <motion.div
          style={{ opacity: opacity3 }}
          className="absolute inset-0 mix-blend-lighten"
        >
          <Image
            src="/hero-object-3.png"
            alt=""
            fill
            sizes="(max-width: 768px) 75vw, 720px"
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
