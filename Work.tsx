import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { projects, site, type Project } from "../data/site";
import { cn } from "../utils/cn";
import { Reveal, SectionLabel, Tag } from "./ui";

/* ---------- Browser mockup with 3D tilt ---------- */
function BrowserFrame({ project }: { project: Project }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 120, damping: 18 });
  const shineX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(my, [0, 1], ["0%", "100%"]);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const { preview } = project;
  const editorial = preview.style === "editorial";

  return (
    <div className="[perspective:1400px]">
      <motion.a
        href={project.href}
        target={project.href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        data-cursor="VIEW"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-colors duration-500 hover:border-accent/50"
      >
        {/* browser chrome */}
        <div className="flex h-10 items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="mx-auto flex items-center gap-2 rounded-md bg-black/40 px-3 py-1 font-mono text-[10px] text-white/40">
            <svg width="9" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            {preview.url}
          </div>
        </div>

        {/* fake site */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} — website preview`}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30" />

          {/* mini nav */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 text-white/80 md:px-7">
            <span className={cn("text-[12px] tracking-wide", editorial ? "font-serif italic" : "display text-[13px]")}>
              {preview.brand}
            </span>
            <div className="hidden gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55 sm:flex">
              {preview.menu.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <span className="rounded-full border border-white/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em]">
              {preview.cta}
            </span>
          </div>

          {/* hero copy */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <p className="label mb-3 text-[9px] text-accent">{preview.eyebrow}</p>
            <p
              className={cn(
                "max-w-md text-balance leading-[1.02] text-white",
                editorial
                  ? "font-serif text-[clamp(1.5rem,3.2vw,2.6rem)] font-medium tracking-tight"
                  : "display text-[clamp(1.8rem,3.6vw,3rem)]"
              )}
            >
              {preview.headline}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className={cn("h-px w-10", editorial ? "bg-[#c9a36b]" : "bg-accent")} />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
            </div>
          </div>

          {/* shine */}
          <motion.div
            style={{ left: shineX, top: shineY }}
            className="pointer-events-none absolute h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        {/* case badge */}
        <span className="absolute left-4 top-14 rounded-md border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-white/70 backdrop-blur">
          CASE: {project.caseId}
        </span>

        {/* hover corner */}
        <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </motion.a>
    </div>
  );
}

/* ---------- Project row ---------- */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-14">
      <Reveal className={cn("md:col-span-7", flip && "md:order-2")}>
        <BrowserFrame project={project} />
      </Reveal>
      <Reveal delay={0.12} className={cn("md:col-span-5", flip && "md:order-1")}>
        <p className="label text-[10px] text-accent">{project.label}</p>
        <h3 className="display mt-5 text-[clamp(2rem,4.2vw,3.6rem)]">{project.title}</h3>
        <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-white/60 md:text-lg">{project.description}</p>

        <dl className="mt-7 grid grid-cols-2 gap-4 font-mono text-[11px] uppercase tracking-[0.14em]">
          <div>
            <dt className="text-white/30">Sector</dt>
            <dd className="mt-1 text-white/80">{project.sector}</dd>
          </div>
          <div>
            <dt className="text-white/30">Deliverables</dt>
            <dd className="mt-1 text-white/80">{project.deliverables}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <a
          href={project.href}
          target={project.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          data-cursor="OPEN"
          className="group/link mt-10 inline-flex items-center gap-3 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-accent"
        >
          Explore live project
          <span className="text-accent transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">↗</span>
          <span className="block h-px w-0 bg-accent transition-all duration-500 group-hover/link:w-12" />
        </a>
      </Reveal>
    </div>
  );
}

/* ---------- Section ---------- */
export function Work() {
  return (
    <section id="work" className="relative scroll-mt-20 border-t border-white/10 px-6 py-28 md:px-14 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel right={`Strict curation: ${String(projects.length).padStart(2, "0")} works`}>
          03 // Selected case studies
        </SectionLabel>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="display text-[clamp(2.6rem,6.4vw,6.2rem)]">Crafted experiences</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-white/50 md:text-base">
              Each project is built as a complete system — design, code, motion and conversion strategy shipped
              together, not stitched from separate vendors.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}

          {/* reserved slot */}
          <Reveal>
            <a
              href="#contact"
              data-cursor="CLAIM"
              className="group relative block overflow-hidden rounded-2xl border border-dashed border-white/20 p-10 transition-colors duration-500 hover:border-accent/70 md:p-16"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/0 blur-3xl transition-all duration-700 group-hover:bg-accent/15" />
              <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <p className="label text-[10px] text-accent">
                    {String(projects.length + 1).padStart(2, "0")} Slot reserved
                  </p>
                  <h3 className="display mt-5 text-[clamp(2rem,5vw,4.4rem)] text-white/90">
                    Your project
                    <br />
                    <span className="text-outline">goes here.</span>
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
                    Curation stays strict on purpose. I take on a limited number of builds so every one of them gets
                    full attention — from first call to launch.
                  </p>
                </div>
                <span className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                  Claim this slot <span aria-hidden>→</span>
                </span>
              </div>
              <p className="label relative mt-10 text-[9px] text-white/25">
                Status: accepting projects · {site.tzLabel} · remote worldwide
              </p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
