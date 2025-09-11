export type ExperienceItem = {
  role: string;
  company: string;
  dates: string;
  location?: string;   // optional ✅
  bullets: string[];
  logo: string;
};