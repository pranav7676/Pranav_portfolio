"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import Link from "next/link";

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/pranav7676", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/pranavm1305", label: "LinkedIn" },
  { icon: Mail, href: "mailto:pranavmani2018@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="w-full pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[--color-primary-accent]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[--color-primary-accent] flex items-center justify-center text-[--color-primary-bg] font-bold text-lg">
                P
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Pranav</span>
            </div>
            <p className="text-[--color-soft-neutral] text-sm max-w-xs leading-relaxed">
              Designing and developing digital experiences that push the boundaries of technology and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="grid grid-cols-2 gap-2">
              {["About", "Experience", "Projects", "Skills", "Achievements", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="text-[--color-soft-neutral] hover:text-[--color-primary-accent] text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[--color-soft-neutral] hover:text-[--color-primary-accent] hover:border-[--color-primary-accent] transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[--color-soft-neutral] text-xs">
          <p>© {new Date().getFullYear()} M Pranav. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
