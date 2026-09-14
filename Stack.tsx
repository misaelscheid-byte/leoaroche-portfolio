import { stack } from "../data/site";
import { Reveal, SectionLabel } from "./ui";

export function Stack() {
  return (
    <section id="stack" className="relative border-t border-white/10 bg-[#080808] px-6 py-24 md:px-14 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel right={`${String(stack.length).padStart(2, "0")} modules loaded`}>
          Synthesis core // Stack capabilities
        </SectionLabel>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
          {stack.map((s, i) => (
            <Reveal key={s.k} delay={(i % 4) * 0.06} className="h-full">
              <div className="group relative h-full bg-panel p-6 transition-colors duration-500 hover:bg-panel-2 md:p-8">
                <span className="absolute right-5 top-5 font-mono text-[9px] tracking-widest text-white/20 transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block h-1 w-1 rounded-full bg-white/30 transition-all duration-500 group-hover:w-8 group-hover:bg-accent" />
                <p className="label mt-8 text-[9px] text-white/40">{s.k}</p>
                <p className="mt-2 font-mono text-sm font-bold text-white md:text-[15px]">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
