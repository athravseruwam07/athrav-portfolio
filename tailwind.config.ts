import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0c10',
        surface: '#131422',
        line: '#1f2033',
        text: {
          base: '#e5e7eb',
          muted: '#9ca3af',
        },
        neon: {
          from: '#6366f1', // indigo
          via: '#8b5cf6',  // violet
          to:   '#ec4899', // pink
        },
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(0,0,0,0.35)',
        glow: '0 0 0 0 rgba(99,102,241,0)',
      },
      backgroundImage: {
        'grid': 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        'noise': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.03\"/></svg>')",
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};

export default config;