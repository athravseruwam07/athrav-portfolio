export default function AvailableBadge() {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-sm border px-3 py-1.5"
      style={{
        borderColor: "rgba(34,211,238,0.3)",
        backgroundColor: "rgba(34,211,238,0.06)",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-accent animate-blink"
        style={{ boxShadow: "0 0 6px rgba(34,211,238,0.7)" }}
      />
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">
        Open to internships
      </span>
    </span>
  );
}
