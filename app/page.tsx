"use client";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Metrics from "@/components/Metrics";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Stack from "@/components/Stack";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import HeroObject from "@/components/HeroObject";
import ParticleBackdrop from "@/components/ParticleBackdrop";

export default function Page() {
  const particleZoneRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative">
      <ParticleBackdrop containerRef={particleZoneRef} />
      <Navbar />
      <div className="relative z-10">
        {/* Hero with blob embedded inside — blob scrolls away with Hero */}
        <div className="relative overflow-hidden">
          <HeroObject />
          <Hero />
        </div>
        <About />
        <div ref={particleZoneRef}>
          <Metrics />
          <Projects />
          <Services />
          <Stack />
          <Certifications />
          <Contact />
        </div>
      </div>
    </main>
  );
}
