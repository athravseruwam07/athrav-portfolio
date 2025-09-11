'use client';
import { motion } from 'framer-motion';

export type Timeline = {
  title: string; // role — company (dates)
  location: string;
  bullets: string[];
};

export function TimelineItem({ item }: { item: Timeline }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative rounded-2xl bg-card p-6 shadow-soft border border-gray-100"
    >
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.location}</p>
      <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700">
        {item.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </motion.div>
  );
}