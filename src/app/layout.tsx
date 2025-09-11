import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';   // named import
import { Footer } from '@/components/Footer';   // named import

export const metadata: Metadata = {
  title: 'Athrav | Portfolio',
  description: 'Mechatronics Engineering @ Waterloo · Portfolio of Athrav Seruwam',
  metadataBase: new URL('https://example.com'), // replace on deploy
  openGraph: {
    title: 'Athrav | Portfolio',
    description: 'Mechatronics Engineering @ Waterloo · Portfolio of Athrav Seruwam',
    type: 'website',
    url: 'https://example.com',
  },
  icons: {
    icon: '/logos/as.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-bg text-white">
        <Navbar />
        {/* pad for the fixed header */}
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}