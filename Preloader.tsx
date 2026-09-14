import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "../data/site";

const LINES = [
  "> BOOT LEO_AROCHE.SYS",
  "> LOADING VISUAL CORE .......... OK",
  "> SYNCING DESIGN × CODE × AI ... OK",
  "> TRANSMISSION OPEN",
];

const storage = {
  get: () => {
    try {
      return sessionStorage.getItem("la_booted");
    } catch {
      return null;
    }
  },
  set: () => {
    try {
      sessionStorage.setItem("la_booted", "1");
    } catch {
      /* private mode — ignore */
    }
  },
};

export function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(() => !storage.get());
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) {
      onDone();
      return;
    }
    document.body.style.overflow = "hidden";
    const timers: number[] = [];
    LINES.forEach((_, i) => timers.push(window.setTimeout(() => setCount(i + 1), 220 + i * 240)));
    timers.push(window.setTimeout(() => finish(), 220 + LINES.length * 240 + 520));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    storage.set();
    document.body.style.overflow = "";
    setVisible(false);
    onDone();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          onClick={finish}
          data-cursor="SKIP"
        >
          <div className="w-[min(92vw,520px)] px-6">
            <div className="mb-8 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-white font-display text-sm font-black tracking-tighter text-ink">
                {site.initials}
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-bold uppercase tracking-wide">{site.name}</p>
                <p className="label text-[10px] text-white/40">{site.shortRole}</p>
              </div>
            </div>
            <div className="min-h-[112px] space-y-1.5 font-mono text-[12px] text-white/70">
              {LINES.slice(0, count).map((l, i) => (
                <motion.p
                  key={l}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === LINES.length - 1 ? "text-accent" : ""}
                >
                  {l}
                </motion.p>
              ))}
              <span className="inline-block h-3.5 w-2 animate-blink bg-accent align-middle" />
            </div>
            <div className="mt-8 h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <p className="label mt-3 text-[10px] text-white/30">Click anywhere to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
