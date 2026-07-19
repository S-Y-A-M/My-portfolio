"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ChevronDown, ChevronUp, MapPin, Server, Activity } from "lucide-react";

interface Job {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  icon: React.ReactNode;
  summary: string;
  responsibilities: string[];
  skills: string[];
}

export default function Experience() {
  const [expandedJob, setExpandedJob] = useState<string | null>("aufait");

  const jobs: Job[] = [
    {
      id: "aufait",
      role: "Associate Backend Developer",
      company: "Aufait Technologies",
      location: "Calicut, Kerala, India ",
      period: "Aug 2024 - Present",
      icon: <Server className="h-5 w-5 text-primary" />,
      summary: "Responsible for designing scalable Node.js microservices, e-commerce integrations, custom Vector search pipelines, and automated AWS setups.",
      responsibilities: [
        "Delivered a commercial Shopify storefront for a UAE-based client, integrating the Ziina payment gateway to enable secure, production-ready online payments.",
        "Designed and implemented core Vendor Management, Vendor Admin, Offers, and Product Search modules for a multi-vendor e-commerce platform on MedusaJS, strengthening platform scalability.",
        "Designed and developed Aufi Bot, an internal RAG-based AI chatbot (n8n, Qdrant, Mistral AI, Google Gemini) that automated HR knowledge retrieval and reduced manual support effort.",
        "Improved backend performance and reduced processing bottlenecks by implementing Redis caching and BullMQ for asynchronous job processing.",

      ],
      skills: ["Node.js", "Express.js", "MedusaJS", "PostgreSQL", "Redis", "Qdrant", "Terraform", "Docker", "AWS", "n8n"]
    },
    {
      id: "vikncodes",
      role: "Technical Support Executive",
      company: "Vikncodes",
      location: "Calicut, India",
      period: "Mar 2024 - July 2024",
      icon: <Activity className="h-5 w-5 text-accent animate-pulse" />,
      summary: "Configured and maintained SQL Server databases, managing backups, restoration, and troubleshooting for production ERP environments.",
      responsibilities: [
        "Provided technical support for enterprise ERP solutions across Saudi Arabia and the UAE.",
        "Configured and maintained SQL Server databases, managing backups, restoration, and troubleshooting for production ERP environments.",
        "Diagnosed and resolved system performance issues, improving reliability for end users."
      ],
      skills: []
    }
  ];

  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-black/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(108,99,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs text-accent font-mono select-none">
            <Briefcase className="h-3.5 w-3.5" />
            Career Timeline
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Professional Experience
          </h3>
          <p className="text-sm text-muted max-w-lg mx-auto">
            A review of my commercial software engineering roles, technical responsibilities, and system architectures delivered.
          </p>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-8 space-y-12">

          {jobs.map((job) => {
            const isExpanded = expandedJob === job.id;
            return (
              <div key={job.id} className="relative group">

                {/* Pulse timeline dot */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-white/10 group-hover:border-primary/30 z-10 transition-colors">
                  {job.icon}
                </div>

                {/* Job Info Header Card */}
                <div
                  onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                  className={`glass-card rounded-xl p-5 md:p-6 cursor-pointer hover:border-white/20 transition-all select-none ${isExpanded ? "border-primary/35 shadow-lg shadow-primary/5 bg-surface" : "bg-surface/50"
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-white font-display">
                        {job.role}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-primary font-mono mt-1">
                        <span>{job.company}</span>
                        <span className="text-muted">•</span>
                        <span className="flex items-center gap-1 text-muted text-xs">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted font-mono self-start sm:self-center bg-black/30 border border-white/5 rounded-full px-3 py-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {job.period}
                    </div>
                  </div>

                  <p className="text-xs text-muted leading-relaxed mt-4">
                    {job.summary}
                  </p>

                  {/* Skills tags summary */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded bg-black/40 border border-white/5 px-2 py-0.5 text-[10px] font-mono text-muted group-hover:text-primary transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Expand toggle indicator */}
                  <div className="flex justify-center border-t border-white/5 mt-4 pt-3 text-[10px] font-mono text-muted uppercase tracking-wider gap-1.5 items-center group-hover:text-foreground transition-colors">
                    <span>{isExpanded ? "Collapse Details" : "Expand Details"}</span>
                    {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </div>
                </div>

                {/* Collapsible Details list */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-2"
                    >
                      <div className="glass-card rounded-xl p-5 md:p-6 bg-white/5 border-white/5 space-y-4">
                        <h5 className="text-xs font-bold text-primary font-display uppercase tracking-wider">
                          Key Responsibilities & System Impact:
                        </h5>
                        <ul className="space-y-3">
                          {job.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed font-mono">
                              <span className="text-primary mt-1 font-bold">▶</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
