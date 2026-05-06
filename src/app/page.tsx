'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';

const NAV = [
  { num: '01', label: 'Experience', href: '#experience' },
  { num: '02', label: 'Projects', href: '#projects' },
  { num: '03', label: 'Skills', href: '#skills' },
  { num: '04', label: 'About', href: '#about' },
  { num: '05', label: 'Education', href: '#education' },
  { num: '06', label: 'Contact', href: '#contact' },
];

const PROJECTS = [
  {
    num: '01',
    title: 'Dextera',
    badge: 'ConHacks 2026 · 2nd Place',
    desc: '<strong>Smart-glove rehab platform</strong> for stroke and hand-injury recovery. An <strong>ESP32</strong> streams live per-finger bend data from 5 flex sensors into a <strong>WebSocket</strong>-connected clinician dashboard. Patients complete guided rehab games that track reps, accuracy, and recovery progress over time.',
    stack: ['ESP32', 'Next.js', 'TypeScript', 'WebSockets', 'Node.js', 'Hardware', 'CV'],
    image: '/projects/dextera.png',
    github: 'https://github.com/athravseruwam07/dextera',
    demo: 'https://youtu.be/APtFJH6uppM',
  },
  {
    num: '02',
    title: 'Clarus',

    desc: '<strong>AI academic copilot</strong> layered on D2L/Brightspace. Syncs your LMS through a <strong>Playwright</strong> connector and turns course data into a daily action plan with deadlines, priorities, and AI-generated study briefs.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Playwright', 'LLMs'],
    image: '/projects/clarus.png',
    github: 'https://github.com/athravseruwam07/clarus',
    demo: 'https://youtu.be/aM07UXQ1_XI',
  },
  {
    num: '03',
    title: 'Doceo',
    desc: '<strong>AI STEM tutor</strong> that teaches any problem step-by-step on an animated whiteboard with <strong>Gemini</strong>-synced voice narration. Generates full lessons in 10 to 30 seconds, renders live equations, and lets students interrupt mid-lesson to ask questions.',
    stack: ['Next.js', 'FastAPI', 'Gemini', 'TTS', 'Canvas'],
    image: '/projects/doceo.png',
    github: 'https://github.com/athravseruwam07/doceo',
    demo: 'https://youtu.be/2ZF4wPcsDYA',
  },
];

const EXPERIENCE = [
  {
    initials: 'QG',
    logo: '/logos/quotograph.png',
    period: 'Jan – Apr 2026',
    role: 'Software Engineering Co-op',
    where: 'Quotograph',
    desc: 'Sole developer across three commercial construction-tech SaaS products. Built and shipped full-stack features end-to-end: <strong>AI-generated safety forms</strong>, a configurable <strong>approval and signature workflow</strong>, a <strong>Stripe billing and referral system</strong> across auth and payment microservices, and <strong>dual-model YOLO detection routing</strong> in the AI service. Led the <strong>AWS infrastructure migration</strong>, deploying PermitX to production on <strong>ECS, CloudFront, RDS, and S3</strong> with Bedrock as the AI provider.',
  },
  {
    initials: 'FE',
    logo: '/logos/uwfe.png',
    period: 'Sep 2025 – Jan 2026',
    role: 'Firmware Developer',
    where: 'University of Waterloo Formula Electric',
    desc: 'Developed and maintained <strong>embedded firmware</strong> enabling communication between <strong>ECUs</strong> and vehicle subsystems. Designed <strong>signal simulation frameworks</strong> to test ECU behavior under diverse voltage and input conditions. Collaborated with electrical and controls teams to diagnose and optimize signal pathways and contributed to control board validation.',
  },
  {
    initials: 'AA',
    logo: '/logos/automha.svg',
    period: 'Oct 2024 – Jan 2025',
    role: 'Mechanical Designer Co-op',
    where: 'Automha Americas',
    desc: 'Designed semi-automated <strong>warehouse layouts</strong> in <strong>AutoCAD</strong>, integrating racking and conveyance systems for industrial clients. Built <strong>Excel capacity models</strong> to drive layout decisions and supported engineers on live automation projects.',
  },
];

const STACK = [
  {
    title: 'LANGUAGES',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'HTML / CSS'],
  },
  {
    title: 'FRAMEWORKS & TOOLS',
    items: ['React', 'Next.js', 'FastAPI', 'Tailwind CSS', 'Framer Motion', 'Stripe', 'YOLOv8', 'Git'],
  },
  {
    title: 'CLOUD & INFRA',
    items: ['AWS ECS', 'CloudFront', 'S3', 'RDS', 'Bedrock', 'Docker', 'PostgreSQL'],
  },
  {
    title: 'ENGINEERING / CAD',
    items: ['SolidWorks', 'Inventor', 'AutoCAD', 'Excel (modeling)'],
  },
];

type Contact = { key: string; val: string; href: string; download?: boolean };

const CONTACTS: Contact[] = [
  { key: 'EMAIL', val: 'athravmk@gmail.com', href: 'mailto:athravmk@gmail.com' },
  { key: 'GITHUB', val: 'github.com/athravseruwam07', href: 'https://github.com/athravseruwam07' },
  { key: 'LINKEDIN', val: 'linkedin.com/in/a-seruwam', href: 'https://linkedin.com/in/a-seruwam/' },
  { key: 'RESUME', val: 'download pdf', href: '/resume.pdf', download: true },
];

/* ---------------- motion variants ---------------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const heroStagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ---------------- GitHub SVG icon ------------------- */
function GithubIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/* ---------------- section wrapper with whileInView reveal --- */
function Reveal({
  children,
  className,
  id,
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  amount?: number;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.section>
  );
}

/* ---------------- active section observer ------------------- */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.6]);

  const active = useActiveSection([
    'hero',
    'experience',
    'projects',
    'skills',
    'about',
    'education',
    'contact',
  ]);

  return (
    <>
      {/* scroll progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      {/* NAV */}
      <header className="nav">
        <div className="nav-id">
          <span className="status-dot" aria-hidden />
          <span className="nav-prompt">~/athrav-seruwam</span>
        </div>
        <nav className="nav-mid">
          {NAV.map((l) => {
            const id = l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link${active === id ? ' is-active' : ''}`}
              >
                <span className="num">{l.num}</span>
                <span>{l.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="nav-r">
          <span>open to internships</span>
        </div>
      </header>

      <main>
        {/* HERO */}
        <motion.section
          className="hero"
          id="hero"
          variants={heroStagger}
          initial="hidden"
          animate="show"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div className="hero-meta" variants={fadeUp}>
            <span><strong>Mechatronics Engineering @ University of Waterloo</strong></span>
            <span>·</span>
            <span>Ontario, CA</span>
          </motion.div>

          <motion.h1 className="hero-name" variants={fadeUp}>
            Athrav Seruwam<span className="cursor" />
          </motion.h1>

          <motion.p className="hero-tag" variants={fadeUp}>
            Applying engineering principles to design and build reliable software systems.
          </motion.p>

          <motion.p className="hero-bio" variants={fadeUp}>
            I build full-stack software and ship things end-to-end. I have done production work across web apps, AI pipelines, cloud infrastructure, and embedded systems.
          </motion.p>

          <motion.div className="hero-actions" variants={fadeUp}>
            <a href="#experience" className="btn primary">
              view work <span className="arrow">→</span>
            </a>
            <a href="/resume.pdf" download className="btn">
              download resume
            </a>
            <a href="#contact" className="btn">
              get in touch
            </a>
          </motion.div>

          <motion.a
            href="#experience"
            className="scroll-cue"
            aria-label="Scroll down"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{ opacity: heroOpacity }}
          >
            <span className="scroll-cue-label">scroll</span>
            <span className="scroll-cue-track">
              <span className="scroll-cue-dot" />
            </span>
          </motion.a>
        </motion.section>

        {/* EXPERIENCE */}
        <Reveal id="experience">
          <motion.div className="sec-head" variants={fadeUp}>
            <span className="prompt">$</span>
            <span className="cmd">cat</span>
            <span className="arg">~/experience.log</span>
            <span className="rule" />
            <span className="count">{EXPERIENCE.length} entries</span>
          </motion.div>
          <div className="exp">
            {EXPERIENCE.map((e) => (
              <motion.article key={e.role} className="exp-row" variants={fadeUp}>
                <div className={e.logo ? 'exp-logo-img-wrap' : 'exp-logo'}>
                  {e.logo ? (
                    <Image src={e.logo} alt={e.where} fill sizes="48px" style={{ objectFit: 'contain' }} />
                  ) : (
                    <span>{e.initials}</span>
                  )}
                </div>
                <div className="exp-period">{e.period}</div>
                <div className="exp-body">
                  <h3>{e.role}</h3>
                  <div className="where">{e.where}</div>
                  <p dangerouslySetInnerHTML={{ __html: e.desc }} />
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>

        {/* PROJECTS */}
        <Reveal id="projects">
          <motion.div className="sec-head" variants={fadeUp}>
            <span className="prompt">$</span>
            <span className="cmd">ls</span>
            <span className="arg">~/projects</span>
            <span className="rule" />
            <span className="count">{PROJECTS.length} items</span>
          </motion.div>
          <div className="projects">
            {PROJECTS.map((p) => (
              <motion.article
                key={p.title}
                className="project"
                variants={fadeUp}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              >
                <div className="project-thumb">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 720px) 100vw, 200px"
                  />
                </div>
                <div className="project-body">
                  <div className="project-head">
                    <h3 className="project-title">{p.title}</h3>
                    <span className="project-num">{p.num}</span>
                  </div>
                  {p.badge && <div className="project-badge">★ {p.badge}</div>}
                  <p className="project-desc" dangerouslySetInnerHTML={{ __html: p.desc }} />
                  <div className="project-stack">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a href={p.demo} target="_blank" rel="noopener" className="pbtn demo">
                      <span className="ic">▸</span> demo
                    </a>
                    <a href={p.github} target="_blank" rel="noopener" className="pbtn">
                      <GithubIcon /> github
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>

        {/* SKILLS */}
        <Reveal id="skills">
          <motion.div className="sec-head" variants={fadeUp}>
            <span className="prompt">$</span>
            <span className="cmd">cat</span>
            <span className="arg">~/.stack</span>
            <span className="rule" />
            <span className="count">{STACK.length} groups</span>
          </motion.div>
          <motion.div className="stack-grid" variants={fadeUp}>
            {STACK.map((g) => (
              <div key={g.title} className="stack-col">
                <h4>{g.title}</h4>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </Reveal>

        {/* ABOUT */}
        <Reveal id="about" className="about">
          <motion.div className="sec-head" variants={fadeUp}>
            <span className="prompt">$</span>
            <span className="cmd">whoami</span>
            <span className="arg">--verbose</span>
            <span className="rule" />
            <span className="count" />
          </motion.div>
          <motion.div className="about-grid" variants={fadeUp}>
            <div>
              <p>I&apos;m a Mechatronics Engineering student at Waterloo. My co-op at Quotograph had me as the sole developer shipping production features across three SaaS products, which taught me how to own things end-to-end fast.</p>
              <p>I build across the full stack: <strong>React and Next.js</strong> on the frontend, <strong>FastAPI and Node</strong> on the backend, <strong>PostgreSQL</strong> for data, and <strong>AWS</strong> for infrastructure. I also work on embedded systems through Formula Electric.</p>
              <p>I am looking for a software engineering co-op where I can build real things, work on hard problems, and grow quickly.</p>
            </div>
            <dl className="about-side">
              <div><dt>location</dt><dd>Ontario, Canada</dd></div>
              <div><dt>school</dt><dd>UWaterloo &apos;30</dd></div>
              <div><dt>program</dt><dd>Mechatronics Eng</dd></div>
              <div><dt>status</dt><dd style={{ color: 'var(--accent)' }}>open to internships</dd></div>
            </dl>
          </motion.div>
        </Reveal>

        {/* EDUCATION */}
        <Reveal id="education">
          <motion.div className="sec-head" variants={fadeUp}>
            <span className="prompt">$</span>
            <span className="cmd">cat</span>
            <span className="arg">~/education</span>
            <span className="rule" />
            <span className="count">1 entry</span>
          </motion.div>
          <motion.div className="edu" variants={fadeUp}>
            <div className="edu-logo">
              <Image src="/logos/uwaterloo.png" alt="University of Waterloo" fill sizes="48px" style={{ objectFit: 'contain', padding: '4px' }} />
            </div>
            <div>
              <h3>University of Waterloo</h3>
              <div className="deg">BASc · Mechatronics Engineering</div>
              <p className="detail">Engineering fundamentals across mechanical, electrical, and software domains.</p>
            </div>
            <div className="edu-period">Sept 2025 — Apr 2030</div>
          </motion.div>
        </Reveal>

        {/* CONTACT */}
        <Reveal id="contact">
          <motion.div className="sec-head" variants={fadeUp}>
            <span className="prompt">$</span>
            <span className="cmd">contact</span>
            <span className="arg">--all</span>
            <span className="rule" />
            <span className="count">{CONTACTS.length} channels</span>
          </motion.div>
          <motion.div className="contact" variants={fadeUp}>
            {CONTACTS.map((c) => (
              <a
                key={c.key}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener' : undefined}
                {...(c.download ? { download: '' } : {})}
              >
                <span className="key">{c.key}</span>
                <span className="val">{c.val}</span>
                <span className="arr">→</span>
              </a>
            ))}
          </motion.div>
        </Reveal>

        <footer className="site-footer">
          <span>$ built by athrav · 2026</span>
          <span className="ok">● online</span>
        </footer>
      </main>
    </>
  );
}
