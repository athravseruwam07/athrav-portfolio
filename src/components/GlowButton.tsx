'use client';

import * as React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import clsx from 'clsx';

type Props = React.ComponentProps<'a'> & {
  className?: string;
  children: React.ReactNode;
};

/**
 * Gradient-outline button with hover glow driven by mouse position.
 * Use CSS vars --mx / --my inside your globals.css to position the glow.
 */
export default function GlowButton({ className, children, onMouseMove, ...props }: Props) {
  // numeric motion values (no units here)
  const mx = useMotionValue(50); // percent across the button
  const my = useMotionValue(30); // pixels from top

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    // set numbers ONLY
    mx.set(((e.clientX - r.left) / r.width) * 100); // 0..100
    my.set(e.clientY - r.top);                       // px inside element
    onMouseMove?.(e);
  };

  // convert to CSS custom props WITH units
  const cssMx = useMotionTemplate`${mx}%`;
  const cssMy = useMotionTemplate`${my}px`;

  return (
    <motion.a
      {...props}
      onMouseMove={handleMouseMove}
      style={{ '--mx': cssMx as unknown as string, '--my': cssMy as unknown as string } as React.CSSProperties}
      className={clsx(
        'btn-gradient-outline group inline-flex h-12 min-w-[210px] items-center justify-center px-6 text-white',
        className
      )}
    >
      {/* moving sheen band */}
      <span className="btn-shine" />
      {children}
    </motion.a>
  );
}