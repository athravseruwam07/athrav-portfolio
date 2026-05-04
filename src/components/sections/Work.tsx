import { projects } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import BlurFade from "@/components/ui/BlurFade";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <BlurFade>
        <SectionHeading index="// 01 — WORK" title="Selected Projects" />
      </BlurFade>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <BlurFade key={project.title} delay={i * 0.08}>
            <ProjectCard project={project} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
