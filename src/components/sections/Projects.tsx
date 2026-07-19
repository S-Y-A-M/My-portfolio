"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ExternalLink, Cpu, X, Server, ShieldCheck, HelpCircle, AlertCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  overview: string[];
  tech: string[];
  github?: string;
  demo?: string;
  // SVG Mockup representation instead of image
  mockup: React.ReactNode;
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "backend", label: "Backend / E-comm" },
    { id: "ai", label: "AI & Automation" },
  ];

  const projects: Project[] = [
    {
      id: "medusa",
      title: "Multi-Vendor E-commerce Platform",
      category: "backend",
      desc: "Developed scalable backend modules for a MedusaJS-based multi-vendor marketplace supporting vendor onboarding and management.",
      overview: [
        "Developed scalable backend modules for a MedusaJS-based multi-vendor marketplace supporting vendor onboarding and management.",
        "Built custom Vendor Management, Vendor Admin, Offers, and Product Search Tag modules, extending core MedusaJS functionality to support multi-vendor operations.",
        "Designed and implemented RESTful APIs backed by PostgreSQL, streamlining vendor and product data management.",
        "Structured modular backend architecture aligned with MedusaJS best practices, improving maintainability and scalability.",
        "Strengthened code reliability by authoring unit tests with Jest and enforcing quality standards with ESLint.",
        "Collaborated cross-functionally with the development team to deliver production-ready backend features."
      ],
      tech: ["MedusaJS", "Node.js", "Express.js", "Redis", "PostgreSQL", "BullMQ", "Docker", "AWS"],
      github: "https://github.com/syamkrishnanpk",
      mockup: (
        <div className="relative w-full h-40 bg-black/40 rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-3 select-none">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted">
            <span className="flex items-center gap-1"><Server className="h-3 w-3 text-primary animate-pulse" /> api.medusa-store.io</span>
            <span className="text-accent">● MULTI-TENANT</span>
          </div>
          <div className="space-y-1.5 font-mono text-[9px]">
            <div className="flex items-center justify-between text-white border-b border-white/5 pb-1">
              <span>Tenant ID</span>
              <span>Requests</span>
              <span>Latency</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>merchant_uae_01</span>
              <span>12,480 req</span>
              <span className="text-accent">14ms</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>merchant_ksa_09</span>
              <span>8,910 req</span>
              <span className="text-accent">18ms</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-[9px] bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded font-mono">Stripe Connect API</span>
            <span className="text-[9px] bg-accent/10 border border-accent/20 text-accent px-1.5 py-0.5 rounded font-mono">Redis Queue</span>
          </div>
        </div>
      )
    },
    {
      id: "shopify",
      title: "Shopify UAE Platform",
      category: "backend",
      desc: "Customized and deployed a commercial Shopify storefront tailored to client business requirements.",
      overview: [
        "Customized and deployed a commercial Shopify storefront tailored to client business requirements.",
        "Integrated Shopify Admin APIs to streamline product, order, and inventory management workflows.",
        "Integrated Ziina Payment Gateway for secure production payment processing.",
        "Performed performance optimization, bug fixes, and feature enhancements to improve user experience."
      ],
      tech: ["Shopify GraphQL", "Node.js", "Express.js", "PostgreSQL", "PM2 Cluster", "Docker"],
      demo: "https://shopify.com",
      mockup: (
        <div className="relative w-full h-40 bg-black/40 rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-3 select-none">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted">
            <span className="flex items-center gap-1"><Cpu className="h-3 w-3 text-accent" /> ERP Sync Engine</span>
            <span className="text-primary font-bold">GraphQL</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="text-center rounded border border-white/5 bg-white/5 p-2 flex-1">
              <span className="text-[9px] text-muted block font-mono">ERP Import</span>
              <span className="text-sm font-bold text-white font-mono">✓ 10K SKUs</span>
            </div>
            <div className="text-accent animate-pulse font-mono text-xs">→</div>
            <div className="text-center rounded border border-white/5 bg-white/5 p-2 flex-1">
              <span className="text-[9px] text-muted block font-mono">Shopify API</span>
              <span className="text-sm font-bold text-white font-mono">Synced</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-muted border-t border-white/5 pt-1.5">
            <span>Bucket Capacity: 40/40</span>
            <span className="text-accent">Active Queue</span>
          </div>
        </div>
      )
    },
    {
      id: "aufibot",
      title: "Aufi Bot",
      category: "ai",
      desc: "Designed and built Aufi Bot, an internal RAG-based AI chatbot automating HR knowledge retrieval using n8n and Qdrant vector search.",
      overview: [
        "Designed and built Aufi Bot, an internal RAG-based AI chatbot automating HR knowledge retrieval using n8n and Qdrant vector search.",
        "Implemented end-to-end document ingestion, embedding generation, and semantic search pipelines using Ollama and Qdrant.",
        "Integrated Mistral AI, OpenRouter, and Google Gemini models to deliver accurate, context-aware conversational responses.",
        "Architected AI agent workflows with memory, retrieval, and tool orchestration to handle multi-step HR queries.",
        "Automated support-ticket creation and cross-platform integrations via webhooks, Gmail, Google Sheets, and REST APIs, reducing manual HR support effort."
      ],
      tech: ["n8n", "Qdrant DB", "Ollama", "Google Gemini", "Mistral AI", "Slack API", "REST webhooks", "Node.js", "Docker"],
      github: "https://github.com/syamkrishnanpk",
      mockup: (
        <div className="relative w-full h-40 bg-black/40 rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-3 select-none">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted">
            <span className="flex items-center gap-1"><Cpu className="h-3 w-3 text-red-400" /> n8n Automation</span>
            <span className="text-rose-400 font-mono text-[8px] animate-pulse">TRIGGER ACTIVE</span>
          </div>
          <div className="font-mono text-[8px] space-y-1">
            <div className="text-emerald-400">▶ Webhook Received [Typeform Intake]</div>
            <div className="text-primary">  ↳ Provisioning GitLab Repo path: OK</div>
            <div className="text-accent">  ↳ Slack notifications dispatched: OK</div>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-1.5 text-[9px] font-mono text-muted">
            <span>Runs: 1,420/day</span>
            <span className="text-emerald-400">100% Success</span>
          </div>
        </div>
      )
    },
    {
      id: "aichatbot",
      title: "AI Citizen Support Chatbot",
      category: "ai",
      desc: "Contributed to R&D of an AI-powered chatbot for a South African citizen support platform, aimed at improving public service accessibility.",
      overview: [
        "Contributed to R&D of an AI-powered chatbot for a South African citizen support platform, aimed at improving public service accessibility.",
        "Designed intelligent routing workflows to automatically escalate unresolved queries into support tickets.",
        "Integrated external services and automated workflows using n8n to streamline citizen query handling.",
        "Improved response accuracy through prompt engineering and optimized retrieval strategies.",
        "Evaluated AI automation approaches for citizen support use cases as part of a cross-functional R&D effort."
      ],
      tech: ["Qdrant DB", "n8n", "Node.js", "OpenAI Embeddings", "Express.js"],
      github: "https://github.com/syamkrishnanpk",
      mockup: (
        <div className="relative w-full h-40 bg-black/40 rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-3 select-none">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted">
            <span className="flex items-center gap-1"><Cpu className="h-3 w-3 text-accent" /> Vector RAG Router</span>
            <span className="text-purple-400 font-mono">QDRANT</span>
          </div>
          <div className="space-y-1.5 font-mono text-[8px]">
            <div className="bg-white/5 p-1 rounded text-muted truncate">
              Q: What are business permit requirements?
            </div>
            <div className="bg-primary/5 p-1 rounded text-primary truncate">
              [RAG Context]: Matches found: 4 chunks. Score: 0.88.
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-[9px] bg-accent/15 text-accent border border-accent/20 px-1 rounded font-mono">Cosine Sim</span>
            <span className="text-[9px] bg-rose-500/15 text-rose-300 border border-rose-500/20 px-1 rounded font-mono">Claude 3.5</span>
          </div>
        </div>
      )
    },
    {
      id: "workersconnect",
      title: "WorkersConnect",
      category: "backend",
      desc: "Developed RESTful APIs for user, worker, and service management and Implemented JWT authentication and role-based authorization.",
      overview: [
        "Developed RESTful APIs for user, worker, and service management and Implemented JWT authentication and role-based authorization.",
        "Enforced consistent coding standards and improved code quality by configuring ESLint across the codebase.",
        "Containerized backend services using Docker and Docker Compose.",
        "Configured CI workflows with GitHub Actions and deployed backend services to AWS EC2."
      ],
      tech: ["Next.js", "TypeScript", "Prisma ORM", "Express.js", "Redis Scheduling", "PostgreSQL"],
      github: "https://github.com/syamkrishnanpk",
      mockup: (
        <div className="relative w-full h-40 bg-black/40 rounded-lg border border-white/5 overflow-hidden flex flex-col justify-between p-3 select-none">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted">
            <span className="flex items-center gap-1"><Server className="h-3 w-3 text-yellow-400" /> WorkersConnect API</span>
            <span className="text-primary font-mono text-[8px] animate-pulse">BUILDING</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 animate-ping" />
            <span className="text-[10px] font-mono text-white">Cron Expiry checks active...</span>
          </div>
          <div className="border border-white/5 rounded p-1 text-[8px] font-mono text-muted bg-white/5">
            [Redis Job]: Expiring credentials found: 12. Alerting managers.
          </div>
        </div>
      )
    }
  ];

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(proj => proj.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-black/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,255,163,0.015)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary font-mono select-none">
            <Layers className="h-3.5 w-3.5" />
            Portfolio
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Featured Projects
          </h3>
          <p className="text-sm text-muted max-w-lg mx-auto">
            A presentation of backend engineering case studies and automations I have built.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex justify-center gap-2 mb-10 select-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-mono font-semibold transition-all duration-200 border ${activeCategory === cat.id
                ? "bg-primary border-primary text-background shadow-md shadow-primary/20"
                : "bg-surface/50 border-white/5 text-muted hover:text-foreground hover:border-white/10"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card hover-lift rounded-2xl p-5 bg-surface/50 border-white/10 hover:border-primary/20 relative group overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Schematic Mockup representation */}
                  <div className="mb-4">
                    {proj.mockup}
                  </div>

                  {/* Header Title */}
                  <div className="mb-3">
                    <h4 className="text-base font-bold text-white font-display group-hover:text-primary transition-colors leading-tight">
                      {proj.title}
                    </h4>
                  </div>

                  {/* Brief summary */}
                  <p className="text-xs text-muted leading-relaxed font-mono mb-4">
                    {proj.desc}
                  </p>
                </div>

                {/* Card CTA & tech list */}
                <div>
                  {/* Tech stack items limit 4 */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tech.slice(0, 4).map((t) => (
                      <span key={t} className="text-[9px] font-mono text-muted bg-black/30 rounded px-1.5 py-0.5 border border-white/5">
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="text-[9px] font-mono text-muted bg-black/30 rounded px-1.5 py-0.5 border border-white/5">
                        +{proj.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-white/10 hover:border-primary/20 bg-surface hover:bg-black/30 py-2.5 text-xs text-white hover:text-primary font-mono font-semibold transition-all select-none uppercase tracking-wider"
                  >
                    View Case Study Case
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case Study Details Modal Panel */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-background/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card relative w-full max-w-2xl bg-surface/90 border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col"
              >
                {/* Header Title */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-black/25">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-black/40 rounded-lg border border-white/5">
                      <Cpu className="h-4 w-4 text-primary" />
                    </span>
                    <h4 className="text-base sm:text-lg font-bold font-display text-white">
                      {selectedProject.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 hover:bg-white/10 rounded-lg text-muted hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Details Scroll Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">

                  {/* Overview Block */}
                  <div>
                    <h5 className="text-xs font-bold text-primary uppercase font-mono tracking-widest mb-3">
                      OVERVIEW
                    </h5>
                    <ul className="space-y-3 text-xs sm:text-sm text-muted leading-relaxed font-mono">
                      {selectedProject.overview.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Full Tech Stack */}
                  <div>
                    <h5 className="text-xs font-bold text-primary uppercase font-mono tracking-widest mb-2">
                      CASE STUDY TECH STACK
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="text-xs font-mono text-white bg-black/40 rounded px-2.5 py-1 border border-white/5 hover:border-primary/20 transition-all select-none">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 bg-black/40">
                  <div className="flex gap-2">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-surface border border-white/10 hover:border-white/20 px-4 py-2 text-xs text-white font-mono transition-colors"
                      >
                        <FaGithub className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-primary hover:opacity-90 px-4 py-2 text-xs text-background font-mono font-bold transition-all"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-xl border border-white/10 hover:border-white/20 px-4 py-2 text-xs text-muted hover:text-white font-mono transition-colors"
                  >
                    Close Case Study
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
