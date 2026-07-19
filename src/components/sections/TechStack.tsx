"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Layers, Terminal, Server, Database, Cloud, Cpu, ShieldCheck } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMedusa,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiTerraform,
  SiDocker,
  SiGithubactions,
  SiGit,
  SiPostman,
  SiJest,
  SiQdrant,
  SiN8N,
  SiGithub,
  SiPython,
  SiDjango,
  SiLangchain
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbApi, TbSql } from "react-icons/tb";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  stats: {
    count: number;
    level: string;
    usage: number;
  };
  technologies: TechItem[];
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  // Mouse tilt variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springSettings = { stiffness: 100, damping: 18 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springSettings);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springSettings);

  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Ripple click effect
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;
      const newRipple = { x: xPos, y: yPos, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }
  };

  // Mouse move handler for spotlight & 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current && !isReducedMotion) {
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setSpotlightPos({ x: mouseX, y: mouseY });

      const relativeX = (mouseX / width) - 0.5;
      const relativeY = (mouseY / height) - 0.5;

      x.set(relativeX);
      y.set(relativeY);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Stagger animation for technologies pills
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } },
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.1 }}
      style={{
        rotateX: isReducedMotion ? 0 : rotateX,
        rotateY: isReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={isHovered ? { y: -8, scale: 1.04 } : { y: 0, scale: 1 }}
      className="relative glass-card rounded-2xl p-6 bg-surface/40 border-white/10 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-primary/5 overflow-hidden group flex flex-col justify-between cursor-pointer min-h-[440px] select-none"
    >
      {/* 1. Animated gradient border background wrapper */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl opacity-10 group-hover:opacity-40 transition-all duration-500 animate-gradient-xy -z-10" />

      {/* 2. Floating blurred glow orbs behind the card */}
      <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 blur-3xl pointer-events-none transition-all duration-500" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-accent/5 group-hover:bg-accent/10 blur-3xl pointer-events-none transition-all duration-500" />

      {/* 3. Decorative SVG grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

      {/* 4. Spotlight glow following mouse */}
      {isHovered && !isReducedMotion && (
        <div
          className="absolute -inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 229, 255, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* 5. Ripple click effect overlays */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-primary/15 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 80,
            height: 80,
            animation: "ripple 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
          }}
        />
      ))}

      {/* 6. Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Card Header & Content */}
      <div className="relative z-10 w-full">
        <div className="flex items-center justify-between mb-4">
          {/* Category Icon */}
          <div className="p-3 bg-black/45 rounded-xl border border-white/5 group-hover:border-primary/20 group-hover:text-primary transition-all duration-300 transform group-hover:rotate-12 shrink-0">
            {category.icon}
          </div>
          {/* Tech count badge */}
          <span className="text-[9px] font-mono text-muted bg-black/40 border border-white/5 px-2 py-0.5 rounded-full select-none">
            {category.stats.count} TECHS
          </span>
        </div>

        <h4 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-primary transition-colors duration-300">
          {category.title}
        </h4>

        <p className="text-[11px] text-muted font-mono mt-2 leading-relaxed">
          {category.desc}
        </p>

        {/* Technologies Pills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-1.5 mt-5"
        >
          {category.technologies.map((tech) => (
            <motion.span
              key={tech.name}
              variants={itemVariants}
              className="inline-flex items-center gap-1 text-[9px] font-mono text-muted hover:text-white bg-black/35 rounded-full px-2.5 py-1 border border-white/5 hover:border-primary/25 transition-all select-none"
            >
              <span className="scale-75 shrink-0">{tech.icon}</span>
              {tech.name}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Card Footer / Stats */}
      <div className="relative z-10 w-full mt-6 pt-4 border-t border-white/5 space-y-3">
        <div className="flex justify-between items-center text-[10px] font-mono text-muted">
          <span>EXPERIENCE</span>
          <span className="text-primary font-bold">{category.stats.level}</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-[9px] font-mono text-muted">
            <span>CORE STACK WEIGHT</span>
            <span>{category.stats.usage}%</span>
          </div>
          {/* Progress bar */}
          <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${category.stats.usage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </div>
        </div>

        {/* Bottom accent indicator */}
        <div className="w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full mt-2" />
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Tech" },
    { id: "languages", label: "Languages" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Database" },
    { id: "cloud-devops", label: "Cloud & DevOps" },
    { id: "ai", label: "AI & Auto" },
    { id: "testing", label: "Testing & VC" }
  ];

  const categoriesData: Category[] = [
    {
      id: "languages",
      title: "Programming Languages",
      icon: <Terminal className="h-6 w-6 text-primary" />,
      desc: "Core scripting languages, typed architectures, and query languages powering backend engines.",
      stats: { count: 5, level: "Advanced", usage: 95 },
      technologies: [
        { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
        { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
        { name: "SQL", icon: <TbSql className="text-[#00758F]" /> },
        {
          name: "HTML/CSS",
          icon: (
            <div className="flex gap-0.5 items-center">
              <SiHtml5 className="text-[#E34F26]" />
              <SiCss className="text-[#1572B6]" />
            </div>
          )
        }
      ]
    },
    {
      id: "backend",
      title: "Backend Engineering",
      icon: <Server className="h-6 w-6 text-primary" />,
      desc: "Web application runtimes, RESTful controllers, headless commerce engines, and API contract specifications.",
      stats: { count: 5, level: "Advanced", usage: 98 },
      technologies: [
        { name: "Node.js", icon: <SiNodedotjs className="text-[#339933] animate-pulse" /> },
        { name: "Express.js", icon: <SiExpress className="text-white/80" /> },
        { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
        { name: "MedusaJS", icon: <SiMedusa className="text-[#9926FF]" /> },
        { name: "RESTful APIs", icon: <TbApi className="text-[#00BCD4]" /> }
      ]
    },
    {
      id: "database",
      title: "Database Paradigms",
      icon: <Database className="h-6 w-6 text-primary" />,
      desc: "Relational storage schemas, transactional queries, session caching, and asynchronous task queues.",
      stats: { count: 3, level: "Advanced", usage: 90 },
      technologies: [
        { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
        { name: "Redis", icon: <SiRedis className="text-[#DC382D] animate-pulse" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> }
      ]
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps Infrastructure",
      icon: <Cloud className="h-6 w-6 text-primary" />,
      desc: "Container orchestration, Infrastructure as Code scripts, and continuous integration pipeline runners.",
      stats: { count: 7, level: "Intermediate", usage: 85 },
      technologies: [
        { name: "AWS ECS", icon: <FaAws className="text-[#FF9900]" /> },
        { name: "AWS RDS", icon: <FaAws className="text-[#FF9900]" /> },
        { name: "AWS CloudFront", icon: <FaAws className="text-[#FF9900]" /> },
        { name: "Terraform", icon: <SiTerraform className="text-[#7B42BC]" /> },
        { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
        { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
        { name: "Git", icon: <SiGit className="text-[#F05032]" /> }
      ]
    },
    {
      id: "ai",
      title: "AI Automations & Workflows",
      icon: <Cpu className="h-6 w-6 text-primary" />,
      desc: "Vector databases lookup scoring, semantic prompt contexts, and node-based intake pipeline routers.",
      stats: { count: 3, level: "Advanced", usage: 92 },
      technologies: [
        { name: "Qdrant", icon: <SiQdrant className="text-[#FF4800]" /> },
        { name: "LLM RAG", icon: <SiLangchain className="text-[#13DEC9] animate-pulse" /> },
        { name: "n8n", icon: <SiN8N className="text-[#FF6C37]" /> }
      ]
    },
    {
      id: "testing",
      title: "Testing & Version Control",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      desc: "Assertive endpoint states, automated testing suites, and repository branch protection policies.",
      stats: { count: 3, level: "Advanced", usage: 90 },
      technologies: [
        { name: "Jest", icon: <SiJest className="text-[#C21325]" /> },
        { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
        { name: "GitHub Setup", icon: <SiGithub className="text-white" /> }
      ]
    }
  ];

  // Marquee list of all technologies
  const allTechnologies = categoriesData.flatMap(cat => cat.technologies);
  const marqueeItems = [...allTechnologies, ...allTechnologies];

  const filteredCategories = activeCategory === "all"
    ? categoriesData
    : categoriesData.filter(cat => cat.id === activeCategory);

  return (
    <section
      id="tech-stack"
      className="relative py-24 border-b border-white/5 bg-black/35"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.015)_0%,transparent_60%)] pointer-events-none" />

      {/* Infinite Marquee of Technologies */}
      <div className="w-full overflow-hidden border-y border-white/5 bg-black/40 py-4 select-none mb-16 relative">
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-[200%] animate-marquee gap-8 whitespace-nowrap text-sm font-mono text-muted uppercase tracking-widest">
          {marqueeItems.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="shrink-0 inline-flex items-center justify-center scale-90">{tech.icon}</span>
              <span className="hover:text-white transition-colors">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary font-mono select-none">
            <Layers className="h-3.5 w-3.5" />
            Core Stack
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Technical Arsenal
          </h3>
          <p className="text-sm text-muted max-w-lg mx-auto">
            Categorized overview of backend engines, database paradigms, automated pipelines, and developer frameworks.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 select-none">
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

        {/* Dynamic Category Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat, idx) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                index={idx}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
