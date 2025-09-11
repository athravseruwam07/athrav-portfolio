'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

type Props = { label: string };

export function SkillBadge({ label }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Track mouse position over the badge to drive the radial glow
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${(x / r.width) * 100}%`);
    el.style.setProperty('--my', `${(y / r.height) * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="group relative inline-flex"
      aria-label={label}
    >
      <Badge
        className="
          relative overflow-hidden rounded-full
          border border-violet-500/30 bg-violet-500/10
          px-4 py-2 text-sm text-violet-200
          shadow-[0_8px_20px_-12px_rgba(0,0,0,0.6)]
          transition-colors
          group-hover:border-violet-400/50
        "
      >
        {/* Label (kept above glow via z-index) */}
        <span className="relative z-10">{label}</span>

        {/* Cursor-tracked radial glow */}
        <span
          aria-hidden
          className="
            pointer-events-none absolute inset-0 rounded-full
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          "
          style={{
            // Uses CSS custom props set in onMouseMove
            background:
              'radial-gradient(140px 48px at var(--mx,50%) var(--my,50%), rgba(124,58,237,0.35), transparent 60%)',
          }}
        />

        {/* Soft highlight sweep on hover */}
        <span
          aria-hidden
          className="
            pointer-events-none absolute inset-0 rounded-full
            translate-x-[-120%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)]
            transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
            group-hover:translate-x-[120%]
          "
        />
      </Badge>
    </motion.div>
  );
}