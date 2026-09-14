import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { faqs } from "../data/site";
import { cn } from "../utils/cn";
import { Reveal, SectionLabel } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-white/10 px-6 py-24 md:px-14 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel right="Before you write">Frequently transmitted questions</SectionLabel>

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="display text-[clamp(2.2rem,4.6vw,4.2rem)]">
              Working with
              <br />
              <span className="text-white/40">a dev abroad.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/55">
              Straight answers to the questions international clients usually ask first. Anything else — just send a
              message.
            </p>
          </Reveal>

          <div className="md:col-span-8">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 0.04}>
                  <div className={cn("border-b border-white/10", i === 0 && "border-t")}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      data-cursor={isOpen ? "CLOSE" : "READ"}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent md:py-7"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="font-mono text-[10px] tracking-widest text-accent">
                          Q{String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-lg font-semibold tracking-tight md:text-xl">{f.q}</span>
                      </span>
                      <span
                        className={cn(
                          "relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500",
                          isOpen && "rotate-45 border-accent bg-accent text-white"
                        )}
                      >
                        <span className="absolute h-px w-3.5 bg-current" />
                        <span className="absolute h-3.5 w-px bg-current" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="a"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 pl-[3.1rem] text-[15px] leading-relaxed text-white/60 md:text-base">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
