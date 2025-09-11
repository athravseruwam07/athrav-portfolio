'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Loader2, Check } from 'lucide-react';

type Props = {
  socials: { email: string; linkedin: string; github: string };
  formId: string; // your Formspree form id, e.g. "xdklbqyl"
};

export default function ContactSection({ socials, formId }: Props) {
  const [pending, setPending] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setOk(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const good = res.ok;
      setOk(good);
      if (good) {
        form.reset();
        setMsg('');
      }
    } catch {
      setOk(false);
    } finally {
      setPending(false);
    }
  }

  const Card = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative rounded-2xl border border-line bg-surface/90 p-6 shadow-soft"
    >
      {/* sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 -translate-x-[140%] rounded-2xl bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 transition duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-[140%] group-hover:opacity-100"
      />
      {/* ambient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 -z-20 rounded-3xl bg-gradient-to-tr from-neon-from/10 via-neon-via/8 to-neon-to/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );

  const ActionBtn = ({
    children,
    icon,
    href,
  }: {
    children: React.ReactNode;
    icon: React.ReactNode;
    href: string;
  }) => (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl2 border border-white/12 bg-surface px-4 py-2 text-white transition hover:-translate-y-[1px] hover:border-neon-from/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
    >
      {icon}
      {children}
    </Link>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Left: quick actions */}
      <Card>
        <h3 className="text-lg font-semibold text-white">Let’s Connect</h3>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`mailto:${socials.email}`}
            className="inline-flex items-center gap-2 rounded-xl2 border border-white/12 bg-surface px-4 py-2 text-white transition hover:-translate-y-[1px] hover:border-neon-from/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>

          <ActionBtn href={socials.linkedin} icon={<Linkedin className="h-4 w-4" />}>
            LinkedIn
          </ActionBtn>

          <ActionBtn href={socials.github} icon={<Github className="h-4 w-4" />}>
            GitHub
          </ActionBtn>
        </div>

        <p className="mt-4 text-sm text-text-muted">
          Or use the form. It’s wired for static deployments via Formspree.
        </p>
      </Card>

      {/* Right: form */}
      <Card>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-white placeholder:text-text-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-white placeholder:text-text-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white">
              Message
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                maxLength={1500}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-white placeholder:text-text-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
                placeholder="How can I help?"
              />
              <span className="pointer-events-none absolute bottom-1 right-2 select-none text-[10px] text-text-muted/70">
                {msg.length}/1500
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="group relative w-full overflow-hidden rounded-xl2 border border-white/12 bg-surface px-4 py-2 text-white transition hover:-translate-y-[1px] hover:border-neon-from/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from disabled:cursor-not-allowed disabled:opacity-70"
          >
            {/* moving sheen */}
            <span className="btn-sheen" />
            <span className="inline-flex items-center justify-center gap-2">
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : ok === true ? (
                <>
                  <Check className="h-4 w-4" />
                  Sent!
                </>
              ) : (
                'Send'
              )}
            </span>
          </button>

          {ok === false && (
            <p className="text-xs text-rose-300/80">
              Something went wrong. You can always email me at <span className="underline">{socials.email}</span>.
            </p>
          )}

          <p className="text-xs text-text-muted">Powered by Formspree.</p>
        </form>
      </Card>
    </div>
  );
}