'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Spacing = 'tight' | 'normal' | 'loose';

const topMap: Record<Spacing, string> = {
  tight: 'pt-8',
  normal: 'pt-16',
  loose: 'pt-24',
};

const bottomMap: Record<Spacing, string> = {
  tight: 'pb-8',
  normal: 'pb-16',
  loose: 'pb-24',
};

type Props = {
  id?: string;
  title?: string;
  children: React.ReactNode;
  /** Controls top padding of the section container (default: "normal") */
  spaceTop?: Spacing;
  /** Controls bottom padding of the section container (default: "normal") */
  spaceBottom?: Spacing;
  /** Extra classes on the outer container */
  className?: string;
};

export function Section({
  id,
  title,
  children,
  spaceTop = 'normal',
  spaceBottom = 'normal',
  className,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        'mx-auto max-w-5xl px-6',
        topMap[spaceTop],
        bottomMap[spaceBottom],
        className
      )}
    >
      {title ? (
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-8 text-center text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          <span className="neon-text">{title}</span>
        </motion.h2>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}