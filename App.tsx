import { useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Contact } from "./components/Contact";
import { Cursor } from "./components/Cursor";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Hud } from "./components/Hud";
import { Identity } from "./components/Identity";
import { Marquee } from "./components/Marquee";
import { Nav } from "./components/Nav";
import { Preloader } from "./components/Preloader";
import { Process } from "./components/Process";
import { Stack } from "./components/Stack";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Work } from "./components/Work";
import { useActiveSection } from "./hooks/useActiveSection";

const SECTION_IDS = ["hero", "identity", "transformation", "work", "stack", "faq", "contact"];

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  // Hero progress measured manually (0 → hero top at viewport top,
  // 1 → hero bottom at viewport bottom). Deterministic, no observer lag.
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const range = el.offsetHeight - window.innerHeight;
        const p = range > 0 ? Math.min(1, Math.max(0, (window.scrollY - el.offsetTop) / range)) : 0;
        // eslint-disable-next-line no-console
        console.log(
          `[hero-writer] tag=${(scrollYProgress as unknown as { __tag?: string }).__tag} y=${window.scrollY} p=${p.toFixed(3)}`
        );
        scrollYProgress.set(p);
        document
          .getElementById("top")
          ?.setAttribute(
            "data-p",
            JSON.stringify({ y: window.scrollY, top: el.offsetTop, h: el.offsetHeight, vh: window.innerHeight, p })
          );
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [scrollYProgress]);

  const [booted, setBooted] = useState(false);
  const [motionOn, setMotionOn] = useState(true);
  const ids = useMemo(() => SECTION_IDS, []);
  const active = useActiveSection(ids);

  // stack/faq belong to the nearest numbered sector for nav highlighting
  const navActive = active === "stack" ? "work" : active === "faq" ? "contact" : active;

  return (
    <div id="top" data-motion={motionOn ? "on" : "off"} className="relative min-h-screen bg-ink text-white">
      <Preloader onDone={() => setBooted(true)} />
      <Cursor />
      <Nav active={navActive} />

      <main>
        <Hero ref={heroRef} progress={scrollYProgress} booted={booted} />
        <Marquee />
        <Identity />
        <Process />
        <Work />
        <Stack />
        <Faq />
        <Contact />
      </main>

      <Footer />

      <Hud progress={scrollYProgress} active={navActive} motionOn={motionOn} onToggleMotion={() => setMotionOn((v) => !v)} />
      <WhatsAppButton />

      {/* film grain + scanlines */}
      {motionOn && (
        <>
          <div className="grain" aria-hidden />
          <div className="scanlines" aria-hidden />
        </>
      )}
    </div>
  );
}
