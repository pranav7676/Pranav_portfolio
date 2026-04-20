"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <SectionWrapper id="contact" className="relative mb-24">
      {/* Background Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[--color-primary-accent] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <AnimatedText text="Initiate Contact" el="h2" className="text-4xl font-bold mb-16 text-center" asGradient />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <h3 className="text-3xl font-bold text-white mb-6">Let's build the future together.</h3>
          <p className="text-[--color-soft-neutral] text-lg mb-12">
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open. Let's make something incredible.
          </p>

          <div className="flex flex-col gap-6">
            <a href="mailto:contact@mpranav.io" className="flex items-center gap-4 text-[--color-soft-neutral] hover:text-[--color-primary-accent] transition-colors group">
              <div className="p-3 bg-white/[0.04] rounded-full border border-[--color-secondary-neutral] group-hover:border-[--color-primary-accent] transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-lg">contact@mpranav.io</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-[--color-soft-neutral] hover:text-[--color-primary-accent] transition-colors group">
              <div className="p-3 bg-white/[0.04] rounded-full border border-[--color-secondary-neutral] group-hover:border-[--color-primary-accent] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.8 4.8 0 0 0-1.4-3.5 4.8 4.8 0 0 0-.1-3.5s-1-.3-3.5 1.4a11.5 11.5 0 0 0-6 0C5.5 1.6 4.4 1.9 4.4 1.9a4.8 4.8 0 0 0-.1 3.5 4.8 4.8 0 0 0-1.4 3.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
                  <path d="M9 20c-4 1.5-6-1-6-1" />
                </svg>
              </div>
              <span className="text-lg">github.com/mpranav</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-[--color-soft-neutral] hover:text-[--color-primary-accent] transition-colors group">
              <div className="p-3 bg-white/[0.04] rounded-full border border-[--color-secondary-neutral] group-hover:border-[--color-primary-accent] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <span className="text-lg">linkedin.com/in/mpranav</span>
            </a>
          </div>
        </div>

        <GlassCard className="p-8">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-[--color-soft-neutral]">Name</label>
              <input
                type="text"
                id="name"
                className="bg-white/5 border border-[--color-secondary-neutral] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[--color-primary-accent] focus:ring-1 focus:ring-[--color-primary-accent] transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-[--color-soft-neutral]">Email</label>
              <input
                type="email"
                id="email"
                className="bg-white/5 border border-[--color-secondary-neutral] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[--color-primary-accent] focus:ring-1 focus:ring-[--color-primary-accent] transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-[--color-soft-neutral]">Message</label>
              <textarea
                id="message"
                rows={4}
                className="bg-white/5 border border-[--color-secondary-neutral] rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-[--color-primary-accent] focus:ring-1 focus:ring-[--color-primary-accent] transition-all"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            
            <AnimatedButton type="submit" className="w-full mt-4">
              Send Message
            </AnimatedButton>
          </form>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}
