"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Cpu, Database, Eye, MessageSquare, Terminal } from "lucide-react";

interface WorkflowNode {
  id: string;
  step: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  details: string[];
  x: number; // grid position x
  y: number; // grid position y
}

export default function AIWorkflow() {
  const [activeNode, setActiveNode] = useState<string>("qdrant");

  const nodes: WorkflowNode[] = [
    {
      id: "document",
      step: "01",
      label: "Document Source",
      sub: "PDFs, Shopify catalog, DB",
      icon: <FileText className="h-5 w-5 text-emerald-400" />,
      details: [
        "Recursive text splitting (chunk sizes of 1000 tokens)",
        "Overlaps of 200 tokens to preserve semantic context",
        "Cleans metadata properties (IDs, category types, price brackets)",
        "Automated cron triggers sync source changes"
      ],
      x: 10,
      y: 30,
    },
    {
      id: "embedding",
      step: "02",
      label: "Vector Embeddings",
      sub: "text-embedding-3-small",
      icon: <Cpu className="h-5 w-5 text-indigo-400" />,
      details: [
        "Calls OpenAI / local models to convert text chunks",
        "Generates dense vectors with 1536 floating dimensions",
        "Handles API rate limits via queues and retry mechanisms",
        "Caches embeddings to reduce API execution charges"
      ],
      x: 35,
      y: 30,
    },
    {
      id: "qdrant",
      step: "03",
      label: "Qdrant Vector DB",
      sub: "Vector Index Storage",
      icon: <Database className="h-5 w-5 text-primary" />,
      details: [
        "Stores high-dimensional vectors with payload storage",
        "Configures HNSW index configurations for rapid lookup",
        "Cosine metric similarity calculations for matches",
        "Metadata payload filtering (e.g. status='available')"
      ],
      x: 60,
      y: 50,
    },
    {
      id: "retriever",
      step: "04",
      label: "Semantic Retriever",
      sub: "Query Similarity Matcher",
      icon: <Eye className="h-5 w-5 text-purple-400" />,
      details: [
        "Embeds incoming client prompt query on-the-fly",
        "Executes KNN search retrieving top-K (K=4) closest matches",
        "Scores similarity thresholds (drops chunks scoring < 0.70)",
        "Re-ranks results utilizing Cohere reranking models"
      ],
      x: 35,
      y: 70,
    },
    {
      id: "llm",
      step: "05",
      label: "LLM Orchestrator",
      sub: "Claude / GPT Synthesis",
      icon: <MessageSquare className="h-5 w-5 text-rose-400" />,
      details: [
        "System prompt engineering with strict anti-hallucination guards",
        "Formats top retrieved text fragments into LLM context window",
        "Tracks conversation history in Redis memory buffers",
        "Executes completions via streaming tokens APIs"
      ],
      x: 10,
      y: 70,
    },
  ];

  return (
    <div className="glass-card relative rounded-2xl border-white/10 p-6 md:p-8 bg-black/40 overflow-hidden w-full">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

      <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-2">
        <CpuIcon className="h-5 w-5 text-primary animate-pulse" />
        AI Automation RAG Workflow
      </h3>
      <p className="text-sm text-muted mb-8 max-w-xl">
        A look into how my AI chatbots parse documents, index vectors in Qdrant, and synthesize contextually accurate outputs via LLMs.
      </p>

      {/* SVG flow canvas */}
      <div className="relative h-[320px] w-full border border-white/5 bg-black/25 rounded-xl overflow-hidden mb-6">
        <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
          <defs>
            <linearGradient id="flow-ingest" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="flow-query" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FB7185" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Ingestion Path: Document -> Embedding -> Qdrant */}
          <path
            d="M 100 96 L 275 96 L 500 160"
            fill="none"
            stroke="url(#flow-ingest)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle r="4" fill="#34D399" className="animate-[packet-ingest-1_4s_linear_infinite]" />
          <circle r="4" fill="#00E5FF" className="animate-[packet-ingest-2_4s_linear_infinite]" style={{ animationDelay: "2s" }} />

          {/* Retrieval Path: Qdrant -> Retriever -> LLM -> Client */}
          <path
            d="M 500 160 L 275 224 L 100 224"
            fill="none"
            stroke="url(#flow-query)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle r="4" fill="#A78BFA" className="animate-[packet-retrieve-1_4s_linear_infinite]" />
          <circle r="4" fill="#FB7185" className="animate-[packet-retrieve-2_4s_linear_infinite]" style={{ animationDelay: "2s" }} />
        </svg>

        {/* Nodes overlay */}
        <div className="absolute inset-0 z-10">
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl p-3 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-surface border-primary border-2 glow-primary scale-105 text-white"
                    : "bg-surface/80 border-white/10 hover:border-white/20 text-muted scale-100 border"
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black/40 rounded-lg">
                    {node.icon}
                  </div>
                  <div>
                    <span className="text-[9px] text-primary font-mono block leading-none mb-0.5">
                      STEP {node.step}
                    </span>
                    <h4 className="text-xs font-bold text-white font-display">
                      {node.label}
                    </h4>
                    <p className="text-[9px] text-muted-foreground font-mono leading-none truncate max-w-[110px] mt-0.5">
                      {node.sub}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inspection Details Box */}
      <div className="glass-card rounded-xl p-5 bg-white/5 border-white/5">
        {activeNode ? (
          (() => {
            const node = nodes.find((n) => n.id === activeNode);
            if (!node) return null;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div className="md:col-span-1">
                  <span className="text-[10px] text-accent uppercase font-mono font-bold tracking-widest block mb-0.5">
                    Pipeline Stage {node.step}
                  </span>
                  <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider mb-0.5 flex items-center gap-2">
                    {node.label}
                  </h4>
                  <span className="text-xs text-muted font-mono">{node.sub}</span>
                </div>
                <div className="md:col-span-3">
                  <h5 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    Technical Specifications
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted font-mono list-inside list-disc">
                    {node.details.map((detail, index) => (
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
            Click on any pipeline node to inspect semantic search components.
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes packet-ingest-1 {
          0% { motion-path: path('M 100 96 L 275 96 L 500 160'); motion-offset: 0%; }
          100% { motion-path: path('M 100 96 L 275 96 L 500 160'); motion-offset: 100%; }
        }
        @keyframes packet-ingest-2 {
          0% { motion-path: path('M 100 96 L 275 96 L 500 160'); motion-offset: 0%; }
          100% { motion-path: path('M 100 96 L 275 96 L 500 160'); motion-offset: 100%; }
        }
        @keyframes packet-retrieve-1 {
          0% { motion-path: path('M 500 160 L 275 224 L 100 224'); motion-offset: 0%; }
          100% { motion-path: path('M 500 160 L 275 224 L 100 224'); motion-offset: 100%; }
        }
        @keyframes packet-retrieve-2 {
          0% { motion-path: path('M 500 160 L 275 224 L 100 224'); motion-offset: 0%; }
          100% { motion-path: path('M 500 160 L 275 224 L 100 224'); motion-offset: 100%; }
        }
      `}</style>
    </div>
  );
}

function CpuIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 15h3" />
      <path d="M1 9h3" />
      <path d="M1 15h3" />
    </svg>
  );
}
