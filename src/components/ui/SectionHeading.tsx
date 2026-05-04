import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  className?: string;
}

export default function SectionHeading({ index, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-16", className)}>
      <p
        className="mb-3 font-mono text-xs tracking-[0.22em] uppercase"
        style={{ color: "var(--mono-label)" }}
      >
        {index}
      </p>
      <h2 className="font-display text-4xl font-semibold tracking-tight text-text-base sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
