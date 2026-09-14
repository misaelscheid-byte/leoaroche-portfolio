import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/* Section eyebrow: "01 // MANIFESTO & IDENTITY ———————— [meta]" */
export function SectionLabel({
  children,
  right,
  className,
}: {
  children: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex items-center gap-4 md:mb-14", className)}>
      <span className="label whitespace-nowrap text-accent">{children}</span>
      <span className="h-px flex-1 bg-white/10" />
      {right && <span className="label hidden text-white/30 sm:block">{right}</span>}
    </div>
  );
}

/* Fade-up on scroll */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.02] px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-white/75 transition-colors hover:border-accent/60 hover:text-white">
      {children}
    </span>
  );
}

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  cursor?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  target?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  cursor = "OPEN",
  type = "button",
  onClick,
  target,
}: ButtonProps) {
  const base =
    "group/btn relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.16em] transition-all duration-300 will-change-transform";
  const variants = {
    primary:
      "bg-accent text-white shadow-[0_0_44px_rgba(255,61,26,0.35)] hover:-translate-y-0.5 hover:shadow-[0_0_70px_rgba(255,61,26,0.55)] hover:bg-[#ff4f2e]",
    outline:
      "border border-white/20 bg-transparent text-white hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/[0.04]",
    ghost: "px-0 py-0 text-white hover:text-accent",
  };
  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <a
        href={href}
        data-cursor={cursor}
        className={cls}
        onClick={onClick}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} data-cursor={cursor} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

/* Small pulsing dot */
export function Dot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}
