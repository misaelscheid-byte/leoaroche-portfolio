import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: accent dot + lagging ring. Shows a label when hovering
 * elements with `data-cursor="LABEL"` (links/buttons default to "OPEN").
 * Disabled on touch devices.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100,
      raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, select, textarea, summary"
      );
      if (!t) {
        setHovering(false);
        setLabel("");
        return;
      }
      setHovering(true);
      const custom = t.getAttribute("data-cursor");
      if (custom !== null) setLabel(custom);
      else if (t.matches("input, select, textarea")) setLabel("");
      else setLabel("OPEN");
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const enter = () => {
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const showLabel = hovering && label.length > 0;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent mix-blend-difference transition-opacity duration-300"
        aria-hidden
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] transition-opacity duration-300"
        aria-hidden
      >
        <div
          className={[
            "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300 ease-out",
            showLabel
              ? "h-16 w-16 border-accent/70 bg-ink/70 backdrop-blur-sm"
              : hovering
                ? "h-10 w-10 border-accent"
                : "h-9 w-9 border-white/40",
            pressed ? "scale-75" : "scale-100",
          ].join(" ")}
        >
          {showLabel && (
            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-white">{label}</span>
          )}
        </div>
      </div>
    </>
  );
}
