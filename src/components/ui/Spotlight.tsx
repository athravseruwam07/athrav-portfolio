import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

const Spotlight = forwardRef<SVGSVGElement, SpotlightProps>(
  ({ className, fill = "rgba(34,211,238,0.09)" }, ref) => {
    return (
      <svg
        ref={ref}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 z-0 h-[80vh] w-[140vw] -translate-x-1/2 -translate-y-1/2 opacity-0",
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3787 2842"
        fill="none"
      >
        <defs>
          <filter id="spotlight-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="160" />
          </filter>
        </defs>
        <ellipse
          cx="1893"
          cy="1421"
          rx="1300"
          ry="900"
          fill={fill}
          filter="url(#spotlight-blur)"
        />
      </svg>
    );
  }
);

Spotlight.displayName = "Spotlight";

export default Spotlight;
