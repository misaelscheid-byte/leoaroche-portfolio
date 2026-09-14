import { marqueeItems } from "../data/site";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative z-10 -mt-px overflow-hidden border-y border-white/10 bg-ink py-4" aria-hidden>
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
            {t}
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
