'use client';

import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export type Project = {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  tech?: string[];
  github?: string | null;
  demo?: string | null;
};

export function ProjectCard({ project }: { project: Project }) {
  const chips = project.tags ?? project.tech ?? [];
  const hasDemo = typeof project.demo === 'string' && project.demo.length > 0;
  const hasGit  = typeof project.github === 'string' && project.github.length > 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      className="
        group relative overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-soft
        transition hover:-translate-y-1 hover:shadow-xl/20 focus-within:-translate-y-1
        flex flex-col md:min-h-[460px]
      "
    >
      {/* Gradient ring (masked border) – sits under content */}
    <div
      className="pointer-events-none absolute inset-0 z-[5] rounded-2xl opacity-0 transition-opacity duration-300
                  group-hover:opacity-100"
      aria-hidden
    >
        <div
          className="absolute inset-0 rounded-2xl p-[1.5px]"
          style={{
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      </div>

      {/* Header image (fixed height so all cards are equal height) */}
      {project.image && (
        <div className="relative z-[1] h-48 sm:h-52 lg:h-56 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          {/* Gentle sheen (no flash) */}
          <div
            className="pointer-events-none absolute inset-0 -translate-x-[140%] opacity-0
                       bg-gradient-to-r from-transparent via-white/10 to-transparent
                       transition duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                       group-hover:translate-x-[140%] group-hover:opacity-100"
          />
        </div>
      )}

      {/* Body */}
      <div className="relative z-[2] p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-surface px-2.5 py-1 text-xs text-text-muted transition group-hover:border-neon-from/40"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Actions – pinned to bottom for cross-card alignment */}
        <div className="mt-auto pt-4 flex items-center gap-3">
          {/* GitHub */}
          {hasGit ? (
            <a
              href={project.github!}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl2 border border-white/12 bg-surface px-3.5 py-2 text-sm text-white
                         transition-[transform,box-shadow,border-color,background-color] duration-200
                         hover:-translate-y-0.5 hover:border-neon-from/50 hover:shadow-[0_8px_26px_-20px_rgba(139,92,246,0.6)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          ) : (
            <button
              type="button"
              aria-disabled
              className="inline-flex min-w-[180px] cursor-not-allowed items-center justify-center gap-2 rounded-xl2 border border-white/10 bg-surface/70 px-3.5 py-2 text-sm text-text-muted"
              title="Repo coming soon"
            >
              <Github className="h-4 w-4" />
              GitHub Soon
            </button>
          )}

          {/* Live Demo (only rendered if provided) */}
          {hasDemo ? (
            <a
              href={project.demo!}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl2 border border-white/12 bg-surface px-3.5 py-2 text-sm text-white
                         transition-[transform,box-shadow,border-color,background-color] duration-200
                         hover:-translate-y-0.5 hover:border-neon-from/50 hover:shadow-[0_8px_26px_-20px_rgba(139,92,246,0.6)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          ) : null}
        </div>
      </div>

      {/* Ambient glow below card */}
      <div
        className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
        style={{
          background:
            'radial-gradient(120px 60px at 30% 20%, rgba(99,102,241,.25), transparent 60%), radial-gradient(120px 60px at 70% 80%, rgba(236,72,153,.22), transparent 60%)',
        }}
        aria-hidden
      />
    </motion.article>
  );
}