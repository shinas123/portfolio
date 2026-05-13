import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Metrics from "@/components/Metrics";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Metrics />
      <Projects />
      <Stack />
      <Contact />
    </main>
  );
}
