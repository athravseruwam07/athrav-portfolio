'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  type HTMLMotionProps,
} from 'framer-motion';
import clsx from 'clsx';

type Props = HTMLMotionProps<'a'> & {
  className?: string;
  children: React.ReactNode;
};

/**
 * Gradient-outline button with hover glow (driven by mouse pos).
 * Expects CSS using --mx / --my vars (already in your globals.css).
 */
export default function GlowButton({ className, children, onMouseMove, ...props }: Props) {
  // numeric motion values (no units)
  const mx = useMotionValue(50); // %
  const my = useMotionValue(30); // px

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100); // 0..100
    my.set(e.clientY - r.top);                       // px
    onMouseMove?.(e);
  };

  // add units when binding to CSS
  const cssMx = useMotionTemplate`${mx}%`;
  const cssMy = useMotionTemplate`${my}px`;

  const style = {
    '--mx': cssMx,
    '--my': cssMy,
  } as React.CSSProperties & Record<'--mx' | '--my', string>;

  return (
    <motion.a
      {...props}
      onMouseMove={handleMouseMove}
      style={style}
      className={clsx(
        'btn-gradient-outline group inline-flex h-12 min-w-[210px] items-center justify-center px-6 text-white',
        className
      )}
    >
      <span className="btn-shine" />
      {children}
    </motion.a>
  );
}