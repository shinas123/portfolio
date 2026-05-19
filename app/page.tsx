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

export default function Page() {
  return (
    <main className="relative">
      <HeroObject />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Metrics />
        <Projects />
        <Services />
        <Stack />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}
