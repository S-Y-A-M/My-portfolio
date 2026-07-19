"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import HeroCanvas from "@/components/ui/HeroCanvas";
import InteractiveTerminal from "@/components/ui/InteractiveTerminal";

const typingWords = [
  "REST APIs",
  "Express.js",
  "AWS Cloud",
  "Docker Containers",
  "Redis Cache",
  "Terraform IaC",
  "AI Automation",
  "RAG Chatbots",
  "n8n Workflows",
];

export default function Hero() {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeWord = typingWords[currentWordIdx];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) => activeWord.slice(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && displayedText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % typingWords.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIdx]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-white/5 py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Three.js canvas */}
      <HeroCanvas />

      {/* Radial overlay to dim the canvas near edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,8,22,0.1)_0%,#050816_85%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Header text & CTA buttons */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Relocation badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary font-mono select-none"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                Available for relocation: UAE, Saudi Arabia, Qatar, GCC
              </span>
            </motion.div>

            {/* Typography */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-white"
              >
                Syam Krishnan PK
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground flex items-center flex-wrap gap-2 leading-none"
              >
                <span>Backend Node.js Developer & focusing on</span>
                <span className="text-primary font-mono inline-block border-r-2 border-primary animate-pulse pr-1">
                  {displayedText}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed"
              >
                I build high-scale backend engines, RESTful APIs, robust microservices, MedusaJS multi-vendor databases, and AI RAG workflows deployed automatically on the AWS cloud.
              </motion.p>
            </div>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={() => handleScrollTo("projects")}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-background hover:opacity-90 active:scale-95 transition-all select-none shadow-lg shadow-primary/20"
              >
                View Projects
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleScrollTo("contact")}
                className="rounded-xl border border-white/10 hover:border-white/20 bg-surface/40 hover:bg-surface/75 px-6 py-3 font-semibold text-white active:scale-95 transition-all select-none"
              >
                Contact Me
              </button>

              <a
                href="/resume.pdf"
                download="Syam_Krishnan_Resume.pdf"
                className="flex items-center gap-2 rounded-xl border border-white/10 hover:border-white/20 bg-surface/40 hover:bg-surface/75 px-4 py-3 font-semibold text-white active:scale-95 transition-all select-none"
                title="Download Resume"
              >
                <FileText className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">Resume</span>
              </a>

              <div className="flex gap-2">
                <a
                  href="https://github.com/syamkrishnanpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/10 hover:border-white/20 bg-surface/40 hover:bg-surface/75 p-3 text-muted hover:text-white transition-colors"
                  title="GitHub"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/syam-krishnan-pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/10 hover:border-white/20 bg-surface/40 hover:bg-surface/75 p-3 text-muted hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
            </motion.div>

            {/* Quick tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xs text-muted font-mono select-none flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
              <span>Tip: Press <kbd className="rounded bg-white/10 px-1 py-0.5 font-bold">Ctrl+K</kbd> to open command control panel</span>
            </motion.div>
          </div>

          {/* Right Column: Code Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 w-full"
          >
            <InteractiveTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
