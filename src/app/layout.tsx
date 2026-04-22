import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { TronBackground } from "@/components/layout/TronBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pranav | Full Stack & UI/UX Developer",
  description: "Portfolio of M Pranav - Computer Science student at SRM IST, Full Stack Developer, UI/UX Developer, and AI Systems Builder specializing in scalable web apps and immersive interfaces.",
  keywords: ["Pranav", "Full Stack Developer", "UI/UX Developer", "AI Enthusiast", "SRM IST", "Next.js", "Portfolio", "Software Engineer"],
  authors: [{ name: "M Pranav" }],
  openGraph: {
    title: "Pranav | Full Stack & UI/UX Developer",
    description: "Building scalable systems with immersive UI/UX and real-world impact.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full selection:bg-[--color-primary-accent] selection:text-[--color-primary-bg] overflow-x-hidden">
        <TronBackground />
        <SmoothScrollProvider>
          <div className="relative z-10 flex min-h-full flex-col">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
