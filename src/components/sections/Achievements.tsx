"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Zap, Shield, Check, Calendar, ArrowUpRight } from "lucide-react";

interface Achievement {
  title: string;
  metric: string;
  metricLabel: string;
  icon: React.ReactNode;
  desc: string;
}

interface Certification {
  title: string;
  issuer: string;
  period: string;
  details: string;
}

export default function Achievements() {
  const achievements: Achievement[] = [
    {
      title: "Commercial Shopify delivery",
      metric: "10K+",
      metricLabel: "SKUs Synced / Hr",
      icon: <Zap className="h-5 w-5 text-accent animate-pulse" />,
      desc: "Delivered XML/GraphQL sync pipelines linking internal warehouse inventory databases to storefront endpoints for UAE clients."
    },
    {
      title: "AI chatbot",
      metric: "40%",
      metricLabel: "Queue Reduction",
      icon: <Award className="h-5 w-5 text-primary" />,
      desc: "Developed a semantic citizen support RAG bot query resolver using vector scoring indexes, decreasing agent contact logs."
    },
    {
      title: "Redis optimization",
      metric: "40ms",
      metricLabel: "Avg Latency Save",
      icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
      desc: "Integrated atomic locks and response caching layers preventing race conditions during concurrent vendor updates."
    },
    {
      title: "Terraform deployment",
      metric: "1-Click",
      metricLabel: "Deploy Automation",
      icon: <Shield className="h-5 w-5 text-purple-400" />,
      desc: "Authored modular configurations to spin up API ECS tasks, security groups, subnets, and RDS databases from zero."
    }
  ];

  const certifications: Certification[] = [
    {
      title: "Python Full Stack",
      issuer: "Luminar Technolab",
      period: "2023",
      details: "Comprehensive training in OOP concepts, backend frameworks (Django/Flask), database configurations, and RESTful routing hooks."
    },
    {
      title: "Internship",
      issuer: "Aufait Technologies (Practical Training)",
      period: "2024",
      details: "Hands-on engineering focusing on enterprise Node APIs, MedusaJS schemas, repository release flows, and automated linter builds."
    },
    {
      title: "Cyber Security Workshop",
      issuer: "Cyber Security Division / Tech Center",
      period: "2022",
      details: "Security auditing workshop, covering XSS/SQL injection prevention strategies, JWT security architectures, and HTTPS TLS setups."
    }
  ];

  return (
    <section
      id="achievements"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-black/35"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(108,99,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Achievements Metrics Cards Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary font-mono select-none">
                <Zap className="h-3.5 w-3.5" />
                Performance Metrics
              </div>
              <h3 className="text-3xl font-bold font-display text-white">
                Technical Achievements
              </h3>
              <p className="text-sm text-muted max-w-md">
                Quantified performance improvements, API configurations, and automation systems delivered during my engineering roles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach, idx) => (
                <motion.div
                  key={ach.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card hover-lift rounded-xl p-5 bg-surface/50 border-white/10 hover:border-primary/20 relative group overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
                      {ach.icon}
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-white block select-none">
                        {ach.metric}
                      </span>
                      <span className="text-[9px] font-mono text-primary uppercase tracking-wider block">
                        {ach.metricLabel}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-bold text-white font-display group-hover:text-primary transition-colors">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-muted font-mono mt-2 leading-relaxed">
                    {ach.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications Vertical Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs text-accent font-mono select-none">
                <Award className="h-3.5 w-3.5" />
                Accreditation
              </div>
              <h3 className="text-3xl font-bold font-display text-white">
                Certifications
              </h3>
              <p className="text-sm text-muted">
                Academic milestones, professional code internships, and targeted engineering workshops.
              </p>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card hover-lift rounded-xl p-4 bg-surface/50 border-white/10 hover:border-accent/25 relative group flex items-start gap-4"
                >
                  <div className="p-2 bg-black/40 rounded-lg border border-white/5 mt-0.5 select-none text-accent">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white font-display leading-tight group-hover:text-accent transition-colors">
                        {cert.title}
                      </h4>
                      <span className="text-[9px] font-mono text-muted whitespace-nowrap bg-black/35 rounded-full px-2 py-0.5 border border-white/5">
                        {cert.period}
                      </span>
                    </div>
                    
                    <span className="text-[10px] text-primary font-mono block">
                      {cert.issuer}
                    </span>
                    
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-mono">
                      {cert.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
