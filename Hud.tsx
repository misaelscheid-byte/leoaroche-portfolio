import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, phaseIndex, phases, site } from "../data/site";
import { cn } from "../utils/cn";

type Props = {
  progress: MotionValue<number>;
  active: string;
  motionOn: boolean;
  onToggleMotion: () => void;
};

export function Hud({ progress, active, motionOn, onToggleMotion }: Props) {
  const [pct, setPct] = useState(0);
  const [time, setTime] = useState("--:--:--");

  useMotionValueEvent(progress, "change", (v) => setPct(Math.round(v * 100)));

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: site.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const inHero = active === "hero" || active === "";
  const phase = phases[phaseIndex(pct / 100)];
  const sector = nav.find((n) => n.id === active);

  return (
    <>
      {/* Left: phase / sector */}
      <div className="pointer-events-none fixed bottom-5 left-5 z-40 hidden md:block">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/60 px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] text-white/60 backdrop-blur-md">
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-500",
              inHero ? "bg-accent shadow-[0_0_10px_#ff3d1a]" : "bg-white/30"
            )}
          />
          {inHero || !sector ? (
            <>
              <span>
                PHASE: {phase.num} / {phase.hud}
              </span>
              <span className="text-white/20">|</span>
              <span className="tabular-nums">{String(pct).padStart(3, "0")}%</span>
            </>
          ) : (
            <>
              <span>
                SECTOR: {sector.num} // {sector.label.toUpperCase()}
              </span>
              <span className="text-white/20">|</span>
              <span>TRANSFORMATION 100%</span>
            </>
          )}
        </div>
      </div>

      {/* Right: geo / time / motion toggle */}
      <div className="fixed bottom-5 right-5 z-40 hidden md:block">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/60 px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] text-white/60 backdrop-blur-md">
          <span>GEO: {site.geo}</span>
          <span className="text-white/20">|</span>
          <span className="tabular-nums">
            {time} {site.tzLabel}
          </span>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={onToggleMotion}
            className="pointer-events-auto flex items-center gap-1.5 font-bold text-white transition-colors hover:text-accent"
            data-cursor={motionOn ? "MUTE" : "WAKE"}
            aria-pressed={motionOn}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              {motionOn ? (
                <>
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M19 5a10 10 0 0 1 0 14" />
                </>
              ) : (
                <path d="m16 9 5 5m0-5-5 5" />
              )}
            </svg>
            PULSE [{motionOn ? "ON" : "OFF"}]
          </button>
        </div>
      </div>
    </>
  );
}
