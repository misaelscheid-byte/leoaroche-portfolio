import { useState, type FormEvent } from "react";
import { budgets, site } from "../data/site";
import { Button, Dot, Reveal } from "./ui";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-white/25 transition-colors focus:border-accent/70 focus:bg-white/[0.05] focus:outline-none";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", site: "", budget: budgets[0], message: "" });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project brief — ${form.name || "New client"}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Website / company: ${form.site || "—"}`,
        `Budget: ${form.budget}`,
        "",
        "Project:",
        form.message,
        "",
        "— sent from leoaroche portfolio",
      ].join("\n")
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-white/10 px-6 pb-28 pt-28 md:px-14 md:pb-40 md:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,61,26,0.22)_0%,rgba(255,61,26,0)_65%)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* headline */}
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="label inline-flex items-center gap-3 text-[10px] text-accent">
              <Dot /> Transmission open // Initialize collaboration
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mx-auto mt-8 max-w-[14ch] text-balance text-[clamp(2.6rem,7vw,6.8rem)]">
              Have a project that demands an unmistakable digital identity?
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <span className="mx-auto mt-8 block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#ff3d1a]" />
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/60 md:text-xl">
              Direct development, strategic design, video motion, and intelligent execution — engineered as one
              seamless system.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={`mailto:${site.email}`} cursor="SEND" className="w-full sm:w-auto">
                Start project <span aria-hidden>→</span> {site.email}
              </Button>
              <Button href={site.whatsapp} variant="outline" cursor="CHAT" target="_blank" className="w-full sm:w-auto">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3 1 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4.1 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
                </svg>
                WhatsApp channel
              </Button>
            </div>
          </Reveal>
        </div>

        {/* brief form + details */}
        <div className="mt-24 grid gap-12 border-t border-white/10 pt-16 md:mt-32 md:grid-cols-12 md:pt-20">
          <Reveal className="md:col-span-4">
            <p className="label text-[10px] text-accent">Or send a brief</p>
            <h3 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">Tell me what you're building.</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-white/55">
              A few lines are enough. You'll get a reply within 24h with next steps and a time for a short call.
            </p>

            <dl className="mt-10 space-y-3 font-mono text-[11px] uppercase tracking-[0.14em]">
              {[
                ["Email", site.email],
                ["Location", site.location],
                ["Timezone", `${site.tzLabel} · overlaps US & EU`],
                ["Status", "Accepting projects"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 border-b border-white/[0.06] pb-3">
                  <dt className="w-20 shrink-0 text-white/35">{k}</dt>
                  <dd className="break-all text-white/80">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-panel p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="label mb-2 block text-[9px] text-white/40">Name</span>
                  <input required value={form.name} onChange={update("name")} className={field} placeholder="Jane Doe" />
                </label>
                <label className="block">
                  <span className="label mb-2 block text-[9px] text-white/40">Email</span>
                  <input required type="email" value={form.email} onChange={update("email")} className={field} placeholder="jane@company.com" />
                </label>
                <label className="block">
                  <span className="label mb-2 block text-[9px] text-white/40">Company / website</span>
                  <input value={form.site} onChange={update("site")} className={field} placeholder="company.com (optional)" />
                </label>
                <label className="block">
                  <span className="label mb-2 block text-[9px] text-white/40">Budget</span>
                  <select value={form.budget} onChange={update("budget")} className={`${field} appearance-none`}>
                    {budgets.map((b) => (
                      <option key={b} value={b} className="bg-panel">
                        {b}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="label mb-2 block text-[9px] text-white/40">Project</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    className={`${field} resize-none`}
                    placeholder="What are you building, for whom, and what should the site achieve?"
                  />
                </label>
              </div>
              <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {sent ? (
                    <span className="text-accent">✓ Transmission composed — check your mail client</span>
                  ) : (
                    "Opens your mail client · no data stored"
                  )}
                </p>
                <Button type="submit" cursor="SEND">
                  Transmit brief <span aria-hidden>→</span>
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
