'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useMotionTemplate, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

type Props = {
  socials: { linkedin: string; github: string; email: string };
  name: string;
};

export default function Hero({ socials, name }: Props) {
  /* ---------- Typewriter tagline ---------- */
  const full =
    'Mechatronics Engineering @ Waterloo. I build simple, reliable tools with solid fundamentals and clean UX.';
  const [typed, setTyped] = React.useState('');
  const [i, setI] = React.useState(0);
  const [blink, setBlink] = React.useState(true);

  React.useEffect(() => {
    const caret = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(caret);
  }, []);

  React.useEffect(() => {
    if (i > full.length) return;
    const id = setTimeout(() => {
      setTyped(full.slice(0, i));
      setI(i + 1);
    }, i < 10 ? 25 : 12); // starts slower, speeds up
    return () => clearTimeout(id);
  }, [i, full]);

  /* ---------- Parallax orbs ---------- */
  const mx = useSpring(0, { stiffness: 50, damping: 15 });
  const my = useSpring(0, { stiffness: 50, damping: 15 });

  const onMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / innerWidth;
    const y = (e.clientY - innerHeight / 2) / innerHeight;
    mx.set(x);
    my.set(y);
  };

  const orbA = useMotionTemplate`translate3d(${mx.get() * -60}px, ${my.get() * -40}px, 0)`;
  const orbB = useMotionTemplate`translate3d(${mx.get() * 80}px, ${my.get() * 60}px, 0)`;

  return (
    <section id="home" className="relative overflow-hidden" onMouseMove={onMouseMove}>
      {/* animated gradient orbs */}
      <motion.div
        aria-hidden
        style={{ transform: orbA as unknown as React.CSSProperties['transform'] }}
        className="pointer-events-none absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-neon-from via-neon-via to-neon-to opacity-25 blur-2xl"
      />
      <motion.div
        aria-hidden
        style={{ transform: orbB as unknown as React.CSSProperties['transform'] }}
        className="pointer-events-none absolute -bottom-40 -right-24 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-neon-to via-neon-via to-neon-from opacity-25 blur-2xl"
      />

      <div className="mx-auto max-w-5xl px-6 pt-24 pb-28">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-sm tracking-[0.25em] text-text-muted"
        >
          ASPIRING SWE INTERN
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10, letterSpacing: '-0.02em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '-0.03em' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mt-4 text-5xl font-extrabold leading-[1.05] sm:text-6xl md:text-[84px]"
        >
          Hi, I’m <span className="neon-text">{name}</span>
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="mt-5 max-w-3xl text-lg text-text-muted"
        >
          {typed}
          <span className="inline-block w-[10px]">{blink ? '|' : ' '}</span>
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MagicButton href="#projects" variant="primary">
            View Projects
          </MagicButton>
          <MagicButton href="#contact" variant="ghost">
            Contact Me
          </MagicButton>
        </div>

        {/* socials */}
        <div className="mt-8 flex items-center gap-3">
          <IconCircle aria="LinkedIn" href={socials.linkedin}>
            <Linkedin className="h-5 w-5" />
          </IconCircle>
          <IconCircle aria="GitHub" href={socials.github}>
            <Github className="h-5 w-5" />
          </IconCircle>
          <IconCircle aria="Email" href={`mailto:${socials.email}`} isExternal={false}>
            <Mail className="h-5 w-5" />
          </IconCircle>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA with magnetic glow + shine ---------------- */

/* ---------------- CTA with subtle, clipped glow + sheen ---------------- */

function MagicButton({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
}) {
  const ref = React.useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const base =
    // NOTE: overflow-hidden clips the glow perfectly to the rounded shape
    'group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 text-[15px] font-medium ' +
    'transition will-change-transform overflow-hidden select-none backface-hidden';

  const primary =
    'text-white bg-surface border border-line hover:translate-y-[-1px] active:translate-y-0 ' +
    'shadow-[0_14px_28px_-18px_rgba(0,0,0,0.65)] hover:border-neon-from';

  const ghost =
    'text-white border border-line hover:border-neon-from hover:translate-y-[-1px] active:translate-y-0';

  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      href={href}
      className={`${base} ${variant === 'primary' ? primary : ghost}`}
      style={{ WebkitBackfaceVisibility: 'hidden' } as React.CSSProperties}
    >
      {/* content sits above effects */}
      <span className="relative z-10">{children}</span>

      {/* cursor-tracked glow (softer + smaller) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          // Tweak these two numbers if you want more/less glow:
          //   radius: first two values, opacity: rgba(..., 0.16)
          background:
            'radial-gradient(110px 70px at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.16), transparent 66%)',
        }}
      />

      {/* gentle sheen sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl translate-x-[-120%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.06),transparent)] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[120%]"
      />
    </a>
  );
}

/* ---------------- Social icon circle buttons ---------------- */

function IconCircle({
  href,
  aria,
  children,
  isExternal = true,
}: {
  href: string;
  aria: string;
  children: React.ReactNode;
  isExternal?: boolean;
}) {
  const props = {
    className:
      'inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-white transition hover:border-neon-from hover:-translate-y-[1px]',
    'aria-label': aria,
  };
  return isExternal ? (
    <Link href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </Link>
  ) : (
    <a href={href} {...props}>
      {children}
    </a>
  );
}