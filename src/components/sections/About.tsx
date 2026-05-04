import { owner, experiences, stats } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/ui/StatCounter";
import ExperienceRow from "@/components/ui/ExperienceRow";
import BlurFade from "@/components/ui/BlurFade";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <BlurFade>
        <SectionHeading index="// 02 — ABOUT" title="Engineer. Builder." />
      </BlurFade>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Left — bio + stats */}
        <BlurFade delay={0.08}>
          <div className="flex flex-col gap-10">
            {/* Bio */}
            <div className="flex flex-col gap-5">
              {owner.bio.map((para, i) => (
                <p key={i} className="text-sm leading-loose" style={{ color: "var(--muted)" }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Stat counters */}
            <div
              className="grid grid-cols-2 gap-8 rounded-sm p-6"
              style={{ border: "1px solid var(--line)", backgroundColor: "var(--surface)" }}
            >
              {stats.map((stat) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Right — experience rows */}
        <BlurFade delay={0.16}>
          <div className="flex flex-col gap-4">
            <p
              className="mb-2 font-mono text-[11px] tracking-[0.18em] uppercase"
              style={{ color: "var(--mono-label)" }}
            >
              Experience
            </p>
            {experiences.map((exp) => (
              <ExperienceRow key={exp.company} exp={exp} />
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
