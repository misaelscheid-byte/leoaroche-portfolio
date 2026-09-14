import { site } from "../data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 pb-24 pt-14 md:px-14 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50" aria-label="Social">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                [ {s.label} ]
              </a>
            ))}
          </nav>
          <a
            href="#top"
            data-cursor="TOP"
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:text-accent">
              ↑
            </span>
          </a>
        </div>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          © {year} {site.name} // Design × Front-end development × Artificial intelligence
        </p>

        <p className="display pointer-events-none mt-12 select-none text-center text-[clamp(3.5rem,15vw,15rem)] leading-none text-white/[0.035]" aria-hidden>
          Aroche
        </p>
      </div>
    </footer>
  );
}
