import { manifesto, pillars, specs, stats } from "../data/site";
import { Reveal, SectionLabel } from "./ui";

export function Identity() {
  return (
    <section id="identity" className="relative scroll-mt-20 px-6 py-28 md:px-14 md:py-40">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel right="Manifesto v2.0 · read time 01 min">01 // Manifesto & Identity</SectionLabel>

        <Reveal>
          <h2 className="display text-[clamp(2.6rem,6.4vw,6.2rem)]">
            I don't separate
            <br />
            <span className="text-white/40">design from development.</span>
          </h2>
        </Reveal>

        <div className="mt-16 h-px w-full bg-white/10 md:mt-20" />

        {/* pillars */}
        <div className="mt-10 grid gap-5 md:grid-cols-3 md:mt-14">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.1} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-panel p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50 md:p-9">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-all duration-700 group-hover:bg-accent/20" />
                <span className="absolute right-6 top-6 font-display text-6xl font-black text-white/[0.04] transition-colors duration-500 group-hover:text-accent/10">
                  {p.num}
                </span>
                <span className="block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#ff3d1a]" />
                <p className="label mt-8 text-[10px] text-accent">
                  {p.num} // {p.tag}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-[1.7rem]">{p.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/55">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* specs + manifesto */}
        <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <p className="label text-[10px] text-accent">Background specs</p>
            <dl className="mt-5 space-y-2.5 font-mono text-[12px] uppercase tracking-[0.12em]">
              {specs.map((s) => (
                <div key={s.k} className="flex gap-3 border-b border-white/[0.06] pb-2.5">
                  <dt className="w-24 shrink-0 text-white/35">{s.k}:</dt>
                  <dd className="text-white/80">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <p className="text-pretty text-xl leading-relaxed text-white/85 md:text-[1.7rem] md:leading-snug">{manifesto}</p>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.k} className="bg-panel px-5 py-6">
                  <p className="display text-3xl text-white md:text-4xl">{s.v}</p>
                  <p className="label mt-2 text-[9px] text-white/40">{s.k}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
