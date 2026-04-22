"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <SectionWrapper id="contact" className="relative mb-24">
      {/* Background Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[--color-primary-accent] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <AnimatedText text="Initiate Contact" el="h2" className="text-4xl font-bold mb-16 text-center" asGradient />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <h3 className="text-3xl font-bold text-white mb-6">Let&apos;s build the future together.</h3>
          <p className="text-[--color-soft-neutral] text-lg mb-12">
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open. Let&apos;s make something incredible.
          </p>

          <div className="flex flex-col gap-6">
            <a href="mailto:pranavmani2018@gmail.com" className="flex items-center gap-4 text-[--color-soft-neutral] hover:text-[--color-primary-accent] transition-colors group">
              <div className="p-3 bg-white/[0.04] rounded-full border border-[--color-secondary-neutral] group-hover:border-[--color-primary-accent] transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-lg">pranavmani2018@gmail.com</span>
            </a>
            <a href="https://github.com/pranav7676" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[--color-soft-neutral] hover:text-[--color-primary-accent] transition-colors group">
              <div className="p-3 bg-white/[0.04] rounded-full border border-[--color-secondary-neutral] group-hover:border-[--color-primary-accent] transition-colors">
                <GithubIcon size={20} />
              </div>
              <span className="text-lg">github.com/pranav7676</span>
            </a>
            <a href="https://www.linkedin.com/in/pranavm1305" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[--color-soft-neutral] hover:text-[--color-primary-accent] transition-colors group">
              <div className="p-3 bg-white/[0.04] rounded-full border border-[--color-secondary-neutral] group-hover:border-[--color-primary-accent] transition-colors">
                <LinkedinIcon size={20} />
              </div>
              <span className="text-lg">linkedin.com/in/pranavm1305</span>
            </a>
          </div>
        </div>

        <GlassCard className="p-8">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6" 
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSubmitted(true);
                }}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-[--color-soft-neutral]">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="bg-white/5 border border-[--color-secondary-neutral] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[--color-primary-accent] focus:ring-1 focus:ring-[--color-primary-accent] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-[--color-soft-neutral]">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="bg-white/5 border border-[--color-secondary-neutral] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[--color-primary-accent] focus:ring-1 focus:ring-[--color-primary-accent] transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-[--color-soft-neutral]">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="bg-white/5 border border-[--color-secondary-neutral] rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-[--color-primary-accent] focus:ring-1 focus:ring-[--color-primary-accent] transition-all"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>
                
                <AnimatedButton type="submit" className="w-full mt-4">
                  Send Message
                </AnimatedButton>
              </motion.form>
            ) : (
              <motion.div 
                key="success-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-[--color-primary-accent]/20 rounded-full flex items-center justify-center mb-6 border border-[--color-primary-accent]">
                  <motion.svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="var(--color-primary-accent)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-[--color-soft-neutral] max-w-[280px]">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-[--color-primary-accent] text-sm hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}
