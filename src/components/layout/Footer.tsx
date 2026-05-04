import { owner } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-32 border-t px-6 py-8"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-[11px] tracking-wide" style={{ color: "var(--mono-label)" }}>
          © {year} {owner.name}
        </p>
        <p className="font-mono text-[11px] tracking-wide" style={{ color: "var(--mono-label)" }}>
          Built with Next.js, Motion, and GSAP.
        </p>
      </div>
    </footer>
  );
}
