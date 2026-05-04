export const owner = {
  name: "Athrav Seruwam",
  title: "Mechatronics Engineering @ UWaterloo",
  tagline:
    "Applying engineering principles to design and build reliable software systems.",
  bio: [
    "Mechatronics Engineering student at the University of Waterloo, driven by curiosity to turn complex ideas into practical, reliable tools. I've worked across CAD, analysis, and code — optimizing layouts, modeling systems, and writing small but reliable tools that make workflows easier.",
    "Interests: tooling, UI polish, performance, automation, and turning rough ideas into simple, well-documented artifacts others can use. Outside the classroom, I tutor math and play a lot of soccer.",
  ],
  location: "Ontario, Canada",
  email: "athravmk@gmail.com",
  links: {
    linkedin: "https://linkedin.com/in/a-seruwam/",
    github: "https://github.com/athravseruwam07",
  },
} as const;

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "FlashcardGPT",
    description:
      "Generate flashcards instantly from notes, PDFs, DOCX, PPTX, or pasted text. Powered by LLMs with automatic chunking, the app creates test-ready Q/A cards you can review in the Streamlit UI or export to CSV/Anki.",
    tags: ["Python", "Streamlit", "LLM", "Ollama/OpenAI"],
    image: "/projects/ai-flashcards.png",
    github: "https://github.com/athravseruwam07/ai-flashcard-generator",
  },
  {
    title: "Daily Schedule Optimizer",
    description:
      "Time-blocking web app that converts tasks into a daily schedule using a greedy algorithm. Features include priority sorting, automatic breaks and lunch blocks, overflow handling, and CSV/ICS export for calendar integration.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Algorithms", "ICS/CSV Export"],
    image: "/projects/schedule-optimizer.png",
    github: "https://github.com/athravseruwam07/daily-schedule-optimizer",
    demo: "https://daily-schedule-optimizer.vercel.app/",
  },
  {
    title: "Personal Portfolio Website",
    description:
      "Static Next.js 14 + TypeScript portfolio with clean sections, responsive cards, subtle motion, and a recruiting-friendly experience timeline.",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "Framer Motion", "shadcn/ui"],
    image: "/projects/portfolio.png",
    github: "https://github.com/athravseruwam07/athrav-portfolio",
  },
];

export type Experience = {
  role: string;
  company: string;
  dates: string;
  location?: string;
  logo: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    role: "Mechanical Designer Co-Op",
    company: "Automha Americas",
    dates: "Oct 2024 – Jan 2025",
    location: "Oakville, ON",
    logo: "/logos/automha.svg",
    bullets: [
      "Optimized semi-automated warehouse layouts in AutoCAD; integrated racking & systems.",
      "Built Excel capacity models to drive clear design recommendations.",
      "Supported CAD workflows with engineers on industrial automation projects.",
    ],
  },
  {
    role: "STEM Summer Camp Counselor",
    company: "Rotherglen Oakville Elementary",
    dates: "2023 – 2025",
    logo: "/logos/rotherglen.svg",
    bullets: [
      "Mentored ages 6–13 in coding & robotics through hands-on projects.",
      "Designed STEM activities highlighting problem-solving and teamwork.",
      "Helped supervise 100+ campers while fostering a safe, inclusive environment.",
    ],
  },
  {
    role: "Private Tutoring Business",
    company: "Mathematics Tutoring",
    dates: "2023 – Present",
    logo: "/logos/tutoring.svg",
    bullets: [
      "Delivered 1:1 and small-group tutoring with structured plans and progress tracking.",
      "Built a lightweight scheduling/notes system using Google Sheets templates.",
      "Grew referrals by focusing on clear explanations and practice-driven learning.",
    ],
  },
];

export const education = {
  school: "University of Waterloo",
  program: "BASc, Mechatronics Engineering",
  dates: "Sept 2025 – Apr 2030",
  location: "Waterloo, Ontario, Canada",
  logo: "/logos/uwaterloo.png",
  coursework:
    "Relevant coursework: Programming (C++, OOP), Applied Math (Python, Linear Algebra), Engineering Design (AutoCAD, SolidWorks).",
} as const;

export type SkillCategory = {
  label: string;
  skills: string[];
};

export const stack: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["Python", "C++", "Java", "JavaScript", "TypeScript", "HTML/CSS"],
  },
  {
    label: "Frameworks & Libraries",
    skills: ["Next.js", "Tailwind CSS", "Framer Motion", "Streamlit"],
  },
  {
    label: "Engineering & Tools",
    skills: ["Git", "AutoCAD", "SolidWorks", "Inventor", "Excel"],
  },
];

export const stats = [
  { value: 3, label: "Shipped projects", suffix: "" },
  { value: 3, label: "Professional roles", suffix: "" },
  { value: 100, label: "Students mentored", suffix: "+" },
  { value: 10, label: "Languages & tools", suffix: "" },
] as const;
