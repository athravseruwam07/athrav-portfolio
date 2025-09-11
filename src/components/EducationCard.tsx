'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export type Education = {
  school: string;
  program: string;
  dates: string;
  location?: string;
  logo?: string;        // e.g. '/logos/uwaterloo.svg'
  details?: string;     // optional one-liner / coursework
};

export function EducationCard({ edu }: { edu: Education }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      whileHover={{ y: -2 }}
      className="
        group relative overflow-hidden rounded-2xl border border-line/90 bg-surface/95 p-7 shadow-soft
        before:absolute before:inset-y-0 before:left-0 before:w-[3px]
        before:bg-gradient-to-b before:from-neon-from before:to-neon-to before:opacity-70
      "
    >
      {/* subtle hover glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(700px 150px at 50% 20%, rgba(99,102,241,0.14), transparent 60%)',
        }}
      />

      <header className="flex items-center gap-5">
        <Logo src={edu.logo} alt={`${edu.school} logo`} />
        <div className="min-w-0">
          <h3 className="text-xl font-bold text-white sm:text-2xl">{edu.school}</h3>
          <p className="mt-1 text-base text-text-muted">
            {edu.program}
            {edu.location && (
              <>
                {' '}<span aria-hidden>•</span>{' '}{edu.location}
              </>
            )}
          </p>
        </div>
        <span className="ml-auto rounded-full border border-line px-3 py-1 text-sm text-text-muted">
          {edu.dates}
        </span>
      </header>

      {edu.details && (
        <p className="mt-5 text-base text-text-muted leading-relaxed">{edu.details}</p>
      )}
    </motion.article>
  );
}

function Logo({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-black/30 text-sm font-semibold text-white">
        EDU
      </div>
    );
  }
  return (
    <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:h-16 sm:w-16">
      <Image src={src} alt={alt} fill sizes="64px" className="object-contain p-2" />
    </div>
  );
}