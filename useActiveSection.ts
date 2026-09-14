import { useEffect, useState } from "react";

/**
 * Tracks which section (by id) currently occupies the middle band of the viewport.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best = "";
        let bestRatio = 0;
        for (const [id, r] of ratios) {
          if (r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids.join("|")]);

  return active;
}
