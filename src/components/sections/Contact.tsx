"use client";

import { owner } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import BlurFade from "@/components/ui/BlurFade";
import ShimmerButton from "@/components/ui/ShimmerButton";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <BlurFade>
        <SectionHeading index="// 05 — CONTACT" title="Let's build something." />
      </BlurFade>

      <BlurFade delay={0.08}>
        <p className="mb-12 max-w-md text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Open to internship and co-op roles. Replies within 24h.
        </p>
      </BlurFade>

      <BlurFade delay={0.16}>
        <div className="flex flex-wrap gap-4">
          <ShimmerButton
            href={`mailto:${owner.email}`}
            className="text-base px-8 py-4"
          >
            <Mail size={16} />
            {owner.email}
          </ShimmerButton>

          <a
            href={owner.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-sm border px-6 py-3 font-mono text-sm tracking-wide transition-all duration-240"
            style={{ borderColor: "var(--line)", color: "var(--muted)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(34,211,238,0.3)";
              el.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--line)";
              el.style.color = "var(--muted)";
            }}
          >
            <Linkedin size={15} />
            LinkedIn
          </a>

          <a
            href={owner.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-sm border px-6 py-3 font-mono text-sm tracking-wide transition-all duration-240"
            style={{ borderColor: "var(--line)", color: "var(--muted)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(34,211,238,0.3)";
              el.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--line)";
              el.style.color = "var(--muted)";
            }}
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
      </BlurFade>
    </section>
  );
}
