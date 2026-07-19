"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Database, Cpu, Cloud, Terminal, Shield, RefreshCw } from "lucide-react";

interface Node {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  status: "active" | "standby" | "processing";
  details: string[];
  x: number; // grid layout coordinates %
  y: number;
}

export default function ArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = useState<string | null>("api");

  const nodes: Node[] = [
    {
      id: "client",
      label: "Client Layer",
      sub: "Next.js / Shopify Storefront",
      icon: <Server className="h-5 w-5 text-primary" />,
      status: "active",
      details: ["HTTPS / WebSocket protocol", "CloudFront Global CDN routing", "JWT stateless sessions", "REST/GraphQL consumption"],
      x: 10,
      y: 50,
    },
    {
      id: "api",
      label: "API Gateway & Router",
      sub: "Express.js Node API",
      icon: <Cpu className="h-5 w-5 text-secondary" />,
      status: "active",
      details: ["CORS security layers", "Rate limiting (express-rate-limit)", "Winston backend logging", "Middleware auth guard"],
      x: 35,
      y: 50,
    },
    {
      id: "redis",
      label: "Redis Cache Layer",
      sub: "In-Memory Database",
      icon: <RefreshCw className="h-5 w-5 text-accent animate-spin" style={{ animationDuration: "6s" }} />,
      status: "active",
      details: ["API response cache (10s TTL)", "BullMQ background queues", "Rate limit storage backend", "User session tracking"],
      x: 60,
      y: 20,
    },
    {
      id: "postgres",
      label: "PostgreSQL DB",
      sub: "MedusaJS / App Schema",
      icon: <Database className="h-5 w-5 text-[#336791]" />,
      status: "standby",
      details: ["Prisma/Sequelize ORM mapped", "Connection pooling (pg-pool)", "Index optimized queries", "Auto-backup AWS RDS"],
      x: 60,
      y: 80,
    },
    {
      id: "bullmq",
      label: "BullMQ Worker Engine",
      sub: "Background Job Processor",
      icon: <Terminal className="h-5 w-5 text-orange-400" />,
      status: "processing",
      details: ["Asynchronous worker processes", "Automatic task retry policy", "Shopify inventory syncs", "Transactional email dispatch"],
      x: 85,
      y: 20,
    },
    {
      id: "ai_n8n",
      label: "AI RAG & n8n Agent",
      sub: "Qdrant Vector + LLM Integration",
      icon: <Shield className="h-5 w-5 text-amber-400" />,
      status: "processing",
      details: ["n8n workflow visual hooks", "Qdrant Vector DB indexes", "Langchain semantic processing", "Citizen Support Chatbot API"],
      x: 85,
      y: 80,
    },
  ];

  return (
    <div className="glass-card relative rounded-2xl border-white/10 p-6 md:p-8 bg-black/40 overflow-hidden w-full">
      {/* Grid Pattern Inside Component */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

      <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-2">
        <LayersIcon className="h-5 w-5 text-primary" />
        Interactive System Architecture
      </h3>
      <p className="text-sm text-muted mb-8 max-w-xl">
        Hover or click on any system node to inspect specific details about my implementation architecture, technologies used, and deployment strategies.
      </p>

      {/* SVG Canvas for flow lines */}
      <div className="relative h-[360px] w-full border border-white/5 bg-black/25 rounded-xl overflow-hidden mb-6">
        <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
          {/* Definitions for arrow markers & gradients */}
          <defs>
            <linearGradient id="flow-grad-primary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="flow-grad-redis" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00FFA3" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Client -> API Connection line */}
          <path
            d="M 100 180 Q 200 180, 275 180"
            fill="none"
            stroke="url(#flow-grad-primary)"
            strokeWidth="2"
            strokeDasharray="8 8"
            className="animate-[dash_30s_linear_infinite]"
          />
          {/* Animated data packet */}
          <circle r="4" fill="#00E5FF" className="animate-[packet-client-api_4s_linear_infinite]" />

          {/* API -> Redis Connection line */}
          <path
            d="M 335 180 Q 420 180, 500 72"
            fill="none"
            stroke="url(#flow-grad-redis)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle r="4" fill="#6C63FF" className="animate-[packet-api-redis_3s_linear_infinite]" />

          {/* API -> Postgres Connection line */}
          <path
            d="M 335 180 Q 420 180, 500 288"
            fill="none"
            stroke="url(#flow-grad-primary)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle r="4" fill="#00E5FF" className="animate-[packet-api-postgres_3.5s_linear_infinite]" />

          {/* Redis -> BullMQ Connection line */}
          <path
            d="M 700 72 L 780 72"
            fill="none"
            stroke="#00FFA3"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <circle r="4" fill="#00FFA3" className="animate-[packet-redis-bull_2s_linear_infinite]" />

          {/* Postgres -> AI Automation/n8n */}
          <path
            d="M 700 288 L 780 288"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <circle r="4" fill="#00E5FF" className="animate-[packet-postgres-ai_2.5s_linear_infinite]" />
        </svg>

        {/* Nodes Positioning Layer */}
        <div className="absolute inset-0 z-10">
          {nodes.map((node) => {
            const isSelected = selectedNode === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl p-3 text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-surface border-primary glow-primary scale-105 border-2 text-white"
                    : "bg-surface/80 border-white/10 hover:border-white/30 text-muted hover:text-foreground scale-100 border"
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-black/40 ${isSelected ? "border border-primary/20" : ""}`}>
                    {node.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider font-display text-white">
                      {node.label}
                    </h4>
                    <p className="text-[10px] text-muted-foreground truncate max-w-[120px] font-mono leading-none mt-1">
                      {node.sub}
                    </p>
                  </div>
                </div>

                {/* Status Dot */}
                <div className="absolute top-2 right-2 flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      node.status === "active"
                        ? "bg-accent"
                        : node.status === "processing"
                        ? "bg-primary"
                        : "bg-yellow-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      node.status === "active"
                        ? "bg-accent"
                        : node.status === "processing"
                        ? "bg-primary"
                        : "bg-yellow-400"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Node Details Inspection Panel */}
      <div className="glass-card rounded-xl p-4 bg-white/5 border-white/5">
        {selectedNode ? (
          (() => {
            const node = nodes.find((n) => n.id === selectedNode);
            if (!node) return null;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-1 flex items-center gap-2">
                    {node.icon}
                    {node.label}
                  </h4>
                  <span className="text-xs text-primary font-mono">{node.sub}</span>
                </div>
                <div className="md:col-span-2">
                  <h5 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    Engineering Strategy:
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-muted font-mono list-inside list-disc">
                    {node.details.map((detail, index) => (
                      <li key={index} className="hover:text-foreground transition-colors">
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
            Click on any node above to inspect pipeline engineering details.
          </div>
        )}
      </div>

      {/* Styled Animations for SVG Packets */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        @keyframes packet-client-api {
          0% { motion-path: path('M 100 180 Q 200 180, 275 180'); motion-offset: 0%; }
          100% { motion-path: path('M 100 180 Q 200 180, 275 180'); motion-offset: 100%; }
        }
        @keyframes packet-api-redis {
          0% { motion-path: path('M 335 180 Q 420 180, 500 72'); motion-offset: 0%; }
          100% { motion-path: path('M 335 180 Q 420 180, 500 72'); motion-offset: 100%; }
        }
        @keyframes packet-api-postgres {
          0% { motion-path: path('M 335 180 Q 420 180, 500 288'); motion-offset: 0%; }
          100% { motion-path: path('M 335 180 Q 420 180, 500 288'); motion-offset: 100%; }
        }
        @keyframes packet-redis-bull {
          0% { motion-path: path('M 700 72 L 780 72'); motion-offset: 0%; }
          100% { motion-path: path('M 700 72 L 780 72'); motion-offset: 100%; }
        }
        @keyframes packet-postgres-ai {
          0% { motion-path: path('M 700 288 L 780 288'); motion-offset: 0%; }
          100% { motion-path: path('M 700 288 L 780 288'); motion-offset: 100%; }
        }
      `}</style>
    </div>
  );
}

function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m12 3-10 5 10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}
