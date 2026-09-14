import { motion } from "framer-motion";
import { parameters, steps } from "../data/site";
import { Reveal, SectionLabel } from "./ui";

export function Process() {
  return (
    <section id="transformation" className="relative scroll-mt-20 border-t border-white/10 bg-[#080808] px-6 py-28 md:px-14 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel right="04 stages · one system">02 // Transformation Protocol</SectionLabel>

        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <h2 className="display text-[clamp(2.6rem,6.4vw,6.2rem)]">
              From invisible
              <br />
              <span className="bg-gradient-to-r from-white via-accent-soft to-accent bg-clip-text text-transparent">
                to unmistakable.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="text-pretty text-base leading-relaxed text-white/60 md:text-lg">
              The same sequence every time: understand, direct, fabricate, deploy. No agency layers, no lost
              context — you talk to the person who designs and ships your site.
            </p>
          </Reveal>
        </div>

        {/* steps */}
        <div className="relative mt-16 md:mt-24">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 hidden h-px w-full origin-left bg-gradient-to-r from-accent via-white/30 to-white/10 md:block"
          />
          <div className="grid gap-5 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.12}>
                <article className="group relative h-full rounded-2xl border border-white/10 bg-panel p-7 transition-colors duration-500 hover:border-white/30 md:mt-10">
                  <span className="absolute -top-[calc(2.5rem+1px)] left-7 hidden h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_#ff3d1a] md:block" />
                  <div className="flex items-center justify-between">
                    <span className="display text-5xl text-white/10 transition-colors duration-500 group-hover:text-accent/60">
                      {s.num}
                    </span>
                    <span className="label text-[9px] text-white/30">Stage {s.num} / 04</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight md:text-2xl">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/55">{s.body}</p>
                  <p className="mt-6 border-t border-white/[0.06] pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                    <span className="text-accent">Output:</span> {s.output}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* operating parameters */}
        <Reveal className="mt-16 md:mt-24">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="flex items-center bg-panel-2 px-6 py-6 lg:col-span-1">
              <div>
                <p className="label text-[10px] text-accent">Operating parameters</p>
                <p className="mt-2 text-sm text-white/55">Built for clients abroad.</p>
              </div>
            </div>
            {parameters.map((p) => (
              <div key={p.k} className="bg-panel px-6 py-6">
                <p className="label text-[9px] text-white/35">{p.k}</p>
                <p className="mt-2 font-mono text-sm text-white/90">{p.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
