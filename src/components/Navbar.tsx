'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [glowing, setGlowing] = useState<string | null>(null);

  // Smooth-scroll helper (manual offset for sticky header)
  const smoothScrollTo = (hash: string) => {
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = 64; // h-16
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const targetY = Math.max(absoluteTop - headerH - 8, 0);

    window.scrollTo({ top: targetY, behavior: 'smooth' });
    history.replaceState(null, '', hash);
  };

  // Fire a brief glow effect on click
  const clickAndGlow = (href: string) => {
    setGlowing(href);
    smoothScrollTo(href);
    setOpen(false);
    window.setTimeout(() => setGlowing((g) => (g === href ? null : g)), 650);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/70 backdrop-blur supports-[backdrop-filter]:bg-bg/50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* LEFT: logo + name */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-line bg-surface">
            <Image
              src="/logos/as.png"
              alt="AS logo"
              fill
              sizes="32px"
              className="object-contain p-1.5"
              priority
            />
          </span>
          <span className="text-sm font-semibold tracking-wide text-white sm:text-base transition-colors group-hover:text-neon-from">
            Athrav Seruwam
          </span>
        </Link>

        {/* RIGHT: desktop nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={(e) => {
                e.preventDefault();
                clickAndGlow(l.href);
              }}
              className="relative rounded-xl2 px-3 py-2 text-sm text-text-muted transition hover:-translate-y-[1px] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
            >
              {/* glow overlay on click */}
              <AnimatePresence>
                {glowing === l.href && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-neon-from/40 via-neon-via/25 to-neon-to/40 blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  />
                )}
              </AnimatePresence>

              <motion.span
                whileTap={{ scale: 0.97 }}
                className="relative z-0"
              >
                {l.label}
              </motion.span>
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-xl2 border border-line p-2 text-white/80 transition hover:border-neon-from md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="border-t border-line bg-bg/90 backdrop-blur md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    clickAndGlow(l.href);
                  }}
                  className="rounded-xl2 px-3 py-2 text-left text-sm text-text-muted transition hover:text-white"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;