"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(12,12,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Name */}
        <a
          href="#"
          className="font-display text-sm font-semibold text-text-base transition-colors duration-200 hover:text-accent"
        >
          Athrav Seruwam
        </a>

        {/* Links */}
        <nav className="flex items-center gap-6" aria-label="Primary navigation">
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="relative py-1 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200"
              style={{ color: active === id ? "var(--accent)" : "var(--muted)" }}
            >
              {label}
              <AnimatePresence>
                {active === id && (
                  <motion.span
                    key="underline"
                    layoutId="nav-underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                    transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
                  />
                )}
              </AnimatePresence>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
