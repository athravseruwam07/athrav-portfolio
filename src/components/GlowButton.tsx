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

export default function GlowButton({ className, children, onMouseMove, ...props }: Props) {
  // numeric motion values
  const mx = useMotionValue(50); // percentage (0..100)
  const my = useMotionValue(30); // px

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(e.clientY - r.top);
    onMouseMove?.(e);
  };

  // add units for CSS
  const cssMx = useMotionTemplate`${mx}%`;
  const cssMy = useMotionTemplate`${my}px`;

  // Cast the custom CSS variables so TS is happy.
  const style = {
    ['--mx' as any]: cssMx,
    ['--my' as any]: cssMy,
  } as any;

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