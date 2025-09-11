'use client';
import { motion, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

export function GlowButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  return (
    <motion.a
      href={href}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100 + '%');
        my.set(((e.clientTarget as any)?.clientY ?? e.clientY) - r.top + 'px');
      }}
      style={{ '--mx': mx as any, '--my': my as any } as React.CSSProperties}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl2 px-5 py-3 font-medium text-white',
        'bg-gradient-to-r from-neon-from via-neon-via to-neon-to',
        'shadow-[0_8px_30px_rgb(0,0,0,0.25)] transition-transform duration-200 hover:scale-[1.02]',
        'after:absolute after:inset-0 after:rounded-xl2 after:bg-white/0 after:pointer-events-none',
        className
      )}
    >
      {children}
    </motion.a>
  );
}