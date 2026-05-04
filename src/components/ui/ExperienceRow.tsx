"use client";

import Image from "next/image";
import type { Experience } from "@/lib/data";

export default function ExperienceRow({ exp }: { exp: Experience }) {
  return (
    <div
      className="group flex gap-4 rounded-sm p-5 transition-colors duration-240"
      style={{
        border: "1px solid var(--line)",
        backgroundColor: "var(--surface)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
      }}
    >
      {/* Logo */}
      <div
        className="relative mt-0.5 h-9 w-9 shrink-0 overflow-hidden rounded-sm"
        style={{ border: "1px solid var(--line)", backgroundColor: "rgba(255,255,255,0.04)" }}
      >
        <Image
          src={exp.logo}
          alt={exp.company}
          fill
          className="object-contain p-1"
          unoptimized
        />
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-sm font-medium text-text-base">{exp.role}</span>
          <span className="font-mono text-[11px]" style={{ color: "var(--mono-label)" }}>
            {exp.company}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          <span className="font-mono text-[11px] tracking-wide" style={{ color: "var(--muted)" }}>
            {exp.dates}
          </span>
          {exp.location && (
            <span className="font-mono text-[11px]" style={{ color: "var(--mono-label)" }}>
              {exp.location}
            </span>
          )}
        </div>
        <ul className="mt-2 flex flex-col gap-1.5">
          {exp.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
