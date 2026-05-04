"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Spotlight from "@/components/ui/Spotlight";
import AvailableBadge from "@/components/ui/AvailableBadge";
import { owner } from "@/lib/data";
import { ArrowDown } from "lucide-react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";

function scrambleReveal(
  el: HTMLElement,
  finalText: string,
  duration: number,
  onComplete?: () => void
) {
  let frame = 0;
  const totalFrames = Math.ceil(duration / 40);

  const interval = setInterval(() => {
    const progress = frame / totalFrames;
    const revealedCount = Math.floor(progress * finalText.length);

    el.textContent = finalText
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (i < revealedCount) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join("");

    frame++;
    if (frame > totalFrames) {
      clearInterval(interval);
      el.textContent = finalText;
      onComplete?.();
    }
  }, 40);

  return () => clearInterval(interval);
}

export default function Hero() {
  const spotlightRef = useRef<SVGSVGElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = [nameRef, taglineRef, badgeRef, ctasRef];

    if (prefersReduced) {
      if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
      targets.forEach((r) => {
        if (r.current) {
          r.current.style.opacity = "1";
          r.current.style.transform = "none";
        }
      });
      return;
    }

    // Set initial states via GSAP (avoids Tailwind/GSAP transform conflicts)
    gsap.set(taglineRef.current, { y: 18 });
    gsap.set(badgeRef.current, { y: 12 });
    gsap.set(ctasRef.current, { y: 12 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    let cleanupScramble: (() => void) | null = null;

    tl.to(spotlightRef.current, { opacity: 1, duration: 1.0 })
      .add(() => {
        if (!nameRef.current) return;
        gsap.to(nameRef.current, { opacity: 1, duration: 0.05 });
        cleanupScramble = scrambleReveal(nameRef.current, owner.name, 900);
      })
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.44 }, "+=0.85")
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.36 }, "+=0.1")
      .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.36 }, "+=0.08");

    return () => {
      tl.kill();
      cleanupScramble?.();
    };
  }, []);

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      <Spotlight ref={spotlightRef} />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1
          ref={nameRef}
          className="font-display font-semibold leading-none tracking-tight text-text-base opacity-0"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          aria-label={owner.name}
        >
          {owner.name}
        </h1>

        <p
          ref={taglineRef}
          className="mt-6 max-w-xl text-base leading-relaxed opacity-0"
          style={{ color: "var(--muted)" }}
        >
          {owner.tagline}
        </p>

        <div ref={badgeRef} className="mt-8 opacity-0">
          <AvailableBadge />
        </div>

        <div
          ref={ctasRef}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-sm px-6 py-3 font-mono text-sm font-semibold tracking-wide transition-opacity duration-200 hover:opacity-85"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            View Work
            <ArrowDown size={14} />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-sm border px-6 py-3 font-mono text-sm tracking-wide transition-all duration-[240ms]"
            style={{ borderColor: "var(--line)", color: "var(--muted)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(34,211,238,0.4)";
              el.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--line)";
              el.style.color = "var(--muted)";
            }}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ color: "var(--mono-label)" }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">scroll</span>
        <div
          className="h-8 w-px"
          style={{ background: "linear-gradient(to bottom, var(--mono-label), transparent)" }}
        />
      </div>
    </section>
  );
}
