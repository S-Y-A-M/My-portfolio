"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Terminal, HelpCircle, User, Cpu, AlertTriangle, RefreshCw } from "lucide-react";

interface LogLine {
  text: string;
  type: "input" | "success" | "info" | "error" | "output";
}

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<LogLine[]>([
    { text: "$ npm run deploy", type: "input" },
    { text: "✔ API Server Running", type: "success" },
    { text: "✔ Docker Container Started", type: "success" },
    { text: "✔ CI Pipeline Passed", type: "success" },
    { text: "✔ AWS Deployment Successful", type: "success" },
  ]);
  const [input, setInput] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showHack, setShowHack] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Listen to CommandPalette custom events
  useEffect(() => {
    const handleCommand = (e: Event) => {
      const cmd = (e as CustomEvent).detail;
      if (cmd) {
        handleExecuteCommand(cmd);
      }
    };
    window.addEventListener("terminal-command", handleCommand);
    return () => window.removeEventListener("terminal-command", handleCommand);
  }, []);

  // Matrix Code Rain Background Logic
  useEffect(() => {
    if (!showMatrix || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 300;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5, 8, 22, 0.08)"; // Match theme background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FFA3"; // Accent color for matrix
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [showMatrix]);

  const handleExecuteCommand = async (cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    let command = trimmed;
    // Strip leading / or $ for convenience
    if (command.startsWith("/")) command = command.substring(1);
    if (command.startsWith("$")) command = command.substring(1).trim();

    const parts = command.split(" ");
    const mainCommand = parts[0].toLowerCase();

    // Add command to log history
    setHistory((prev) => [...prev, { text: `$ ${trimmed}`, type: "input" }]);

    if (mainCommand === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (mainCommand === "help") {
      setHistory((prev) => [
        ...prev,
        { text: "Available commands:", type: "info" },
        { text: "  deploy   - Run mock production build & deployment pipeline", type: "output" },
        { text: "  skills   - List all backend skills and technologies", type: "output" },
        { text: "  about    - Brief profile about Syam Krishnan PK", type: "output" },
        { text: "  socials  - Quick links to GitHub and LinkedIn profiles", type: "output" },
        { text: "  matrix   - Toggle retro code rain background", type: "output" },
        { text: "  hack     - Run simulated security penetration sequence", type: "output" },
        { text: "  clear    - Clear terminal logs screen", type: "output" },
      ]);
      setInput("");
      return;
    }

    if (mainCommand === "deploy") {
      if (isDeploying) {
        setHistory((prev) => [...prev, { text: "Deployment already in progress...", type: "error" }]);
        setInput("");
        return;
      }
      setIsDeploying(true);
      setHistory((prev) => [...prev, { text: "Initializing pipeline build...", type: "info" }]);

      const steps = [
        { text: "✔ Lint check completed (0 errors, 4 warnings)", type: "success" },
        { text: "✔ Compilation successful (Target: Next.js Node target)", type: "success" },
        { text: "✔ Bundling Docker image (syam/node-backend-api:latest)", type: "success" },
        { text: "✔ Pushing Docker image to AWS ECR registry", type: "success" },
        { text: "✔ Executing Terraform apply: ecs_service, redis_cache", type: "success" },
        { text: "✔ Swapping blue-green deployment traffic targets", type: "success" },
        { text: "✔ Deployment complete! Production traffic live.", type: "success" },
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise((res) => setTimeout(res, 800));
        setHistory((prev) => [...prev, steps[i] as LogLine]);
      }
      setIsDeploying(false);
      setInput("");
      return;
    }

    if (mainCommand === "skills") {
      setHistory((prev) => [
        ...prev,
        { text: "--- SYAM KRISHNAN PK - TECH STACK ---", type: "info" },
        { text: "Languages: JavaScript, TypeScript, SQL, HTML/CSS", type: "output" },
        { text: "Backend:   Node.js, Express.js, MedusaJS, RESTful APIs", type: "output" },
        { text: "Database:  PostgreSQL, Redis, MongoDB, Qdrant Vector DB", type: "output" },
        { text: "Cloud:     AWS (ECS, RDS, S3, Route53, CloudFront), Terraform", type: "output" },
        { text: "DevOps:    Docker, CI/CD pipelines (GitHub Actions), Git", type: "output" },
        { text: "AI & Auto: Qdrant Vector Search, LLM RAG APIs, n8n, Flowise", type: "output" },
      ]);
      setInput("");
      return;
    }

    if (mainCommand === "matrix") {
      setShowMatrix((prev) => !prev);
      setHistory((prev) => [
        ...prev,
        { text: `Matrix code rain ${!showMatrix ? "ENABLED" : "DISABLED"}.`, type: "info" },
      ]);
      setInput("");
      return;
    }

    if (mainCommand === "about") {
      setHistory((prev) => [
        ...prev,
        { text: "Syam Krishnan PK | Backend Node.js Developer", type: "info" },
        { text: "Location: Thrissur, Kerala, India (Open for relocation to GCC)", type: "output" },
        { text: "Specializes in Express.js microservices, scalable MedusaJS multi-vendor marketplaces, Redis caching layers, and Terraform automation.", type: "output" },
      ]);
      setInput("");
      return;
    }

    if (mainCommand === "socials") {
      setHistory((prev) => [
        ...prev,
        { text: "GitHub:   https://github.com/syamkrishnanpk", type: "output" },
        { text: "LinkedIn: https://linkedin.com/in/syam-krishnan-pk", type: "output" },
      ]);
      setInput("");
      return;
    }

    if (mainCommand === "hack") {
      setShowHack(true);
      setHistory((prev) => [...prev, { text: "Injecting scripts... Bypass firewalls...", type: "error" }]);
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { text: "CRITICAL ACCESS GRANTED.", type: "success" },
          { text: "PORTFOLIO ROOT SECURED BY Node.js ENGINE.", type: "success" },
        ]);
        setShowHack(false);
      }, 2000);
      setInput("");
      return;
    }

    // Default error fallback
    setHistory((prev) => [
      ...prev,
      { text: `Command not found: '${mainCommand}'. Type 'help' for options.`, type: "error" },
    ]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleExecuteCommand(input);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="glass-card relative flex h-[380px] w-full flex-col overflow-hidden rounded-xl bg-black/75 shadow-2xl border-white/10 glow-primary cursor-text"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-surface/50 px-4 py-2 select-none z-10">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted font-mono">
          <Terminal className="h-3 w-3 text-primary animate-pulse" />
          <span>syam@node-deploy-server:~</span>
        </div>
        <div className="w-12" /> {/* Spacer to center title */}
      </div>

      {/* Canvas for Matrix Code Rain */}
      {showMatrix && (
        <canvas
          ref={canvasRef}
          className="absolute inset-x-0 bottom-0 top-8 w-full z-0 opacity-20 pointer-events-none"
        />
      )}

      {/* Terminal logs container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed scrollbar-thin z-10 relative"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              line.type === "input"
                ? "text-white"
                : line.type === "success"
                ? "text-accent"
                : line.type === "error"
                ? "text-red-400 font-semibold"
                : line.type === "info"
                ? "text-primary"
                : "text-muted"
            }`}
          >
            {line.text}
          </div>
        ))}

        {isDeploying && (
          <div className="flex items-center gap-2 text-primary">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span>Deploying to AWS cluster...</span>
          </div>
        )}

        {showHack && (
          <div className="text-red-400 animate-pulse font-bold text-center py-2 border border-red-500/20 bg-red-500/5 my-2">
            [!] OVERRIDING SECURE SHELL INTERFACES [!]
          </div>
        )}
      </div>

      {/* Command prompt input */}
      <div className="flex items-center border-t border-white/5 bg-black/30 px-4 py-2 z-10 select-none">
        <span className="text-primary font-mono mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isDeploying}
          placeholder={isDeploying ? "Deploying..." : "Type 'help'..."}
          className="flex-1 bg-transparent text-foreground placeholder-muted font-mono text-sm outline-none border-none"
        />
        <button
          onClick={() => handleExecuteCommand(input)}
          className="ml-2 rounded p-1 hover:bg-white/10 text-muted hover:text-primary transition-colors"
          title="Run Command"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
        </button>
      </div>
    </div>
  );
}
