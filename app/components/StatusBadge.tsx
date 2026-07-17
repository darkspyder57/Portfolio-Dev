export default function StatusBadge({
  text = "Software Development Engineer",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={`glass-panel inline-flex items-center gap-3 px-5 py-2.5 rounded-full shadow-2xl ${className}`}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-aurora-cyan glow-dot" />
      <span className="font-mono text-xs text-aurora-cyan uppercase tracking-[0.15em] font-bold">
        {text}
      </span>
    </div>
  );
}
