'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } },
};

function Overview() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-16">
      {/* Heading */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        className="mb-8"
      >
        <motion.p variants={item} className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
          Introduction
        </motion.p>
        <motion.h2 variants={item} className="mt-2 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          Overview<span className="text-neon-to">.</span>
        </motion.h2>
      </motion.div>

      {/* Content + Photo */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        className="
          grid gap-10
          md:grid-cols-[1fr_auto]
          items-center
        "
      >
        {/* Left—card */}
        <motion.article variants={item} className="rounded-2xl border border-line bg-surface/90 p-6 shadow-soft md:p-8">
          <div className="space-y-6 text-[1.05rem] leading-relaxed text-text-muted">
            <p>
              👋 Hey! I’m <span className="font-semibold text-white">Athrav</span>, a Mechatronics Engineering student at the
              University of Waterloo, driven by curiosity to turn complex ideas into practical, reliable tools.
            </p>

            <p>
              🧩 I’ve worked across CAD, analysis, and code — optimizing layouts, modeling systems, and writing small but
              reliable tools that make workflows easier. I strive to tackle complex challenges and turning them into clear, functional systems.
            </p>

            <p>
              ⚙️ Interests: tooling, UI polish, performance, automation, and turning rough ideas into simple,
              well-documented artifacts others can use.
            </p>

            <p>
              ⚽ Outside the classroom, I tutor math and spend a lot of time playing soccer. I’m always excited 
              to collaborate on projects that combine creativity with engineering, whether that’s small utilities 
              or larger builds with a meaningful twist.
            </p>

            <ul className="mt-6 grid gap-2 text-sm">
              <li className="text-text-muted/80">
                <span className="mr-2">🎯</span>
                Currently exploring: TypeScript + Next.js, Python scripting, and design systems.
              </li>
              <li className="text-text-muted/80">
                <span className="mr-2">📍</span>
                Based in Ontario, Canada.
              </li>
            </ul>
          </div>
        </motion.article>

        {/* Right—circular photo (center aligned) */}
        <motion.div
          variants={item}
          className="justify-self-center md:justify-self-end"
          {...(!prefersReduced && {
            whileHover: { scale: 1.02 },
            transition: { type: 'spring', stiffness: 240, damping: 18 },
          })}
        >
          {/* Wrapper sets size; animated ring + blur are purely decorative */}
          <div className="relative h-60 w-60 md:h-64 md:w-64 pfp-wrap">
            {/* Animated neon ring (uses ::before in CSS) */}
            <div className="pfp-ring" />

            {/* Soft pulsing bloom behind */}
            <div className="pfp-blur" />

            {/* Image with subtle inner border */}
            <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-neon-from/20 via-neon-via/15 to-neon-to/20">
              <div className="h-full w-full overflow-hidden rounded-full border border-white/10 bg-black/20">
                <Image
                  src="/me.jpeg"
                  alt="Portrait of Athrav Seruwam"
                  fill
                  sizes="(min-width: 768px) 256px, 240px"
                  className="object-cover rounded-full"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Overview;
export { Overview };