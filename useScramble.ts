import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01";

/**
 * Decodes `target` from random glyphs into the final string.
 * Re-runs whenever `target` or `trigger` changes.
 */
export function useScramble(target: string, trigger: unknown = true, speed = 28) {
  const [out, setOut] = useState(target);

  useEffect(() => {
    let frame = 0;
    const total = Math.max(14, Math.round(target.length * 1.6));
    const id = window.setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / total) * target.length * 1.15);
      let s = "";
      for (let i = 0; i < target.length; i++) {
        const c = target[i];
        if (c === " " || c === "\n" || c === "." || i < revealed) s += c;
        else s += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      if (frame >= total) {
        setOut(target);
        window.clearInterval(id);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [target, trigger, speed]);

  return out;
}
