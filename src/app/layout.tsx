import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// Geist via Google CDN (next/font/google has Geist)
import { Geist } from 'next/font/google';
const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const favicon = '/logos/as.png?v=20260506-transparent';
const faviconIco = '/favicon.ico?v=20260506-transparent';

export const metadata: Metadata = {
  title: 'Athrav Seruwam — Mechatronics Engineering @ Waterloo',
  description: 'Mechatronics Engineering @ Waterloo · Portfolio of Athrav Seruwam',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Athrav Seruwam — Mechatronics Engineering @ Waterloo',
    description: 'Mechatronics Engineering @ Waterloo · Portfolio of Athrav Seruwam',
    type: 'website',
    url: 'https://example.com',
  },
  icons: {
    icon: [
      { url: favicon, type: 'image/png', sizes: '1254x1254' },
      { url: faviconIco, type: 'image/x-icon', sizes: '16x16 32x32 48x48 64x64' },
    ],
    shortcut: [{ url: faviconIco, type: 'image/x-icon', sizes: '16x16 32x32 48x48 64x64' }],
    apple: [{ url: favicon, type: 'image/png', sizes: '1254x1254' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
