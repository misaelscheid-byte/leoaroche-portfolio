import phaseHuman from "../assets/phase-human.jpg";
import phaseCyborg from "../assets/phase-cyborg.jpg";
import phaseMachine from "../assets/phase-machine.jpg";
import workSterling from "../assets/work-sterling.jpg";
import workIronside from "../assets/work-ironside.jpg";

/* ------------------------------------------------------------------ */
/*  EDIT ME — all personal info lives here                              */
/* ------------------------------------------------------------------ */
export const site = {
  name: "Leo Aroche",
  initials: "LA",
  role: "Creative Developer",
  shortRole: "Creative Dev",
  email: "leoaroche.dev@gmail.com",
  // Replace with your number in international format, e.g. 5551981349189
  whatsapp: "https://wa.me/5551981349189?text=Hi%20Leo%2C%20I%27d%20like%20to%20start%20a%20project.",
  location: "Balneário Camboriú, Brazil",
  geo: "26°59'S 48°38'W",
  timezone: "America/Sao_Paulo",
  tzLabel: "GMT-3",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/leoaroche/" },
    { label: "GitHub", href: "https://github.com/misaelscheid-byte" },
    { label: "Email", href: "mailto:leoaroche.dev@gmail.com" },
  ],
};

export const nav = [
  { id: "identity", num: "01", label: "Identity" },
  { id: "transformation", num: "02", label: "Transformation" },
  { id: "work", num: "03", label: "Selected Work" },
  { id: "contact", num: "04", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/*  HERO — scroll-driven evolution sequence                             */
/* ------------------------------------------------------------------ */
export const heroImages = {
  human: phaseHuman,
  cyborg: phaseCyborg,
  machine: phaseMachine,
};

export const phases = [
  {
    num: "01",
    hud: "HUMAN STATE",
    kicker: "PHASE 01 // HUMAN INTELLECT",
    title: "LEO AROCHE",
    sub: "Creative Developer",
    body: "",
    align: "center" as const,
  },
  {
    num: "02",
    hud: "AUGMENTATION",
    kicker: "// PHASE 02: AUGMENTATION",
    title: "HUMAN\nAUGMENTATION.",
    sub: "",
    body: "The human form begins to merge with machine precision. Identity remains human while technology becomes part of the visual language.",
    align: "left" as const,
  },
  {
    num: "03",
    hud: "CYBERNETIC CONVERSION",
    kicker: "// PHASE 03: CYBERNETIC CONVERSION",
    title: "CYBERNETIC\nCONVERSION.",
    sub: "",
    body: "The transformation reaches its critical state: human intuition meets mechanical structure, cinematic motion and machine precision.",
    align: "right" as const,
  },
  {
    num: "04",
    hud: "MACHINE STATE",
    kicker: "// PHASE 04: MACHINE STATE",
    title: "HUMAN INTENT.\nMACHINE PRECISION.",
    sub: "",
    body: "Every pixel engineered. Every interaction intentional. This is what your brand's digital identity should feel like.",
    align: "center" as const,
  },
];

export function phaseIndex(p: number) {
  if (p < 0.22) return 0;
  if (p < 0.5) return 1;
  if (p < 0.72) return 2;
  return 3;
}

/* ------------------------------------------------------------------ */
/*  01 — IDENTITY                                                       */
/* ------------------------------------------------------------------ */
export const pillars = [
  {
    num: "01",
    tag: "Design",
    title: "I use design to think.",
    body: "Clear visual hierarchy, useful composition and design decisions that help people understand a business quickly.",
  },
  {
    num: "02",
    tag: "Code",
    title: "I use code to build.",
    body: "Responsive front-end implementation focused on fast, clean and mobile-first experiences that hold up under real traffic.",
  },
  {
    num: "03",
    tag: "AI",
    title: "I use AI to explore.",
    body: "Used as a creative accelerator to explore ideas, prototype faster and expand what can be built for a given budget.",
  },
];

export const specs = [
  { k: "Name", v: "Leo Aroche" },
  { k: "Role", v: "Freelance Web Designer & Developer" },
  { k: "Location", v: "Balneário Camboriú, Brazil" },
  { k: "Timezone", v: "GMT-3 — overlaps US & EU hours" },
  { k: "Languages", v: "English · Portuguese" },
  { k: "Focus", v: "Small business digital presence" },
];

export const manifesto =
  "Working at the collision of engineering, digital filmmaking, and conversion strategy. Because a website shouldn't simply sit pretty — it exists to engage, tell an undeniable brand story, and drive measurable real-world commercial traction.";

export const stats = [
  { v: "100%", k: "Remote-first" },
  { v: "GMT-3", k: "US / EU overlap" },
  { v: "< 24h", k: "Response time" },
  { v: "1 : 1", k: "Direct contact, no agency" },
];

/* ------------------------------------------------------------------ */
/*  02 — TRANSFORMATION PROTOCOL (process)                              */
/* ------------------------------------------------------------------ */
export const steps = [
  {
    num: "01",
    title: "Diagnosis",
    body: "A short call to understand your business, audience and what the site must achieve. I audit your current presence and competitors.",
    output: "Goals · scope · timeline",
  },
  {
    num: "02",
    title: "Blueprint",
    body: "Structure, copy hierarchy and visual direction. You see the concept before a single line of production code is written.",
    output: "Direction · wireframe · moodboard",
  },
  {
    num: "03",
    title: "Fabrication",
    body: "Design and development happen together. Motion, video and AI-assisted assets are built in, not bolted on. Weekly previews on a live link.",
    output: "Live staging · revisions",
  },
  {
    num: "04",
    title: "Deployment",
    body: "Performance tuning, SEO essentials, analytics and a clean handover. Launch day is calm because everything was tested before.",
    output: "Launch · handover · support",
  },
];

export const parameters = [
  { k: "Clients", v: "US · UK · EU · AU" },
  { k: "Comms", v: "English, async-first" },
  { k: "Overlap", v: "Full US business hours" },
  { k: "Billing", v: "International invoicing" },
];

/* ------------------------------------------------------------------ */
/*  03 — SELECTED WORK                                                  */
/* ------------------------------------------------------------------ */
export type Project = {
  id: string;
  caseId: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
  sector: string;
  deliverables: string;
  preview: {
    url: string;
    brand: string;
    menu: string[];
    cta: string;
    eyebrow: string;
    headline: string;
    style: "editorial" | "brutalist";
  };
};

export const projects: Project[] = [
  {
    id: "sterling-vane",
    caseId: "01_RESIDENTIAL",
    label: "01 System Launch",
    title: "Sterling & Vane",
    description:
      "Premium residential plumbing, thermal engineering & climate control. Reimagined as an architectural, dark editorial digital experience that turns an everyday service into an elevated luxury consultation.",
    tags: ["Tailwind Architecture", "Dark Editorial", "Conversion Funnel"],
    href: "#",
    image: workSterling,
    sector: "Home services",
    deliverables: "Design · Build · Copy structure",
    preview: {
      url: "sterlingandvane.com",
      brand: "Sterling & Vane",
      menu: ["Services", "Projects", "Studio", "Contact"],
      cta: "Book consultation",
      eyebrow: "Residential · Thermal · Climate",
      headline: "Engineered comfort, quietly luxurious.",
      style: "editorial",
    },
  },
  {
    id: "ironside",
    caseId: "02_INTERACTIVE",
    label: "02 Motion Concept",
    title: "Ironside Grooming Co.",
    description:
      "Distinguished gentleman's barbershop & apothecary lounge. Built around bespoke scroll-scrubbed video transformations, brutalist typography, tactile sound interactions, and frictionless booking appointments.",
    tags: ["Video Scrub Motion", "WebGL Accents", "Apothecary UI"],
    href: "#",
    image: workIronside,
    sector: "Barbershop & retail",
    deliverables: "Design · Build · Motion · Video",
    preview: {
      url: "ironsidegrooming.co",
      brand: "IRONSIDE",
      menu: ["Cuts", "Apothecary", "Lounge", "Book"],
      cta: "Book a chair",
      eyebrow: "Est. Barbershop & Apothecary",
      headline: "Sharp. Since day one.",
      style: "brutalist",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  STACK                                                               */
/* ------------------------------------------------------------------ */
export const stack = [
  { k: "Front-end", v: "JavaScript ES6+" },
  { k: "Styling", v: "Tailwind CSS" },
  { k: "Compute", v: "AI Integration" },
  { k: "Motion", v: "Canvas / Shaders" },
  { k: "Cinema", v: "Video Direction" },
  { k: "Conversion", v: "Paid Traffic & Ads" },
  { k: "Systems", v: "Responsive Architecture" },
  { k: "Performance", v: "Core Web Vitals · SEO" },
];

export const marqueeItems = [
  "Available for new projects",
  "US · UK · EU · AU clients",
  "Web design",
  "Front-end development",
  "Motion & video",
  "AI integration",
  "Conversion-first",
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */
export const faqs = [
  {
    q: "Do you work with clients outside Brazil?",
    a: "Yes — most of my work is for clients in the US, UK, Europe and Australia. Everything happens in English, remote-first, with async updates and calls scheduled in your timezone.",
  },
  {
    q: "How long does a project take?",
    a: "A focused landing page or brand site usually ships in 2–4 weeks. Larger, motion-heavy experiences take 4–8 weeks. You get a clear timeline right after the diagnosis call.",
  },
  {
    q: "What do you need from me to start?",
    a: "A short call, your goals, and any brand material you already have. If you have nothing yet, that's fine — direction, copy structure and visual identity are part of the process.",
  },
  {
    q: "Do you also handle copy, motion and video?",
    a: "Yes. Design, development, motion and video direction are handled as one system, so nothing gets lost between different vendors.",
  },
  {
    q: "How do payments work?",
    a: "International invoicing in USD or EUR. A deposit reserves your slot and the balance is due at launch. Everything is confirmed in a written proposal before we start.",
  },
  {
    q: "Can I update the site myself afterwards?",
    a: "Depends on the build. Static sites include a handover document and optional maintenance; CMS-based builds let you edit content directly.",
  },
];

export const budgets = [
  "Not sure yet",
  "Under $1.5k",
  "$1.5k – $4k",
  "$4k – $8k",
  "$8k+",
];
