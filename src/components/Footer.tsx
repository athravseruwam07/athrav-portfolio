'use client';

import { socials } from '@/lib/data';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <span>© {new Date().getFullYear()} Athrav Seruwam</span>

        {/* Only plain anchors — no Link, no nesting */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${socials.email}`}
            aria-label="Email"
            className="inline-flex p-2 rounded-full bg-surface/60 border border-line hover:border-neon-from hover:bg-surface transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex p-2 rounded-full bg-surface/60 border border-line hover:border-neon-from hover:bg-surface transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex p-2 rounded-full bg-surface/60 border border-line hover:border-neon-from hover:bg-surface transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}