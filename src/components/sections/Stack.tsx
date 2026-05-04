"use client";

import { stack } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import BlurFade from "@/components/ui/BlurFade";

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-24">
      <BlurFade>
        <SectionHeading index="// 03 — STACK" title="Tools & Technologies" />
      </BlurFade>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((category, ci) => (
          <BlurFade key={category.label} delay={ci * 0.06}>
            <div className="flex flex-col gap-4">
              <p
                className="font-mono text-[11px] tracking-[0.18em] uppercase"
                style={{ color: "var(--mono-label)" }}
              >
                {category.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillTile key={skill} name={skill} />
                ))}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}

function SkillTile({ name }: { name: string }) {
  return (
    <div
      className="group rounded-sm px-3 py-1.5 font-mono text-xs tracking-wide transition-all duration-240"
      style={{
        border: "1px solid var(--line)",
        color: "var(--muted)",
        backgroundColor: "var(--surface)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(34,211,238,0.35)";
        el.style.color = "var(--accent)";
        el.style.boxShadow = "0 0 12px rgba(34,211,238,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--line)";
        el.style.color = "var(--muted)";
        el.style.boxShadow = "none";
      }}
    >
      {name}
    </div>
  );
}
