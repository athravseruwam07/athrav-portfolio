'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export type ExperienceItem = {
  role: string;
  company: string;
  dates: string;
  location: string;
  bullets: string[];   // keep 2–3 short points for web
  logo: string;        // /public/logos/*.png|svg (initials fallback if missing)
};

const appear = { duration: 0.45, ease: 'easeOut' };
const spring = { type: 'spring', stiffness: 120, damping: 18 };

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const noMotion = useReducedMotion();

  return (
    <div className="timeline">
      {/* center rail spans full grid height */}
      <div aria-hidden className="timeline-rail" />

      {items.map((item, i) => {
        const left = i % 2 === 0;

        return (
          <div key={item.company + i} className={`entry ${left ? 'left' : 'right'}`}>
            {/* node on the rail (center column) */}
            <motion.div
              className="entry-node"
              initial={noMotion ? undefined : { scale: 0.6, opacity: 0 }}
              whileInView={noMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              transition={spring}
            >
              <div className="entry-node-inner" />
            </motion.div>

            {/* date pill (center column) */}
            <motion.div
              className="entry-date"
              initial={noMotion ? undefined : { y: -8, opacity: 0 }}
              whileInView={noMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {item.dates}
            </motion.div>

            {/* card (left or right column) */}
            <motion.article
              className={`exp-card ${left ? 'col-left' : 'col-right'}`}
              initial={noMotion ? undefined : { opacity: 0, y: 18, x: left ? -18 : 18 }}
              whileInView={noMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
              transition={appear}
            >
              {/* notch aiming toward the rail */}
              <span aria-hidden className="exp-notch" />

              <header className="exp-header">
                <Logo src={item.logo} alt={`${item.company} logo`} />
                <div className="exp-title">
                  <h3 className="exp-role">{item.role}</h3>
                  <p className="exp-meta">
                    {item.company} <span className="exp-dot">•</span> {item.location}
                  </p>
                </div>
              </header>

              <ul className="exp-bullets">
                {item.bullets.slice(0, 3).map((b, idx) => (
                  <li key={idx} className="exp-bullet">
                    <span className="exp-bullet-dot" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- logo with initials fallback ---------- */

function initials(name: string) {
  const parts = name.replace(/ logo$/i, '').trim().split(/\s+/);
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
}

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="exp-logo">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="48px"
        className="exp-logo-img"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
          const f = (e.currentTarget.parentElement?.querySelector('[data-fallback]') as HTMLElement) || null;
          if (f) f.style.display = 'flex';
        }}
      />
      <div data-fallback className="exp-logo-fallback" style={{ display: 'none' }}>
        {initials(alt).toUpperCase() || '??'}
      </div>
    </div>
  );
}