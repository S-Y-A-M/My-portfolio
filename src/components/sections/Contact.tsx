"use client";

import { Mail, FileText, Send, Calendar, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-black/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(0,229,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Centered Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary font-mono select-none">
            <Send className="h-3.5 w-3.5 animate-pulse" />
            Get In Touch
          </div>


        </div>

        <div className="max-w-2xl mx-auto space-y-6">

          {/* Relocation / Availability status */}
          <div className="glass-card rounded-xl p-4 bg-surface/50 border-white/5 flex items-center gap-4">
            <div className="relative flex h-3 w-3 select-none shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </div>
            <div>
              <span className="text-xs font-bold text-white block font-display">
                Currently Available
              </span>
              <span className="text-[10px] text-muted font-mono leading-none">
                Open for relocation to UAE, Qatar, KSA & GCC markets.
              </span>
            </div>
          </div>

          {/* Direct channels grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:syamkrishnanpkro45@gmail.com"
              className="glass-card hover-lift rounded-xl p-4 bg-surface/50 border-white/10 hover:border-primary/25 flex items-center gap-3 group transition-all"
            >
              <div className="p-2 bg-black/40 rounded-lg text-primary border border-white/5 group-hover:border-primary/10 shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted font-mono block leading-none">EMAIL DIRECT</span>
                <span className="text-xs font-semibold text-white group-hover:text-primary transition-colors block mt-1 truncate max-w-[190px]">
                  syamkrishnanpkro45@gmail.com
                </span>
              </div>
            </a>

            <a
              href="tel:+916238069690"
              className="glass-card hover-lift rounded-xl p-4 bg-surface/50 border-white/10 hover:border-primary/25 flex items-center gap-3 group transition-all"
            >
              <div className="p-2 bg-black/40 rounded-lg text-primary border border-white/5 group-hover:border-primary/10 shrink-0">
                <Phone className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted font-mono block leading-none">CALL DIRECT</span>
                <span className="text-xs font-semibold text-white group-hover:text-primary transition-colors block mt-1 truncate">
                  +91 62380 69690
                </span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/syamkrishnanpk/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card hover-lift rounded-xl p-4 bg-surface/50 border-white/10 hover:border-primary/25 flex items-center gap-3 group transition-all"
            >
              <div className="p-2 bg-black/40 rounded-lg text-primary border border-white/5 group-hover:border-primary/10 shrink-0">
                <FaLinkedin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted font-mono block leading-none">LINKEDIN PROFILE</span>
                <span className="text-xs font-semibold text-white group-hover:text-primary transition-colors block mt-1 truncate">
                  syamkrishnanpk
                </span>
              </div>
            </a>

            <a
              href="https://github.com/S-Y-A-M"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card hover-lift rounded-xl p-4 bg-surface/50 border-white/10 hover:border-primary/25 flex items-center gap-3 group transition-all"
            >
              <div className="p-2 bg-black/40 rounded-lg text-primary border border-white/5 group-hover:border-primary/10 shrink-0">
                <FaGithub className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted font-mono block leading-none">GITHUB PROFILE</span>
                <span className="text-xs font-semibold text-white group-hover:text-primary transition-colors block mt-1 truncate">
                  S-Y-A-M
                </span>
              </div>
            </a>
          </div>

          {/* Full-width Resume button at bottom */}
          <a
            href="/resume.pdf"
            download="Syam_Krishnan_Resume.pdf"
            className="glass-card hover-lift rounded-xl p-4 bg-surface/50 border-white/10 hover:border-primary/25 flex items-center justify-center gap-3 group transition-all w-full text-center"
          >
            <div className="p-2 bg-black/40 rounded-lg text-primary border border-white/5 group-hover:border-primary/10 shrink-0">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-muted font-mono block leading-none">RESUME FILE</span>
              <span className="text-xs font-semibold text-white group-hover:text-primary transition-colors block mt-1">
                Download PDF
              </span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
