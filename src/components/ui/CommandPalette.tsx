"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, FileText, User, Briefcase, Cpu, Send, Layers, GitBranch, Sparkles, Award, ShieldAlert, GraduationCap } from "lucide-react";

interface CommandItem {
  icon: React.ReactNode;
  label: string;
  category: string;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const triggerTerminalCommand = (cmd: string) => {
    // We dispatch a custom event to communicate with the Terminal component
    const event = new CustomEvent("terminal-command", { detail: cmd });
    window.dispatchEvent(event);
    setIsOpen(false);
    scrollToSection("hero");
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Will point to resume.pdf in public
    link.download = "Syam_Krishnan_Resume.pdf";
    link.click();
    setIsOpen(false);
  };

  const commands: CommandItem[] = [
    { icon: <User className="h-4 w-4" />, label: "Go to About", category: "Navigation", action: () => scrollToSection("about") },
    { icon: <Cpu className="h-4 w-4" />, label: "Go to Tech Stack", category: "Navigation", action: () => scrollToSection("tech-stack") },
    { icon: <Briefcase className="h-4 w-4" />, label: "Go to Experience", category: "Navigation", action: () => scrollToSection("experience") },
    { icon: <Layers className="h-4 w-4" />, label: "Go to Featured Projects", category: "Navigation", action: () => scrollToSection("projects") },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Go to Education & Certifications", category: "Navigation", action: () => scrollToSection("education") },
    { icon: <Send className="h-4 w-4" />, label: "Go to Contact", category: "Navigation", action: () => scrollToSection("contact") },
    
    { icon: <FileText className="h-4 w-4" />, label: "Download Resume PDF", category: "Actions", action: handleDownloadResume, shortcut: "↓" },
    
    { icon: <Terminal className="h-4 w-4" />, label: "Run: npm run deploy (Deploy Mock Systems)", category: "Terminal Commands", action: () => triggerTerminalCommand("/deploy"), shortcut: "⏎" },
    { icon: <Terminal className="h-4 w-4" />, label: "Run: /skills (Dump Tech Stack)", category: "Terminal Commands", action: () => triggerTerminalCommand("/skills") },
    { icon: <Terminal className="h-4 w-4" />, label: "Run: /matrix (Toggle Matrix Overlay)", category: "Terminal Commands", action: () => triggerTerminalCommand("/matrix") },
    { icon: <Terminal className="h-4 w-4" />, label: "Run: /clear (Clear Terminal logs)", category: "Terminal Commands", action: () => triggerTerminalCommand("/clear") },
    { icon: <ShieldAlert className="h-4 w-4" />, label: "Run: /hack (Easter Egg)", category: "Terminal Commands", action: () => triggerTerminalCommand("/hack") },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleListKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleListKeys);
    return () => window.removeEventListener("keydown", handleListKeys);
  }, [isOpen, selectedIndex, filteredCommands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            ref={containerRef}
            className="glass-card relative w-full max-w-xl overflow-hidden rounded-xl bg-surface/90 shadow-2xl border-white/10 mx-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Search Input */}
            <div className="flex items-center border-b border-white/10 px-4 py-3">
              <Search className="h-5 w-5 text-muted mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search command palette... (e.g. projects, deploy)"
                className="w-full bg-transparent text-foreground placeholder-muted outline-none border-none text-base"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <div className="rounded bg-white/10 px-2 py-0.5 text-xs text-muted font-mono select-none">
                ESC
              </div>
            </div>

            {/* Command List */}
            <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
              {filteredCommands.length > 0 ? (
                (() => {
                  let currentCategory = "";
                  return filteredCommands.map((cmd, index) => {
                    const isNewCategory = cmd.category !== currentCategory;
                    if (isNewCategory) {
                      currentCategory = cmd.category;
                    }
                    const isSelected = index === selectedIndex;

                    return (
                      <div key={cmd.label}>
                        {isNewCategory && (
                          <div className="px-3 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider opacity-80 mt-2 first:mt-0 font-display">
                            {cmd.category}
                          </div>
                        )}
                        <button
                          onClick={cmd.action}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all duration-150 ${
                            isSelected
                              ? "bg-white/10 text-foreground translate-x-1"
                              : "text-muted hover:text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={isSelected ? "text-primary" : "text-muted"}>
                              {cmd.icon}
                            </span>
                            <span className="font-medium">{cmd.label}</span>
                          </div>
                          {cmd.shortcut && (
                            <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-mono text-muted select-none">
                              {cmd.shortcut}
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  });
                })()
              ) : (
                <div className="py-6 text-center text-sm text-muted">
                  No commands found matching "{search}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/5 bg-black/40 px-4 py-2 text-xs text-muted font-mono select-none">
              <div className="flex gap-3">
                <span>↑↓ Navigate</span>
                <span>Enter Execute</span>
              </div>
              <div>
                <span>Press <kbd className="rounded bg-white/15 px-1 py-0.5 font-bold">Ctrl+K</kbd> to toggle</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
