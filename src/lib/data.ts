import type { Project } from '@/components/ProjectCard';
import type { ExperienceItem } from '@/types/content';

export const socials = {
  linkedin: 'https://linkedin.com/in/a-seruwam/',
  github: 'https://github.com/athravseruwam07', // ← replace with your GitHub username
  email: 'athravmk@gmail.com',
};

/* -------------------------------- Projects ------------------------------- */

export const projects = [
  {
    title: 'FlashcardGPT',
    description:
      'Generate flashcards instantly from notes, PDFs, DOCX, PPTX, or pasted text. Powered by LLMs with automatic chunking, the app creates test-ready Q/A cards you can review in the Streamlit UI or export to CSV/Anki.',
    tags: ['Python', 'Streamlit', 'LLM', 'Ollama/OpenAI'],
    image: '/projects/ai-flashcards.png',
    github: 'https://github.com/athravseruwam07/ai-flashcard-generator',
    demo: 'https://demo.ai-flashcards.com' // fake link for now
  },
  {
    title: 'Daily Schedule Optimizer',
    description:
      'Time-blocking web app that converts tasks into a daily schedule using a greedy algorithm. Features include priority sorting, automatic breaks and lunch blocks, overflow handling, and CSV/ICS export for calendar integration.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Algorithms', 'ICS/CSV Export'],
    image: '/projects/schedule-optimizer.png',
    github: 'https://github.com/athravseruwam07/daily-schedule-optimizer',
    demo: 'https://daily-schedule-optimizer.vercel.app/'
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'Static Next.js 14 + TypeScript portfolio with clean sections, responsive cards, subtle motion, and a recruiting-friendly experience timeline.',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind', 'Framer Motion', 'shadcn/ui'],
    image: '/projects/portfolio.png',
    github: 'https://github.com/athravseruwam07/athrav-portfolio'
    // no demo here → Live Demo button won’t render
  }
];
/* -------------------------------- Skills -------------------------------- */

export const skills: string[] = [
  'Python',
  'C++',
  'Java',
  'JavaScript',
  'HTML/CSS',
  'Git',
  'AutoCAD',
  'SolidWorks',
  'Inventor',
  'Excel',
];

/* ------------------------------- Experience ------------------------------ */

export const experience: ExperienceItem[] = [
  {
    role: 'Mechanical Designer Co-Op',
    company: 'Automha Americas',
    dates: 'Oct 2024 – Jan 2025',
    location: 'Oakville, ON',
    logo: '/logos/automha.svg',
    bullets: [
      'Optimized semi-automated warehouse layouts in AutoCAD; integrated racking & systems.',
      'Built Excel capacity models to drive clear design recommendations.',
      'Supported CAD workflows with engineers on industrial automation projects.',
    ],
  },
  {
    role: 'STEM Summer Camp Counselor',
    company: 'Rotherglen Oakville Elementary',
    dates: '2023 – 2025',
    logo: '/logos/rotherglen.svg',
    bullets: [
      'Mentored ages 6–13 in coding & robotics through hands-on projects.',
      'Designed STEM activities highlighting problem-solving and teamwork.',
      'Helped supervise 100+ campers while fostering a safe, inclusive environment.',
    ],
  },
  {
    role: 'Private Tutoring Business',
    company: 'Mathematics Tutoring',
    dates: '2023 – Present',
    logo: '/logos/tutoring.svg',
    bullets: [
      'Delivered 1:1 and small-group tutoring with structured plans and progress tracking.',
      'Built a lightweight scheduling/notes system using Google Sheets templates.',
      'Grew referrals by focusing on clear explanations and practice-driven learning.',
    ],
  },
];