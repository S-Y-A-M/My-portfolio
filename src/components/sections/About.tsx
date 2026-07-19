"use client";

import { motion } from "framer-motion";
import { User, Shield, Zap, Globe, Cpu } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
}

export default function About() {
  const stats: StatItem[] = [
    {
      value: "1",
      label: "Year of Experience"
    },
    {
      value: "Shopify & MedusaJS",
      label: "Commercial Projects"
    },
    {
      value: "RAG & n8n workflows",
      label: "AI Automation Projects"
    },
    {
      value: "Node.js, Express, PostgreSQL",
      label: "Backend Technologies"
    },
    {
      value: "AWS & Terraform",
      label: "Cloud Platforms"
    },
    {
      value: "UAE, Saudi Arabia, Qatar, Oman",
      label: "Available for Relocation"
    }
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-black/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(108,99,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Block: Bio narrative using exact user content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary font-mono select-none">
              <User className="h-3.5 w-3.5" />
              Professional Summary
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Backend Node.js Developer focusing on building RESTful APIs, scalable Express.js applications, AI-powered automation solutions, cloud deployment, and backend architecture.
            </h3>

            <div className="space-y-3 pt-2">

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted font-mono list-inside list-disc">
                <li>Shopify development</li>
                <li>MedusaJS multi-vendor platform</li>
                <li>AI RAG chatbot development</li>
                <li>AWS infrastructure</li>
                <li>Docker</li>
                <li>Terraform</li>
                <li>Redis</li>
                <li>CI/CD</li>
                <li>PostgreSQL</li>
              </ul>
            </div>
          </div>

          {/* Right Block: Statistics Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card hover-lift rounded-xl p-5 hover:border-primary/20 group relative overflow-hidden bg-surface/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/[0.02] group-hover:to-primary/[0.03] transition-all duration-300" />

                <span className="text-xl font-bold font-mono text-white block select-none mb-1 group-hover:text-primary transition-colors">
                  {stat.value}
                </span>

                <h4 className="text-xs font-semibold text-muted font-display uppercase tracking-wider">
                  {stat.label}
                </h4>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
