"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Menu, X, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/pranav7676", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/pranavm1305", label: "LinkedIn" },
  { icon: Mail, href: "mailto:pranavmani2018@gmail.com", label: "Email" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4",
        isScrolled 
          ? "bg-[--color-primary-bg]/70 backdrop-blur-md border-b border-white/10 py-3" 
          : "bg-transparent py-6"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="group flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--color-primary-accent] to-[--color-warm-accent] flex items-center justify-center text-[--color-primary-bg] font-bold text-xl transition-transform group-hover:scale-110">
            P
          </div>
          <span className="text-white font-bold text-xl tracking-tight hidden sm:block">Pranav</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[--color-soft-neutral] hover:text-[--color-primary-accent] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[--color-primary-accent] transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-white/10" />

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--color-soft-neutral] hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <AnimatedButton className="text-xs py-2 px-4 h-auto">
              <Download size={14} className="mr-2" />
              Resume
            </AnimatedButton>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[--color-primary-bg] border-t border-white/5 overflow-hidden"
          >
            <ul className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-[--color-soft-neutral] hover:text-[--color-primary-accent]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <div className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-6">
                <div className="flex items-center gap-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[--color-soft-neutral] hover:text-white transition-colors"
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full">
                  <AnimatedButton className="w-full">
                    <Download size={18} className="mr-2" />
                    Download Resume
                  </AnimatedButton>
                </a>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
