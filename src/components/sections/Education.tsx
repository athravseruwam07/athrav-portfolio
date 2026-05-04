"use client";

import Image from "next/image";
import { education } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import BlurFade from "@/components/ui/BlurFade";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-24">
      <BlurFade>
        <SectionHeading index="// 04 — EDUCATION" title="Academic Background" />
      </BlurFade>

      <BlurFade delay={0.08}>
        <div
          className="flex flex-col gap-6 rounded-sm p-8 transition-all duration-240 sm:flex-row sm:items-start sm:gap-8"
          style={{
            border: "1px solid var(--line)",
            backgroundColor: "var(--surface)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.25)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(34,211,238,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Logo */}
          <div
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm"
            style={{ border: "1px solid var(--line)", backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <Image
              src={education.logo}
              alt={education.school}
              fill
              className="object-contain p-2"
              unoptimized
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold text-text-base">
                {education.school}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {education.program}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span
                className="font-mono text-[11px] tracking-wide"
                style={{ color: "var(--mono-label)" }}
              >
                {education.dates}
              </span>
              <span
                className="font-mono text-[11px] tracking-wide"
                style={{ color: "var(--mono-label)" }}
              >
                {education.location}
              </span>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {education.coursework}
            </p>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
