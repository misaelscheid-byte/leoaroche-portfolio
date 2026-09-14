import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, site } from "../data/site";
import { cn } from "../utils/cn";

export function Nav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "flex h-[72px] items-center justify-between px-5 transition-all duration-500 md:px-8",
          scrolled && !open && "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl"
        )}
      >
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-3" data-cursor="TOP" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-white font-display text-[13px] font-black tracking-tighter text-ink transition-transform duration-300 group-hover:rotate-[-6deg]">
            {site.initials}
          </span>
          <span className="leading-none">
            <span className="flex items-center gap-1.5 font-display text-[13px] font-bold uppercase tracking-wide">
              {site.name}
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#ff3d1a]" />
            </span>
            <span className="label mt-1 block text-[9px] text-white/40">{site.shortRole}</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={cn(
                "label relative py-2 text-[10px] transition-colors duration-300 hover:text-white",
                active === n.id ? "text-white" : "text-white/45"
              )}
            >
              <span className={cn("mr-2", active === n.id ? "text-accent" : "text-white/30")}>{n.num}</span>
              {n.label}
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-500",
                  active === n.id ? "w-full" : "w-0"
                )}
              />
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.14em] transition-all duration-300 hover:border-white hover:bg-white hover:text-ink sm:inline-flex"
            data-cursor="COMM"
          >
            INITIALIZE_COMM
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/20 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-cursor={open ? "CLOSE" : "MENU"}
          >
            <span className={cn("absolute h-px w-4 bg-white transition-all duration-300", open ? "rotate-45" : "-translate-y-1")} />
            <span className={cn("absolute h-px w-4 bg-white transition-all duration-300", open ? "-rotate-45" : "translate-y-1")} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 flex flex-col justify-between bg-ink/95 px-6 pb-8 pt-10 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {nav.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                  className="display flex items-baseline gap-4 border-b border-white/10 py-5 text-4xl"
                >
                  <span className="font-mono text-xs font-normal tracking-widest text-accent">{n.num}</span>
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <div className="space-y-4">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-accent py-4 font-mono text-xs font-bold tracking-[0.16em]"
              >
                INITIALIZE_COMM
              </a>
              <p className="label text-center text-[10px] text-white/30">
                {site.location} · {site.tzLabel}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
