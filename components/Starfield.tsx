"use client";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth (0.1 - 1) — drives parallax + size
  r: number; // base radius
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
};

type Shoot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  trail: number;
};

type Props = {
  /** Multiplier on star density. 1 ≈ one star per ~3500 px². */
  density?: number;
};

export default function Starfield({ density = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const shoots = useRef<Shoot[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const dims = useRef({ w: 0, h: 0, dpr: 1 });
  const rafId = useRef(0);
  const lastShootAt = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const generate = () => {
      const { w, h } = dims.current;
      const count = Math.floor((w * h) / 3500 * density);
      stars.current = Array.from({ length: count }, () => {
        const z = Math.random() * 0.9 + 0.1;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: (Math.random() * 0.9 + 0.25) * (0.6 + z * 0.6),
          baseOpacity: Math.random() * 0.5 + 0.35,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.0008 + Math.random() * 0.0018,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      dims.current = { w: rect.width, h: rect.height, dpr };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generate();
    };

    const onMove = (e: MouseEvent) => {
      // Normalized -0.5 .. 0.5
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    const onVisibilityChange = () => {
      visibleRef.current = !document.hidden;
      if (visibleRef.current) {
        rafId.current = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(rafId.current);
      }
    };

    let mx = 0;
    let my = 0;

    const draw = (t: number) => {
      const { w, h } = dims.current;
      // Ease mouse parallax target
      mx += (mouse.current.x - mx) * 0.05;
      my += (mouse.current.y - my) * 0.05;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Two soft nebula glows
      const g1 = ctx.createRadialGradient(w * 0.65, h * 0.35, 0, w * 0.65, h * 0.35, Math.max(w, h) * 0.55);
      g1.addColorStop(0, "rgba(139, 92, 246, 0.07)");
      g1.addColorStop(0.55, "rgba(59, 130, 246, 0.025)");
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.75, 0, w * 0.85, h * 0.75, Math.max(w, h) * 0.4);
      g2.addColorStop(0, "rgba(236, 72, 153, 0.04)");
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (const s of stars.current) {
        const px = s.x + mx * 30 * s.z;
        const py = s.y + my * 18 * s.z;

        const twinkle = (Math.sin(t * s.twinkleSpeed + s.twinklePhase) + 1) * 0.5;
        const opacity = s.baseOpacity * (0.35 + twinkle * 0.65);

        // Halo for bigger stars
        if (s.r > 0.9) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(190, 210, 255, ${opacity * 0.13})`;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      // Spawn shooting star occasionally
      if (t - lastShootAt.current > 9000 + Math.random() * 8000) {
        lastShootAt.current = t;
        shoots.current.push({
          x: w * (0.4 + Math.random() * 0.6),
          y: Math.random() * h * 0.45,
          vx: -2.4 - Math.random() * 2.2,
          vy: 1.1 + Math.random() * 1.4,
          life: 1,
          trail: 70 + Math.random() * 30,
        });
      }

      // Draw shooting stars
      for (let i = shoots.current.length - 1; i >= 0; i--) {
        const ss = shoots.current[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= 0.012;

        if (ss.life <= 0 || ss.x < -50 || ss.y > h + 50) {
          shoots.current.splice(i, 1);
          continue;
        }

        const tx = ss.x - ss.vx * 0.1 * ss.trail;
        const ty = ss.y - ss.vy * 0.1 * ss.trail;
        const lg = ctx.createLinearGradient(ss.x, ss.y, tx, ty);
        lg.addColorStop(0, `rgba(255,255,255,${ss.life})`);
        lg.addColorStop(0.5, `rgba(180,200,255,${ss.life * 0.4})`);
        lg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.life})`;
        ctx.fill();
      }

      if (visibleRef.current) {
        rafId.current = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    rafId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
