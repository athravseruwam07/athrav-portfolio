'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

type Project = {
  title: string;
  blurb: string;
  image: string;     // /public path
  tags: string[];
  github: string;
  demoUrl: string | null; // set to string to enable Live Demo
};

const PROJECTS: Project[] = [
  {
    title: 'AI Flashcard Generator',
    blurb:
      'Generate smart study decks from notes, PDFs, or pasted text. Embeddings + LLM prompts build concise Q/A cards, spaced-repetition friendly, with export to CSV/Anki.',
    image: '/images/projects/flashcards.png', // put something in /public/images/projects
    tags: ['Next.js', 'TypeScript', 'OpenAI/LLM', 'Tailwind', 'shadcn/ui'],
    github: 'https://github.com/you/ai-flashcards',
    demoUrl: null, // set to 'https://...' when ready
  },
  {
    title: 'Daily Schedule Optimizer',
    blurb:
      'Time-blocking web app that converts tasks into a daily schedule with a greedy algorithm. Priority sorting, breaks/lunch blocks, overflow handling, and ICS/CSV export.',
    image: '/images/projects/scheduler.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Algorithms', 'ICS/CSV Export'],
    github: 'https://github.com/you/schedule-optimizer',
    demoUrl: null,
  },
  {
    title: 'Personal Portfolio Website',
    blurb:
      'Static Next.js + TypeScript portfolio with clean sections, responsive cards, subtle motion, and a recruiting-friendly experience timeline.',
    image: '/images/projects/portfolio.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'shadcn/ui'],
    github: 'https://github.com/you/portfolio',
    demoUrl: null,
  },
];

function ProjectCard({ p }: { p: Project }) {
  // 3D tilt based on mouse position
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const t = useMotionTemplate`rotateX(${rx}deg) rotateY(${ry}deg)`;

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    // tilt limits
    const rX = (py - 0.5) * -8; // top/bottom
    const rY = (px - 0.5) * 10; // left/right
    rx.set(rX);
    ry.set(rY);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      className="group card relative overflow-hidden p-0"
      style={{ transform: t, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* gradient glow frame */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
           style={{
             background:
               'radial-gradient(120% 80% at 15% -10%, rgba(99,102,241,.18), transparent 60%), radial-gradient(90% 70% at 100% 0%, rgba(236,72,153,.10), transparent 70%)'
           }} />

      {/* picture */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 420px, 100vw"
          priority={false}
        />
        {/* subtle shine that sweeps on hover */}
        <span className="shine" />
      </div>

      {/* content */}
      <div className="relative p-5 md:p-6">
        <h3 className="text-lg font-semibold text-white">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{p.blurb}</p>

        <ul className="mt-3 flex flex-wrap gap-2 text-xs">
          {p.tags.map((t) => (
            <li key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-text-muted">
              {t}
            </li>
          ))}
        </ul>

        {/* actions */}
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="btn-filled relative rounded-xl2 px-4 py-2"
          >
            <span>View on GitHub</span>
            <span className="btn-softglow" />
            <span className="btn-sheen" />
          </Link>

          {p.demoUrl ? (
            <Link
              href={p.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gradient-outline px-4 py-2 rounded-xl2"
            >
              Live Demo
              <span className="btn-shine" />
            </Link>
          ) : (
            <button
              disabled
              title="Demo coming soon"
              className="btn-gradient-outline px-4 py-2 rounded-xl2 opacity-60 cursor-not-allowed"
            >
              Demo soon
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">Projects</p>
        <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Selected Work</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}