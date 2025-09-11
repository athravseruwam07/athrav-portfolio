'use client';

import Image from 'next/image';
import * as React from 'react';
import { motion } from 'framer-motion';
import type { ExperienceItem } from '@/types/content';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

export function ExperienceSection({ items }: { items: ExperienceItem[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      className="grid gap-6 md:grid-cols-2"
    >
      {items.map((xp) => (
        <Card key={`${xp.company}-${xp.role}-${xp.dates}`} xp={xp} />
      ))}
    </motion.div>
  );
}

function Card({ xp }: { xp: ExperienceItem }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const showLocation = xp.location?.trim().length > 0;

  return (
    <motion.article
      ref={ref}
      variants={item}
      whileHover={{ y: -2 }}
      onMouseMove={onMove}
      className="
        group relative overflow-hidden rounded-2xl border border-line/90 bg-surface/90 p-5 shadow-soft
        before:absolute before:inset-y-0 before:left-0 before:w-[3px]
        before:bg-gradient-to-b before:from-neon-from before:to-neon-to before:opacity-70
      "
    >
      {/* subtle glow that follows the cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px 120px at var(--mx,50%) var(--my,25%), rgba(99,102,241,0.14), transparent 60%)',
        }}
      />

      <header className="flex items-start gap-3">
        <Logo src={xp.logo} alt={`${xp.company} logo`} />
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white">{xp.role}</h3>
          <p className="mt-0.5 truncate text-sm text-text-muted">
            {xp.company}
            {showLocation && (
              <>
                {' '}<span aria-hidden>•</span>{' '}{xp.location}
              </>
            )}
          </p>
        </div>
        <span className="ml-auto rounded-full border border-line px-2 py-0.5 text-xs text-text-muted">
          {xp.dates}
        </span>
      </header>

      <ul className="mt-4 grid gap-2 text-sm text-text-muted">
        {xp.bullets.slice(0, 3).map((b, i) => (
          <li key={i} className="grid grid-cols-[10px_1fr] items-start gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

/* ---------- logo with fallback initials ---------- */
function initials(name: string) {
  const clean = name.replace(/ logo$/i, '').trim();
  const parts = clean.split(/\s+/);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '•';
}

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-10 w-10 flex-none overflow-hidden rounded-xl border border-white/10 bg-black/30">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="40px"
        className="object-contain p-1.5"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
          const f =
            (e.currentTarget.parentElement?.querySelector(
              '[data-fallback]'
            ) as HTMLElement) || null;
          if (f) f.style.display = 'flex';
        }}
      />
      <div
        data-fallback
        className="absolute inset-0 hidden items-center justify-center text-xs font-semibold text-white"
        style={{
          background:
            'linear-gradient(135deg, rgba(99,102,241,.4), rgba(139,92,246,.35))',
          letterSpacing: '.5px',
        }}
      >
        {initials(alt)}
      </div>
    </div>
  );
}