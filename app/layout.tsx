import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const eurostile = localFont({
  src: [
    {
      path: "./fonts/EurostileExtendedBlack.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/EurostileExtendedBlack-web.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-eurostile",
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
      suppressHydrationWarning
      className={`${eurostile.variable} ${satoshi.variable} ${inter.variable} dark h-full antialiased`}
    >
      <body
        className={`${satoshi.className} flex min-h-full flex-col bg-dark-900 text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
