import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pranav | Full Stack Developer & AI Enthusiast",
  description: "Portfolio of M Pranav - Computer Science student at SRM IST, Full Stack Developer, and AI Systems Builder specializing in scalable web apps and immersive UI.",
  keywords: ["Pranav", "Full Stack Developer", "AI Enthusiast", "SRM IST", "Next.js", "Portfolio", "Software Engineer"],
  authors: [{ name: "M Pranav" }],
  openGraph: {
    title: "Pranav | Full Stack Developer",
    description: "Building scalable systems with immersive UI and real-world impact.",
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
      <body className="min-h-full flex flex-col selection:bg-[--color-primary-accent] selection:text-[--color-primary-bg]">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
