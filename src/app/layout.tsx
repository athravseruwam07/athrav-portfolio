import type { Metadata } from "next";
import "./globals.css";
import { spaceGrotesk, GeistSans, GeistMono } from "@/lib/fonts";
import LenisProvider from "@/components/providers/LenisProvider";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Athrav Seruwam | Portfolio",
  description:
    "Mechatronics Engineering @ Waterloo · Portfolio of Athrav Seruwam",
  icons: {
    icon: "/logos/as.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <LenisProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
