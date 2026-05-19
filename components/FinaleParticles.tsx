"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { type MotionValue, useMotionValueEvent } from "motion/react";

// Mobile gets ~half the particles + lower DPR to keep frame rate up
const MOBILE_PARTICLE_COUNT = 1200;
const DESKTOP_PARTICLE_COUNT = 2500;
const MOBILE_BREAKPOINT = 768;

function getInitialParticleCount() {
  if (typeof window === "undefined") return DESKTOP_PARTICLE_COUNT;
  return window.innerWidth < MOBILE_BREAKPOINT
    ? MOBILE_PARTICLE_COUNT
    : DESKTOP_PARTICLE_COUNT;
}

type ParticlesProps = {
  progress: MotionValue<number>;
  particleCount: number;
};

function Particles({ progress, particleCount: PARTICLE_COUNT }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const progressRef = useRef(0);

  useMotionValueEvent(progress, "change", (v) => {
    progressRef.current = v;
  });

  // Static target positions for each phase
  const { splash, globe, waveBase, seaBase, colors } = useMemo(() => {
    const splash = new Float32Array(PARTICLE_COUNT * 3);
    const globe = new Float32Array(PARTICLE_COUNT * 3);
    const waveBase = new Float32Array(PARTICLE_COUNT * 3);
    const seaBase = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT));
    const vw = Math.max(viewport.width, 8);
    const vh = Math.max(viewport.height, 6);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Splash: chaotic scatter across the viewport
      splash[i * 3] = (Math.random() - 0.5) * vw * 1.15;
      splash[i * 3 + 1] = (Math.random() - 0.5) * vh * 0.9;
      splash[i * 3 + 2] = (Math.random() - 0.5) * 5;

      // Globe: fibonacci sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = Math.min(vh, vw) * 0.35;
      globe[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      globe[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      globe[i * 3 + 2] = r * Math.cos(phi);

      // Wave: grid, Y computed per frame
      const col = i % cols;
      const row = Math.floor(i / cols);
      waveBase[i * 3] = (col / (cols - 1) - 0.5) * vw * 1.25;
      waveBase[i * 3 + 1] = 0;
      waveBase[i * 3 + 2] = (row / (cols - 1) - 0.5) * 4 - 1;

      // Sea: wider XZ grid, Y from summed sines per frame
      seaBase[i * 3] = (col / (cols - 1) - 0.5) * vw * 1.6;
      seaBase[i * 3 + 1] = -1.2;
      seaBase[i * 3 + 2] = (row / (cols - 1) - 0.5) * 8;

      // Gradient palette: blue → purple → white (no rose-gold)
      // Smoothly interpolate so the cloud reads as a true gradient.
      const t = Math.random();
      let cr: number, cg: number, cb: number;
      if (t < 0.5) {
        // Blue → purple
        const k = t * 2;
        cr = 0.23 + (0.61 - 0.23) * k;
        cg = 0.51 + (0.53 - 0.51) * k;
        cb = 0.96;
      } else {
        // Purple → white
        const k = (t - 0.5) * 2;
        cr = 0.61 + (1.0 - 0.61) * k;
        cg = 0.53 + (1.0 - 0.53) * k;
        cb = 0.96 + (1.0 - 0.96) * k;
      }
      colors[i * 3] = cr;
      colors[i * 3 + 1] = cg;
      colors[i * 3 + 2] = cb;
    }

    return { splash, globe, waveBase, seaBase, colors };
  }, [viewport.width, viewport.height, PARTICLE_COUNT]);

  // Initial live positions = splash
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    arr.set(splash);
    return arr;
  }, [splash, PARTICLE_COUNT]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const p = progressRef.current;
    const time = state.clock.elapsedTime;

    // Phase progression:
    // 0.00 - 0.30 : splash → globe
    // 0.30 - 0.55 : globe → wave
    // 0.55 - 0.80 : wave → sea wave
    // 0.80 - 1.00 : sea wave hold
    let useWaveDynamic = false;
    let useSeaDynamic = false;
    let phaseA: Float32Array, phaseB: Float32Array, mix: number;

    if (p < 0.3) {
      phaseA = splash; phaseB = globe; mix = p / 0.3;
    } else if (p < 0.55) {
      phaseA = globe; phaseB = waveBase; mix = (p - 0.3) / 0.25;
      useWaveDynamic = mix > 0;
    } else if (p < 0.8) {
      phaseA = waveBase; phaseB = seaBase; mix = (p - 0.55) / 0.25;
      useWaveDynamic = true;
      useSeaDynamic = mix > 0;
    } else {
      phaseA = seaBase; phaseB = seaBase; mix = 0;
      useSeaDynamic = true;
    }

    const m = mix * mix * (3 - 2 * mix);

    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const damp = 0.075;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      let ax = phaseA[ix];
      let ay = phaseA[ix + 1];
      let az = phaseA[ix + 2];
      let bx = phaseB[ix];
      let by = phaseB[ix + 1];
      let bz = phaseB[ix + 2];

      if (useWaveDynamic) {
        const waveY = (x: number) => Math.sin(x * 0.6 - time * 1.8) * 1.4;
        if (phaseA === waveBase) ay = waveY(ax);
        if (phaseB === waveBase) by = waveY(bx);
      }
      if (useSeaDynamic) {
        const seaY = (x: number, z: number) =>
          Math.sin(x * 0.35 + time * 0.9) * 0.6 +
          Math.cos(z * 0.45 + time * 0.7) * 0.5 +
          Math.sin((x + z) * 0.2 + time * 1.1) * 0.25;
        if (phaseA === seaBase) ay = -1.2 + seaY(ax, az);
        if (phaseB === seaBase) by = -1.2 + seaY(bx, bz);
      }

      const tx = ax + (bx - ax) * m;
      const ty = ay + (by - ay) * m;
      const tz = az + (bz - az) * m;

      posArr[ix] += (tx - posArr[ix]) * damp;
      posArr[ix + 1] += (ty - posArr[ix + 1]) * damp;
      posArr[ix + 2] += (tz - posArr[ix + 2]) * damp;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Gentle autorotate — felt most during globe phase
    pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

type FinaleProps = {
  progress: MotionValue<number>;
};

export default function FinaleParticles({ progress }: FinaleProps) {
  // Settle particle count + DPR once, on mount, based on viewport
  const [particleCount, setParticleCount] = useState(getInitialParticleCount);
  const [maxDpr, setMaxDpr] = useState<number>(2);

  useEffect(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    setParticleCount(isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT);
    // Mobile retina screens hit perf hard at dpr=2; cap at 1.25
    setMaxDpr(isMobile ? 1.25 : 2);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, maxDpr]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Particles progress={progress} particleCount={particleCount} />
    </Canvas>
  );
}
