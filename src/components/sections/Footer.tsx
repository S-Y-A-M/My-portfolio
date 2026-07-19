"use client";

import { Cpu, ArrowUp, Terminal } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-black/60 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Animated logo/signature */}
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary animate-pulse" />
          <span className="font-mono text-sm text-white font-bold tracking-tight">
            &lt;/&gt; Syam Krishnan PK
          </span>
        </div>

        {/* Server operational status */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-3.5 py-1 text-[10px] text-accent font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span>All backend systems operational</span>
        </div>

        {/* Navigation & back-to-top */}
        <div className="flex items-center gap-6">
          <span className="text-xs text-muted font-mono">
            © {new Date().getFullYear()} • Handcrafted in Node.js
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center p-2 rounded-xl border border-white/10 hover:border-primary/20 bg-surface/50 text-muted hover:text-primary transition-colors cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
