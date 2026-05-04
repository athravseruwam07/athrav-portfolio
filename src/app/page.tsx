import DotGrid from "@/components/ui/DotGrid";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <DotGrid />
      <Hero />
      <Work />
      <About />
      <Stack />
      <Education />
      <Contact />
    </>
  );
}
