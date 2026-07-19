"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitPullRequest, Settings, Terminal, ShieldCheck, CloudLightning, Activity } from "lucide-react";

interface PipelineStep {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  activeColor: string;
  details: string[];
}

export default function PipelineDiagram() {
  const [activeStep, setActiveStep] = useState<string>("actions");

  const steps: PipelineStep[] = [
    {
      id: "github",
      label: "GitHub",
      sub: "Source Code Control",
      icon: <GitPullRequest className="h-5 w-5 text-indigo-400" />,
      activeColor: "border-indigo-400",
      details: [
        "Feature branching workflow with pull requests",
        "Semantic versioning triggers for tag creation",
        "Repository commit hooks for automated checks",
        "SSH signed commits for security auditing"
      ],
    },
    {
      id: "actions",
      label: "GitHub Actions",
      sub: "CI Automation",
      icon: <Settings className="h-5 w-5 text-primary" />,
      activeColor: "border-primary",
      details: [
        "Lints source files using ESLint static analysis",
        "Runs unit and integration tests under Node.js 20",
        "Security audit check using npm audit and Snyk vulnerability scans",
        "Builds Next.js optimized bundles verifying compiler passes"
      ],
    },
    {
      id: "docker",
      label: "Docker",
      sub: "Containerization",
      icon: <Terminal className="h-5 w-5 text-accent animate-pulse" />,
      activeColor: "border-accent",
      details: [
        "Multi-stage Dockerfile setup for minimal images (<120MB)",
        "Leverages Node Alpine base configurations for security",
        "Environment variables management via secret injections",
        "Docker Hub and AWS Elastic Container Registry tagging"
      ],
    },
    {
      id: "terraform",
      label: "Terraform",
      sub: "Infrastructure as Code",
      icon: <ShieldCheck className="h-5 w-5 text-purple-400" />,
      activeColor: "border-purple-400",
      details: [
        "Provisions AWS ECS Fargate, target groups, and load balancers",
        "Automates RDS database and Redis ElastiCache configurations",
        "Manages AWS security groups and VPC subnets modularly",
        "Remote Terraform state locking using AWS S3 & DynamoDB"
      ],
    },
    {
      id: "aws",
      label: "AWS ECS Cluster",
      sub: "Cloud Deployment",
      icon: <CloudLightning className="h-5 w-5 text-amber-400" />,
      activeColor: "border-amber-400",
      details: [
        "Zero-downtime rolling green/blue container updates",
        "Automatic scaling rules based on CPU and memory thresholds",
        "AWS CloudWatch integrations for real-time error log aggregates",
        "Application Load Balancer SSL handshakes via ACM certificates"
      ],
    },
    {
      id: "production",
      label: "Production Gate",
      sub: "Global Availability",
      icon: <Activity className="h-5 w-5 text-rose-400" />,
      activeColor: "border-rose-400",
      details: [
        "Global edge caching with AWS CloudFront CDNs",
        "Health check endpoints monitoring under 200ms latency",
        "MedusaJS storefront routes fully cached at edges",
        "Uptime tracking via status alarms with email triggers"
      ],
    },
  ];

  return (
    <div className="glass-card relative rounded-2xl border-white/10 p-6 md:p-8 bg-black/40 overflow-hidden w-full">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

      <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-2">
        <GitBranchIcon className="h-5 w-5 text-accent" />
        Automated CI/CD DevOps Pipeline
      </h3>
      <p className="text-sm text-muted mb-8 max-w-xl">
        Every commit is vetted, containerized, and deployed programmatically. Click on a pipeline step to review configurations.
      </p>

      {/* Horizontal Flow Slider */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 mb-8">
        {steps.map((step, idx) => {
          const isActive = activeStep === step.id;
          return (
            <div key={step.id} className="relative flex-1 w-full flex items-center justify-between md:block">
              {/* Connector line for Desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-0.5 z-0 bg-gradient-to-r from-white/10 via-accent/30 to-white/10 overflow-hidden">
                  <div className="h-full w-20 bg-gradient-to-r from-transparent via-accent to-transparent animate-[flow-pulse_2s_linear_infinite]" style={{ animationDelay: `${idx * 0.4}s` }} />
                </div>
              )}

              {/* Node Card */}
              <button
                onClick={() => setActiveStep(step.id)}
                className={`relative z-10 w-full md:w-auto mx-auto flex md:flex-col items-center gap-3 p-3 md:p-4 rounded-xl text-left md:text-center transition-all duration-300 ${
                  isActive
                    ? `bg-surface border-2 ${step.activeColor} glow-primary scale-105 text-white`
                    : "bg-surface/50 border border-white/5 hover:border-white/20 text-muted hover:text-foreground scale-100"
                }`}
              >
                <div className={`p-2 rounded-lg bg-black/40`}>
                  {step.icon}
                </div>
                <div className="md:mt-2">
                  <h4 className="text-xs font-bold font-display text-white truncate max-w-[120px]">
                    {step.label}
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-mono truncate max-w-[120px] mt-0.5 leading-none">
                    {step.sub}
                  </p>
                </div>
              </button>

              {/* Connector Line for Mobile */}
              {idx < steps.length - 1 && (
                <div className="md:hidden flex-1 h-12 w-0.5 mx-auto bg-gradient-to-b from-white/10 via-accent to-white/10 overflow-hidden relative">
                  <div className="absolute left-0 right-0 h-4 bg-accent animate-[mobile-flow-pulse_1.5s_linear_infinite]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Details Box */}
      <div className="glass-card rounded-xl p-5 bg-white/5 border-white/5">
        {activeStep ? (
          (() => {
            const step = steps.find((s) => s.id === activeStep);
            if (!step) return null;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div className="md:col-span-1">
                  <span className="text-[10px] text-primary uppercase font-mono font-bold tracking-widest block mb-1">
                    Stage 0{steps.findIndex((s) => s.id === activeStep) + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-0.5 flex items-center gap-2">
                    {step.label}
                  </h4>
                  <span className="text-xs text-muted font-mono">{step.sub}</span>
                </div>
                <div className="md:col-span-3">
                  <h5 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    Automations & Security Controls
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted font-mono list-inside list-disc">
                    {step.details.map((detail, index) => (
                      <li key={index} className="hover:text-foreground transition-colors leading-relaxed">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })()
        ) : (
          <div className="text-center text-xs text-muted py-2">
            Click on a stage node to review deployment pipeline steps.
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes flow-pulse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes mobile-flow-pulse {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
}

function GitBranchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}
