import { AnimatePresence, motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useState, type Ref } from "react";
import { heroImages, phaseIndex, phases, site } from "../data/site";
import { useScramble } from "../hooks/useScramble";
import { cn } from "../utils/cn";

type Props = {
  ref: Ref<HTMLElement>;
  progress: MotionValue<number>;
  booted: boolean;
};

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: `${(i % 7) * 0.9}s`,
  size: i % 3 === 0 ? 3 : 2,
}));

export function Hero({ ref, progress, booted }: Props) {
  const [phase, setPhase] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const i = phaseIndex(v);
    setPhase((prev) => (prev === i ? prev : i));
  });

  /* image layers */
  const humanOpacity = useTransform(progress, [0, 0.26, 0.4], [1, 1, 0]);
  const cyborgOpacity = useTransform(progress, [0.26, 0.4, 0.62, 0.76], [0, 1, 1, 0]);
  const machineOpacity = useTransform(progress, [0.62, 0.76], [0, 1]);
  const glitchA = useTransform(progress, [0.23, 0.33, 0.43], [0, 1, 0]);
  const glitchB = useTransform(progress, [0.59, 0.69, 0.79], [0, 1, 0]);
  const scale = useTransform(progress, [0, 1], [1.1, 1]);
  const glow = useTransform(progress, [0, 0.5, 1], [0.25, 0.5, 0.85]);
  const rail = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  const current = phases[phase];
  const title = useScramble(current.title, `${phase}-${booted}`);
  const lines = title.split("\n");

  return (
    <section ref={ref} id="hero" className="relative h-[380vh] md:h-[460vh]" aria-label="Introduction">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* ambient glow */}
        <motion.div
          style={{ opacity: glow }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,61,26,0.35)_0%,rgba(255,61,26,0)_65%)] blur-2xl"
        />

        {/* particles */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="absolute animate-float rounded-full bg-accent/60"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay }}
            />
          ))}
        </div>

        {/* portrait layers */}
        <div className="absolute inset-0 flex justify-center overflow-hidden">
          <motion.div style={{ scale }} className="hero-mask relative h-full shrink-0 aspect-[2/3]">
            <motion.img
              src={heroImages.human}
              alt="Leo Aroche — portrait"
              style={{ opacity: humanOpacity }}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <motion.img
              src={heroImages.cyborg}
              alt=""
              style={{ opacity: cyborgOpacity }}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <motion.img
              src={heroImages.machine}
              alt=""
              style={{ opacity: machineOpacity }}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />

            {/* glitch slices during transitions */}
            <motion.div style={{ opacity: glitchA }} className="pointer-events-none absolute inset-0 mix-blend-screen">
              <img src={heroImages.cyborg} alt="" className="absolute inset-0 h-full w-full animate-glitch object-cover [filter:hue-rotate(-30deg)_saturate(3)]" />
              <img src={heroImages.cyborg} alt="" className="absolute inset-0 h-full w-full animate-glitch object-cover [animation-delay:-0.27s] [filter:hue-rotate(150deg)]" />
            </motion.div>
            <motion.div style={{ opacity: glitchB }} className="pointer-events-none absolute inset-0 mix-blend-screen">
              <img src={heroImages.machine} alt="" className="absolute inset-0 h-full w-full animate-glitch object-cover [filter:hue-rotate(-30deg)_saturate(3)]" />
              <img src={heroImages.machine} alt="" className="absolute inset-0 h-full w-full animate-glitch object-cover [animation-delay:-0.27s] [filter:hue-rotate(150deg)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* scanning beam during transitions */}
        <motion.div style={{ opacity: glitchA }} className="pointer-events-none absolute inset-x-0 top-0 h-full">
          <div className="h-[2px] w-full animate-scan bg-accent/70 shadow-[0_0_24px_4px_rgba(255,61,26,0.5)]" />
        </motion.div>
        <motion.div style={{ opacity: glitchB }} className="pointer-events-none absolute inset-x-0 top-0 h-full">
          <div className="h-[2px] w-full animate-scan bg-accent/70 shadow-[0_0_24px_4px_rgba(255,61,26,0.5)] [animation-delay:-3s]" />
        </motion.div>

        {/* legibility gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#060606_90%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/90 to-transparent" />

        {/* top meta */}
        <div className="pointer-events-none absolute inset-x-0 top-24 flex items-start justify-between px-6 md:top-28 md:px-14">
          <div>
            <p className="label text-[10px] text-accent">Evolution sequence 0.1 — 0.4</p>
            <p className="mt-1.5 font-mono text-[11px] text-white/50">Human intuition amplified by computational design.</p>
          </div>
          <div className="hidden text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/30 md:block">
            <p>Render: scroll sync</p>
            <p>FPS: 60 / zero latency</p>
          </div>
        </div>

        {/* progress rail */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:right-10">
          <span className="label text-[9px] text-white/30 [writing-mode:vertical-rl]">SEQ</span>
          <div className="relative h-40 w-px bg-white/15">
            <motion.div style={{ height: rail }} className="absolute left-0 top-0 w-px bg-accent shadow-[0_0_10px_#ff3d1a]" />
          </div>
          <div className="flex flex-col gap-2">
            {phases.map((p, i) => (
              <span
                key={p.num}
                className={cn(
                  "font-mono text-[9px] tracking-widest transition-colors duration-500",
                  i === phase ? "text-accent" : "text-white/25"
                )}
              >
                {p.num}
              </span>
            ))}
          </div>
        </div>

        {/* phase copy */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "pointer-events-none absolute inset-x-0 flex px-6 md:px-14",
              phase === 0 ? "inset-y-0 items-center justify-center text-center" : "bottom-0 pb-20 md:pb-24",
              phase !== 0 && current.align === "left" && "justify-start text-left",
              phase !== 0 && current.align === "right" && "justify-end text-right",
              phase !== 0 && current.align === "center" && "justify-center text-center"
            )}
          >
            <div className={cn("max-w-[52rem]", phase === 0 && "flex flex-col items-center")}>
              {phase === 0 ? (
                <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-ink/50 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#ff3d1a]" />
                  {current.kicker}
                </span>
              ) : (
                <p className="label mb-4 text-[10px] text-accent md:mb-5">{current.kicker}</p>
              )}

              <h1
                className={cn(
                  "display text-balance",
                  phase === 0
                    ? "text-[clamp(3.4rem,13vw,11rem)]"
                    : "text-[clamp(2.6rem,7.2vw,6.4rem)]"
                )}
              >
                {lines.map((l, i) => (
                  <span
                    key={i}
                    className={cn(
                      "block",
                      i === 1 && "bg-gradient-to-r from-white via-accent-soft to-accent bg-clip-text text-transparent"
                    )}
                  >
                    {l}
                  </span>
                ))}
              </h1>

              {phase === 0 && (
                <>
                  <p className="mt-5 font-display text-[clamp(1.1rem,2.6vw,2rem)] font-medium uppercase tracking-[0.06em] text-white/75 [font-stretch:95%]">
                    {site.role}
                  </p>
                  <p className="label mt-4 text-[11px] text-accent">
                    Design <span className="mx-2 text-white/30">×</span> Code <span className="mx-2 text-white/30">×</span> AI
                  </p>
                  <p className="label mt-10 flex items-center gap-3 text-[10px] text-white/50">
                    <motion.span
                      animate={{ y: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                      className="inline-block"
                    >
                      ↓
                    </motion.span>
                    Scroll to commence transformation
                  </p>
                </>
              )}

              {phase !== 0 && current.body && (
                <p
                  className={cn(
                    "mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg",
                    current.align === "right" && "ml-auto",
                    current.align === "center" && "mx-auto"
                  )}
                >
                  {current.body}
                </p>
              )}

              {phase === 3 && (
                <a
                  href="#work"
                  data-cursor="VIEW"
                  className="pointer-events-auto mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white"
                >
                  View selected work
                  <span aria-hidden>↓</span>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
