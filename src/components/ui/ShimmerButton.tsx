"use client";

import { cn } from "@/lib/utils";

interface ShimmerButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function ShimmerButton({
  href,
  children,
  className,
  target,
  rel,
}: ShimmerButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-sm px-6 py-3",
        "border border-accent/60 bg-accent/10 text-accent",
        "font-mono text-sm tracking-wide",
        "hover:bg-accent/15 hover:border-accent focus-visible:outline-none",
        "transition-colors duration-[240ms]",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[600ms] ease-snappy"
        style={{
          background:
            "linear-gradient(105deg, transparent 20%, rgba(34,211,238,0.2) 50%, transparent 80%)",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
