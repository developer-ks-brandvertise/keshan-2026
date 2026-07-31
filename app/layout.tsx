import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LMECopperSidebar } from "@/components/ui/LMECopperSidebar";

const eurostile = localFont({
  src: "./fonts/EurostileExtendedBlack.ttf",
  variable: "--font-eurostile",
  weight: "900",
  display: "swap",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
  fallback: ["Arial"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keshan Industries | Copper & Brass Manufacturers",
  description:
    "Keshan Industries is a leading Indian manufacturer of copper and brass products, delivering precision-engineered metals to 30+ countries.",
  keywords: [
    "Keshan Industries",
    "copper manufacturer",
    "brass manufacturer",
    "copper products",
    "brass products",
    "India metals",
    "non-ferrous metals",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${eurostile.variable} ${satoshi.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark-900 text-text-primary">
        <SmoothScrollProvider>
          <CursorGlow />
          <GrainOverlay />
          <LMECopperSidebar />
          <div className="relative z-10 flex flex-col min-h-full">
            <Navbar />
            {children}
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
