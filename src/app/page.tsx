'use client';

import ContactSection from '@/components/ContactSection';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { ProjectCard } from '@/components/ProjectCard';
import { SkillBadge } from '@/components/SkillBadge';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationCard, type Education } from '@/components/EducationCard';
import { Overview } from '@/components/Overview';
import { projects, skills, experience, socials } from '@/lib/data';
import { Github, Linkedin, Mail } from 'lucide-react';

const uw: Education = {
  school: 'University of Waterloo',
  program: 'BASc, Mechatronics Engineering',
  dates: 'Sept 2025 – Apr 2030',
  location: 'Waterloo, Ontario, Canada',
  logo: '/logos/uwaterloo.png',
  details:
    'Relevant coursework: Programming (C++, OOP), Applied Math (Python, Linear Algebra), Engineering Design (AutoCAD, SolidWorks).',
};

/* --------------------- simple typewriter --------------------- */
function Typewriter({
  words,
  typingSpeed = 70,
  eraseSpeed = 45,
  hold = 1200,
  blinkCycles = 3,
  blinkMs = 220,
}: {
  words: string[];
  typingSpeed?: number;
  eraseSpeed?: number;
  hold?: number;
  blinkCycles?: number;
  blinkMs?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [dir, setDir] = useState<'type' | 'blink' | 'erase'>('type');
  const [blinks, setBlinks] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const mounted = useRef(true);

  const maxLen = useMemo(() => Math.max(...words.map(w => w.length)), [words]);
  const current = useMemo(() => words[i % words.length], [i, words]);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    let t: number;

    if (dir === 'type') {
      if (text.length < current.length) {
        t = window.setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        setDir('blink'); setBlinks(0);
      }
    } else if (dir === 'blink') {
      if (blinks < blinkCycles * 2) {
        t = window.setTimeout(() => { setCursorOn(c => !c); setBlinks(b => b + 1); }, blinkMs);
      } else {
        setCursorOn(true);
        t = window.setTimeout(() => setDir('erase'), hold);
      }
    } else {
      if (text.length > 0) {
        t = window.setTimeout(() => setText(current.slice(0, text.length - 1)), eraseSpeed);
      } else {
        setDir('type'); setI(p => (p + 1) % words.length);
      }
    }
    return () => window.clearTimeout(t);
  }, [text, dir, current, typingSpeed, eraseSpeed, hold, blinkCycles, blinkMs, blinks]);

  return (
    <span
      className="inline-flex h-5 items-center gap-2 whitespace-nowrap leading-5"
      style={{ minWidth: `calc(${maxLen}ch + 0.5rem)` }}
    >
      <span className="font-medium tracking-widest text-text-muted">{text}</span>
      <span
        className="inline-block h-5 w-[2px] bg-text-muted/70"
        style={{ opacity: cursorOn ? 1 : 0 }}
      />
    </span>
  );
}

/* ------------------ hero animations container ---------------- */
const heroContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function HomePage() {
  // Soft pointer-parallax for orbs
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      document.documentElement.style.setProperty('--mx', String(x));
      document.documentElement.style.setProperty('--my', String(y));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-neon-from via-neon-via to-neon-to opacity-20 hero-orb parallax-orb"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-24 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-neon-to via-neon-via to-neon-from opacity-20 hero-orb parallax-orb-rev"
          aria-hidden
        />

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-5xl px-6 pt-24 pb-28"
        >
          <motion.p variants={fadeUp} className="mb-1 h-5 text-sm uppercase tracking-widest text-text-muted">
            <Typewriter
              words={['Engineer', 'Problem Solver', 'Innovator']}
              typingSpeed={70}
              eraseSpeed={45}
              hold={400}
              blinkCycles={3}
              blinkMs={220}
            />
          </motion.p>

          <motion.h1 variants={fadeUp} className="mt-2 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl">
            Hi, I’m <span className="neon-text hover-underline">Athrav Seruwam</span>.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-lg text-text-muted">
            Mechatronics Engineering @ UWaterloo. Applying engineering principles to design and build reliable software systems.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            {/* View Projects */}
            <a
              href="#projects"
              className="btn-filled group inline-flex h-12 min-w-[210px] items-center justify-center px-6 text-white"
            >
              <span className="btn-softglow" />
              <span className="btn-sheen" />
              View Projects
            </a>

            {/* Contact Me */}
            <a
              href="#contact"
              className="btn-gradient-outline group inline-flex h-12 min-w-[210px] items-center justify-center px-6 text-white"
            >
              <span className="btn-shine" />
              Contact Me
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2">
            <Link
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition hover:-translate-y-[1px] hover:border-neon-from focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition hover:-translate-y-[1px] hover:border-neon-from focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
            >
              <Github className="h-5 w-5" />
            </Link>
            <a
              href={`mailto:${socials.email}`}
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition hover:-translate-y-[1px] hover:border-neon-from focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <Overview />

      {/* PROJECTS */}
      <Section id="projects" title="Projects" spaceBottom="tight">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" spaceBottom="tight">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((s) => (
            <div key={s} className="flex justify-center">
              <SkillBadge label={s} />
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience" spaceTop="tight" spaceBottom="tight">
        <ExperienceSection items={experience} />
      </Section>

      {/* EDUCATION */}
      <Section id="education" title="Education" spaceBottom="tight">
        <EducationCard edu={uw} />
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left card: quick actions with subtle sheen + glow */}
          <div className="group relative rounded-2xl border border-line bg-surface/90 p-6 shadow-soft">
            {/* sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 -translate-x-[140%] rounded-2xl
                         bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0
                         transition duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                         group-hover:translate-x-[140%] group-hover:opacity-100"
            />
            {/* ambient glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-2 -z-20 rounded-3xl
                         bg-gradient-to-tr from-neon-from/12 via-neon-via/10 to-neon-to/12
                         opacity-0 blur-xl transition-opacity duration-300
                         group-hover:opacity-100"
            />

            <h3 className="text-lg font-semibold text-white">Let’s Connect</h3>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`mailto:${socials.email}`}
                className="inline-flex items-center gap-2 rounded-xl2 border border-white/12 bg-surface px-4 py-2 text-white
                           transition hover:-translate-y-[1px] hover:border-neon-from/50
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>

              <Link
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl2 border border-white/12 bg-surface px-4 py-2 text-white
                           transition hover:-translate-y-[1px] hover:border-neon-from/50
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>

              <Link
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl2 border border-white/12 bg-surface px-4 py-2 text-white
                           transition hover:-translate-y-[1px] hover:border-neon-from/50
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </div>

            <p className="mt-4 text-sm text-text-muted">
              Or use the form. It’s wired for static deployments via Formspree.
            </p>
          </div>

          {/* Formspree form: focus glow + tiny character counter (no React state) */}
          <form
            className="group relative rounded-2xl border border-line bg-surface/90 p-6 shadow-soft"
            action="https://formspree.io/f/xdklbqyl"
            method="POST"
          >
            {/* sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 -translate-x-[140%] rounded-2xl
                         bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0
                         transition duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                         group-hover:translate-x-[140%] group-hover:opacity-100"
            />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-white
                           placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
                placeholder="Your name"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-white
                           placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
                placeholder="you@example.com"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Message
              </label>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={1500}
                  required
                  className="mt-1 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-white
                             placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
                  placeholder="How can I help?"
                  onInput={(e) => {
                    const el = e.currentTarget;
                    const label = el.nextElementSibling as HTMLSpanElement | null;
                    if (label) label.textContent = `${el.value.length}/1500`;
                  }}
                />
                <span className="pointer-events-none absolute bottom-1 right-2 select-none text-[10px] text-text-muted/70">
                  0/1500
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl2 border border-white/12 bg-surface px-4 py-2 text-white
                         transition hover:-translate-y-[1px] hover:border-neon-from/50
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-from"
            >
              Send
            </button>
            <p className="mt-2 text-xs text-text-muted">Powered by Formspree.</p>
          </form>
        </div>
      </Section>
    </>
  );
}