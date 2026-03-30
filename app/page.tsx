"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "../components/smooth-scroll-provider";
import OmIntro from "../components/om-intro";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Cpu,
  Globe,
  Database,
  Wrench,
  Code2,
  ChevronDown,
  ArrowUpRight,
  Star,
  Zap,
  Award,
  Coffee,
} from "lucide-react";
import Link from "next/link";
import React from "react";

/* ─────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────── */
const skillGroups = [
  {
    icon: Code2,
    label: "Languages",
    color: "#06b6d4",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SQL"],
  },
  {
    icon: Globe,
    label: "Frontend",
    color: "#8b5cf6",
    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Zustand", "ShadCN/UI"],
  },
  {
    icon: Terminal,
    label: "Backend",
    color: "#ec4899",
    items: ["Node.js", "Express.js", "RESTful APIs", "GraphQL", "JWT Auth", "WebSockets"],
  },
  {
    icon: Database,
    label: "Databases",
    color: "#f59e0b",
    items: ["MongoDB", "PostgreSQL", "Redis (Upstash)", "MySQL"],
  },
  {
    icon: Cpu,
    label: "DevOps / Tools",
    color: "#10b981",
    items: ["Git", "Docker", "AWS (EC2, S3, RDS)", "Vercel", "Render", "Cloudinary", "Postman"],
  },
];

const projects = [
  {
    title: "Resume Builder",
    emoji: "📄",
    description: "Full-stack resume builder with live preview, templates, and secure authentication.",
    bullets: [
      "8+ professional templates with real-time editing",
      "JWT + Bcrypt auth with MongoDB Atlas",
      "PDF/DOCX/TXT export via html2pdf",
      "Cloudinary integration for profile photos",
    ],
    impact: "40% faster document generation",
    tech: ["React", "Node.js", "MongoDB", "Tailwind", "Cloudinary"],
    link: "https://github.com/kartikey116/ResumeBuilder-Vrttantam",
    gradient: "from-cyan-500/20 to-blue-600/20",
    accentColor: "#06b6d4",
  },
  {
    title: "ShopEase — E-Commerce",
    emoji: "🛒",
    description: "Scalable MERN e-commerce platform with Redis caching and Stripe payments.",
    bullets: [
      "Product catalog, cart & secure checkout",
      "Redis (Upstash) for session & data caching",
      "Stripe payment gateway integration",
      "Environment-based Vercel deployment",
    ],
    impact: "Reduced DB load & improved response times",
    tech: ["MERN", "Redis", "Stripe", "Cloudinary"],
    link: "https://github.com/kartikey116/E-commerce",
    gradient: "from-purple-500/20 to-pink-600/20",
    accentColor: "#8b5cf6",
  },
  {
    title: "Motia — Support System",
    emoji: "💬",
    description: "Real-time customer support system with WebSocket-based live chat.",
    bullets: [
      "Live chat via WebSockets",
      "Ticket management system",
      "Role-based authentication",
      "Containerized with Docker",
    ],
    impact: "Improved support team efficiency",
    tech: ["Node.js", "WebSocket", "MongoDB", "Docker"],
    link: "https://github.com/kartikey116/Motia-Customer-Support",
    gradient: "from-emerald-500/20 to-cyan-600/20",
    accentColor: "#10b981",
  },
  {
    title: "AI Chatbot",
    emoji: "🤖",
    description: "Conversational AI chatbot with intelligent, context-aware response handling.",
    bullets: [
      "Context-aware conversations",
      "AI API integration",
      "Modern React UI",
      "Cloud deployment",
    ],
    impact: "Automated customer interactions",
    tech: ["React", "Node.js", "AI API"],
    link: "https://github.com/kartikey116/ChatbotAI",
    gradient: "from-orange-500/20 to-amber-600/20",
    accentColor: "#f59e0b",
  },
  {
    title: "Blue Carbon Registry",
    emoji: "🌿",
    description: "Smart India Hackathon — Blockchain-based carbon credit tracking system.",
    bullets: [
      "4th place among 100+ teams (National SIH)",
      "REST APIs for carbon credit MRV",
      "Backend lead role — Node.js",
      "Agile 6-member team collaboration",
    ],
    impact: "National-level hackathon recognition",
    tech: ["Node.js", "Express", "MongoDB", "Blockchain"],
    link: "https://github.com/kartikey116/backendCarbon",
    gradient: "from-green-500/20 to-teal-600/20",
    accentColor: "#34d399",
  },
];

const stats = [
  { icon: Star, value: 5, label: "Projects Shipped", suffix: "+", color: "#06b6d4" },
  { icon: Coffee, value: 1000, label: "Commits Made", suffix: "+", color: "#8b5cf6" },
  { icon: Award, value: 4, label: "SIH Ranking", suffix: "th", color: "#f59e0b" },
  { icon: Zap, value: 8.23, label: "CGPA Score", suffix: "", color: "#10b981", decimal: true },
];

const typewriterPhrases = [
  "Full Stack Developer",
  "MERN Stack Engineer",
  "Cloud & DevOps Enthusiast",
  "Problem Solver",
  "Open Source Contributor",
];

/* ─────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────── */

/** Custom cursor that follows the mouse */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + "px";
        ringRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/** Floating music player — YouTube Lofi embed */
function MusicPlayer() {
  const VIDEO_ID = "5zx2xseVpSE"; // Lofi Hip Hop Radio — Chillhop Music
  const [muted, setMuted] = useState(true);   // start muted for autoplay
  const [paused, setPaused] = useState(false);
  const bars = [2, 5, 3, 6, 4, 5, 3];

  const src = paused
    ? ""
    : `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${VIDEO_ID}`;

  const unmute = () => {
    // remount iframe without mute — browser allows this inside a click handler
    setMuted(false);
  };

  return (
    <>
      {/* Hidden iframe */}
      {!paused && (
        <iframe
          key={muted ? "muted" : "unmuted"}   // key change forces remount
          style={{ position: "fixed", width: 0, height: 0, border: "none", opacity: 0, pointerEvents: "none" }}
          src={src}
          allow="autoplay"
          title="lofi music"
        />
      )}

      {/* Unmute toast — visible only while muted */}
      {muted && !paused && (
        <div
          onClick={unmute}
          style={{
            position: "fixed", bottom: 80, right: 28, zIndex: 9999,
            display: "flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))",
            border: "1px solid rgba(6,182,212,0.5)",
            borderRadius: 999, padding: "10px 20px",
            backdropFilter: "blur(16px)",
            cursor: "pointer", userSelect: "none",
            animation: "pulse-glow 2s ease-in-out infinite",
            boxShadow: "0 0 20px rgba(6,182,212,0.3)",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>🔊</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "#06b6d4", whiteSpace: "nowrap" }}>
            CLICK FOR SOUND
          </span>
        </div>
      )}

      {/* Floating pill — play/pause control */}
      <div
        onClick={() => setPaused(p => !p)}
        title={paused ? "Play music" : "Pause music"}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 9998,
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(3,7,18,0.88)",
          border: `1px solid ${!paused ? "rgba(6,182,212,0.55)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 999, padding: "10px 18px",
          backdropFilter: "blur(16px)",
          boxShadow: !paused
            ? "0 0 30px rgba(6,182,212,0.3), 0 4px 24px rgba(0,0,0,0.5)"
            : "0 4px 20px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.4s, border 0.4s",
          cursor: "pointer", userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 18 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              width: 3, borderRadius: 2,
              background: !paused ? `hsl(${175 + i * 18}, 80%, 62%)` : "rgba(255,255,255,0.18)",
              height: !paused ? "100%" : `${(h / 6) * 45}%`,
              transformOrigin: "bottom",
              animation: !paused ? `eq-bar ${0.35 + i * 0.09}s ease-in-out infinite alternate` : "none",
              transition: "background 0.4s, height 0.4s",
            }} />
          ))}
        </div>
        <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", color: !paused ? "#06b6d4" : "rgba(255,255,255,0.38)", whiteSpace: "nowrap" }}>
          {paused ? "LOFI" : muted ? "MUTED" : "LOFI ON"}
        </span>
        <span style={{ fontSize: "0.85rem", color: !paused ? "#06b6d4" : "rgba(255,255,255,0.38)" }}>
          {paused ? "▶" : "⏸"}
        </span>
      </div>
    </>
  );
}


/** Scroll-driven progress bar */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="scroll-bar"
      style={{ scaleX, width: "100%" }}
    />
  );
}

/** Aurora background blob */
function AuroraBlob({
  className,
  color,
  delay = 0,
}: {
  className?: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ background: color }}
      animate={{
        scale: [1, 1.3, 1.1, 1],
        x: [0, 60, -40, 0],
        y: [0, -40, 60, 0],
        opacity: [0.25, 0.45, 0.3, 0.25],
      }}
      transition={{
        duration: 14,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

/** Floating particle field */
function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 6,
    color: ["#06b6d4", "#8b5cf6", "#ec4899", "#10b981"][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,

          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/** Hero profile photo — 3D animated */
function Hero3DObject() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-18, 18]), { stiffness: 200, damping: 25 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -18, 0] }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className="relative w-64 h-64 md:w-80 md:h-80"
      >
        {/* Animated glow ring */}
        <motion.div
          className="absolute -inset-2 rounded-full"
          animate={{
            boxShadow: [
              "0 0 30px rgba(6,182,212,0.5), 0 0 60px rgba(139,92,246,0.3)",
              "0 0 60px rgba(139,92,246,0.6), 0 0 90px rgba(236,72,153,0.3)",
              "0 0 30px rgba(6,182,212,0.5), 0 0 60px rgba(139,92,246,0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ border: "1.5px solid rgba(6,182,212,0.35)" }}
        />

        {/* Photo */}
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{
            border: "2px solid rgba(6,182,212,0.5)",
            transform: "translateZ(20px)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image.png"
            alt="Kartikey Upadhyay"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/** Animated typewriter */
function Typewriter({ phrases }: { phrases: string[] }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    if (wait) return;
    const phrase = phrases[phraseIdx];
    if (deleting) {
      if (displayed.length === 0) {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
        return;
      }
      const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 45);
      return () => clearTimeout(t);
    } else {
      if (displayed.length === phrase.length) {
        setWait(true);
        setTimeout(() => {
          setWait(false);
          setDeleting(true);
        }, 2200);
        return;
      }
      const t = setTimeout(
        () => setDisplayed((d) => phrase.slice(0, d.length + 1)),
        80
      );
      return () => clearTimeout(t);
    }
  }, [displayed, deleting, phraseIdx, phrases, wait]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-[1.1em] bg-cyan-400 ml-0.5 align-middle"
      />
    </span>
  );
}

/** Animated counter */
function Counter({ value, suffix, decimal }: { value: number; suffix: string; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const from = 0;
    const to = value;
    const dur = 1800;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      node.textContent = decimal
        ? current.toFixed(2)
        : Math.round(current).toString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, decimal]);

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

/** 3D tilt card (mouse-tracking) */
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

/** Project card: 3D flip on hover */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

  const onMove = (e: React.MouseEvent) => {
    if (flipped || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[420px]"
      style={{ perspective: "1200px" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHovered(true)}
    >
      {/* Flip container */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          rotateX: flipped ? 0 : rotateX,
          rotateY: flipped ? 180 : rotateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer glass group"
          style={{ backfaceVisibility: "hidden", border: `1px solid rgba(255,255,255,0.07)` }}
          onClick={() => setFlipped(true)}
        >
          {/* Gradient glow bg */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
          {/* Shimmer on hover */}
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(110deg, transparent 30%, ${project.accentColor}15 50%, transparent 70%)`,
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}
          <div className="relative z-10 p-7 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
              <div>
                <span className="text-3xl mb-2 block">{project.emoji}</span>
                <h3
                  className="text-xl font-bold text-white transition-colors"
                  style={{ textShadow: hovered ? `0 0 20px ${project.accentColor}` : "none" }}
                >
                  {project.title}
                </h3>
              </div>
              <Link
                href={project.link}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl glass hover:scale-110 transition-transform"
              >
                <ArrowUpRight className="w-4 h-4" style={{ color: project.accentColor }} />
              </Link>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    background: `${project.accentColor}15`,
                    border: `1px solid ${project.accentColor}30`,
                    color: project.accentColor,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Flip hint */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <motion.div
                animate={{ rotateY: [0, 180, 180, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                ↻
              </motion.div>
              Click to see details
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${project.accentColor}20, rgba(139,92,246,0.15))`,
            border: `1px solid ${project.accentColor}40`,
          }}
          onClick={() => setFlipped(false)}
        >
          <div className="p-7 flex flex-col h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
              <button
                className="text-gray-400 hover:text-white text-sm transition-colors"
                onClick={() => setFlipped(false)}
              >
                ✕ flip back
              </button>
            </div>

            <ul className="space-y-3 flex-1">
              {project.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-gray-300">
                  <span style={{ color: project.accentColor }}>▹</span>
                  {b}
                </li>
              ))}
            </ul>

            <div
              className="mt-5 p-3 rounded-xl text-sm font-medium"
              style={{
                background: `${project.accentColor}15`,
                border: `1px solid ${project.accentColor}30`,
                color: project.accentColor,
              }}
            >
              🚀 Impact: {project.impact}
            </div>

            <Link
              href={project.link}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${project.accentColor}, #8b5cf6)` }}
            >
              <Github className="w-4 h-4" />
              View on GitHub
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Skill group card */
function SkillGroup({
  group,
  index,
}: {
  group: typeof skillGroups[0];
  index: number;
}) {
  const Icon = group.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="group rounded-2xl glass p-6 hover:border-white/15 transition-all duration-500 border border-white/6">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: `${group.color}20`,
              border: `1px solid ${group.color}40`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: group.color }} />
          </div>
          <h3 className="font-bold text-white tracking-wide">{group.label}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {group.items.map((skill, j) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + j * 0.05 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="skill-tag"
              style={{
                ["--hover-color" as string]: group.color,
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   KONAMI CODE EASTER EGG
───────────────────────────────────────────────────── */
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];


/* ─────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const lenis = useLenis();

  // Parallax transforms — smooth because Lenis feeds Framer Motion
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const orb3dY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const [activeSection, setActiveSection] = useState("hero");
  const [konamiBuffer, setKonamiBuffer] = useState<string[]>([]);
  const [easterEgg, setEasterEgg] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  // Smooth scroll to section on nav click via Lenis
  const scrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.4 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Konami code detector
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKonamiBuffer((buf) => {
        const next = [...buf, e.key].slice(-10);
        if (next.join(",") === KONAMI.join(",")) {
          setEasterEgg(true);
          setTimeout(() => setEasterEgg(false), 5000);
          return [];
        }
        return next;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Section spy
  useEffect(() => {
    const sections = ["hero", "about", "projects", "skills", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const navLinks = ["About", "Projects", "Skills", "Contact"];

  return (
    <>
      {/* ── OM INTRO ── */}
      <AnimatePresence>
        {!introDone && <OmIntro onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      {/* ── MAIN PORTFOLIO (fades in after intro) ── */}
      <motion.main
        className="bg-noise min-h-screen overflow-hidden"
        style={{ background: "#030712" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <CustomCursor />
        <ScrollProgress />
        <MusicPlayer />

        {/* AURORA BACKGROUND — with parallax layers */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <motion.div style={{ y: blob1Y }}>
            <AuroraBlob
              className="w-[700px] h-[700px] -top-48 -left-48"
              color="rgba(6,182,212,0.12)"
              delay={0}
            />
          </motion.div>
          <motion.div style={{ y: blob2Y }}>
            <AuroraBlob
              className="w-[600px] h-[600px] top-1/2 -right-32"
              color="rgba(139,92,246,0.12)"
              delay={4}
            />
          </motion.div>
          <motion.div style={{ y: blob3Y }}>
            <AuroraBlob
              className="w-[500px] h-[500px] bottom-0 left-1/3"
              color="rgba(236,72,153,0.08)"
              delay={8}
            />
          </motion.div>
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(rgba(6,182,212,0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <Particles />

        {/* EASTER EGG */}
        <AnimatePresence>
          {easterEgg && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            >
              <div className="text-center p-12 rounded-3xl glass-strong border border-cyan-400/30">
                <div className="text-7xl mb-4">🎮</div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Konami Code Unlocked!
                </h2>
                <p className="text-gray-400 mt-3">You found the easter egg! You're a true dev 🚀</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── NAVBAR ── */}
        <motion.nav
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed top-5 left-0 right-0 z-50 mx-auto max-w-5xl px-4"
        >
          <div className="glass-strong rounded-2xl px-6 py-4 flex justify-between items-center shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            {/* Logo */}
            <motion.span
              className="text-xl font-black tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              whileHover={{ scale: 1.05 }}
            >
              &lt;K/&gt;
            </motion.span>

            {/* Nav links */}
            <div className="flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className={`nav-link transition-colors bg-transparent border-none cursor-pointer ${activeSection === link.toLowerCase()
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  {link}
                </button>
              ))}
              <a
                href="/Kartikey_R_esume.pdf"
                download
                className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                  boxShadow: "0 4px 20px rgba(6,182,212,0.3)",
                }}
              >
                Resume ↓
              </a>
            </div>
          </div>
        </motion.nav>

        {/* ── HERO ── */}
        <section
          id="hero"
          className="relative max-w-6xl mx-auto px-6 pt-36 pb-24 min-h-screen flex items-center"
        >
          {/* Parallax wrapper — fades + rises as user scrolls past hero */}
          <motion.div
            style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
            className="w-full grid md:grid-cols-[1fr_auto] gap-16 items-center"
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {/* LEFT */}
            <div>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="status-badge mb-8 inline-flex w-fit"
              >
                <div className="status-dot" />
                Available for Opportunities
              </motion.div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 font-mono text-sm mb-3 tracking-widest uppercase"
              >
                👋 Hello, I&apos;m
              </motion.p>

              {/* Name — split letters with 3D entrance */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-7xl md:text-8xl font-black tracking-tighter leading-none mb-2"
                style={{ perspective: "500px", display: "flex" }}
              >
                {"KARTIKEY".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="hero-letter"
                    initial={{ opacity: 0, y: 60, rotateX: -60 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: "linear-gradient(135deg, #e2e8f0 30%, #06b6d4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      transformStyle: "preserve-3d",
                      display: "inline-block",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Typewriter subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl md:text-3xl font-bold mb-8 h-10"
              >
                <Typewriter phrases={typewriterPhrases} />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10"
              >
                Crafting{" "}
                <span className="text-cyan-400 font-semibold">intelligent</span> and{" "}
                <span className="text-purple-400 font-semibold">scalable</span> digital
                experiences with modern tech. MERN · AWS · DevOps · UI/UX.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="magnetic-btn magnetic-btn-primary"
                >
                  <Mail className="w-4 h-4" />
                  Get In Touch
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="magnetic-btn magnetic-btn-secondary glass"
                >
                  View Projects
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="flex gap-4 mt-10"
              >
                {[
                  { href: "https://github.com/Kartikey116", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/kartikey-upadhyay/", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:kartikeyu07@gmail.com", icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors border border-white/6"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — profile photo with holographic ring + floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ y: orb3dY }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex justify-center items-center relative"
            >
              {/* Holographic spinning ring */}
              <motion.div
                className="absolute rounded-full holo-ring"
                style={{ inset: "-6px", opacity: 0.7 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              />
              {/* Inner white ring separator */}
              <div className="absolute rounded-full" style={{ inset: "-3px", background: "#030712", borderRadius: "9999px" }} />

              {/* Floating code badges */}
              {[
                { text: "⚡ React", top: "0%", left: "-30%", delay: 1.2 },
                { text: "☁ AWS", top: "20%", left: "110%", delay: 1.5 },
                { text: "🐋 Docker", top: "75%", left: "-28%", delay: 1.8 },
                { text: "🛠 Node.js", top: "80%", left: "100%", delay: 2.0 },
              ].map(({ text, top, left, delay }) => (
                <motion.div
                  key={text}
                  className="absolute code-badge chroma-hover z-20"
                  style={{ top, left }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{
                    opacity: { delay, duration: 0.5 },
                    scale: { delay, duration: 0.5 },
                    y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  {text}
                </motion.div>
              ))}

              <Hero3DObject />
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs"
          >
            <span className="uppercase tracking-widest font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── MARQUEE TICKER ── */}
        {(() => {
          const row1 = [
            { tech: "React", color: "#61dafb" },
            { tech: "Next.js", color: "#ffffff" },
            { tech: "TypeScript", color: "#3178c6" },
            { tech: "Node.js", color: "#68a063" },
            { tech: "MongoDB", color: "#47a248" },
            { tech: "PostgreSQL", color: "#336791" },
            { tech: "Docker", color: "#2496ed" },
            { tech: "AWS", color: "#ff9900" },
            { tech: "React", color: "#61dafb" },
            { tech: "Next.js", color: "#ffffff" },
            { tech: "TypeScript", color: "#3178c6" },
            { tech: "Node.js", color: "#68a063" },
            { tech: "MongoDB", color: "#47a248" },
            { tech: "PostgreSQL", color: "#336791" },
            { tech: "Docker", color: "#2496ed" },
            { tech: "AWS", color: "#ff9900" },
          ];
          const row2 = [
            { tech: "Redis", color: "#dc382d" },
            { tech: "Tailwind CSS", color: "#38bdf8" },
            { tech: "GraphQL", color: "#e10098" },
            { tech: "Framer Motion", color: "#bb4de3" },
            { tech: "Prisma", color: "#5a67d8" },
            { tech: "Vercel", color: "#ffffff" },
            { tech: "Git", color: "#f05032" },
            { tech: "Figma", color: "#f24e1e" },
            { tech: "Redis", color: "#dc382d" },
            { tech: "Tailwind CSS", color: "#38bdf8" },
            { tech: "GraphQL", color: "#e10098" },
            { tech: "Framer Motion", color: "#bb4de3" },
            { tech: "Prisma", color: "#5a67d8" },
            { tech: "Vercel", color: "#ffffff" },
            { tech: "Git", color: "#f05032" },
            { tech: "Figma", color: "#f24e1e" },
          ];

          const Row = ({ items, reverse }: { items: typeof row1; reverse?: boolean }) => (
            <div style={{ overflow: "hidden", width: "100%", paddingBlock: "10px" }}>
              <div style={{
                display: "flex",
                flexDirection: "row",
                width: "max-content",
                gap: "2.5rem",
                alignItems: "center",
                animation: `${reverse ? "marquee-reverse" : "marquee"} 25s linear infinite`,
              }}>
                {items.map(({ tech, color }, i) => (
                  <span key={i} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    whiteSpace: "nowrap",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color,
                    background: `${color}18`,
                    border: `1px solid ${color}40`,
                    borderRadius: "8px",
                    padding: "5px 12px",
                    boxShadow: `0 0 8px ${color}20`,
                    flexShrink: 0,
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );

          return (
            <div className="border-y border-white/5 py-2" style={{ background: "rgba(255,255,255,0.01)" }}>
              <div className="max-w-5xl mx-auto overflow-hidden px-6">
                <Row items={row1} />
                <Row items={row2} reverse />
              </div>
            </div>
          );
        })()}


        {/* ── ABOUT ── */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Section heading */}
            <div className="flex items-center gap-4 mb-14">
              <span className="font-mono text-cyan-400 text-sm">01.</span>
              <h2 className="section-title">About Me</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid md:grid-cols-[1.2fr_1fr] gap-8">
              {/* Terminal card */}
              <TiltCard className="terminal rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5 border-b border-cyan-400/10 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-gray-600 text-xs font-mono">kartikey@portfolio:~$</span>
                </div>

                {[
                  { cmd: "whoami", out: "Kartikey Upadhyay — Full Stack Dev | MERN | AWS", delay: 0 },
                  { cmd: "cat education.txt", out: "B.Tech CSE (Data Science)\nABES Engineering College | CGPA: 8.23 | 2023–2027", delay: 0.3 },
                  { cmd: "cat courses.json", out: '["DSA", "DBMS", "OS", "CN", "OOP", "WebDev"]', delay: 0.6 },
                  { cmd: "cat achievements.log", out: "→ SIH — 4th Place (National Round)\n→ Active Open Source Contributor", delay: 0.9 },
                ].map(({ cmd, out, delay }) => (
                  <motion.div
                    key={cmd}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay, duration: 0.5 }}
                    className="mb-5"
                  >
                    <div className="terminal-line">
                      <span className="terminal-prompt">$</span>
                      <span className="text-emerald-400 font-mono text-sm">{cmd}</span>
                    </div>
                    <p className="terminal-output font-mono text-sm mt-1.5 whitespace-pre-line pl-4 border-l border-cyan-400/20">
                      {out}
                    </p>
                  </motion.div>
                ))}
              </TiltCard>

              {/* Right column: timeline + extra info */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="glass rounded-2xl p-6 border border-white/6"
                >
                  <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                    <span className="text-cyan-400">⚡</span> Journey
                  </h3>
                  <div className="space-y-6">
                    {[
                      { year: "2023", label: "Started B.Tech CSE (Data Science)", color: "#06b6d4" },
                      { year: "2024", label: "Built first MERN full-stack apps", color: "#8b5cf6" },
                      { year: "2024", label: "SIH — 4th Place (National)", color: "#f59e0b" },
                      { year: "2025", label: "AWS, Docker & advanced DevOps", color: "#10b981" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="timeline-item"
                      >
                        <div
                          className="timeline-dot"
                          style={{ background: item.color, boxShadow: `0 0 12px ${item.color}` }}
                        />
                        <div className="text-xs font-mono mb-1" style={{ color: item.color }}>
                          {item.year}
                        </div>
                        <div className="text-sm text-gray-300">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Interests */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="glass rounded-2xl p-6 border border-white/6"
                >
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="text-purple-400">🎯</span> Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["System Design", "Open Source", "AI/ML", "Web3", "Cloud Arch.", "DSA"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section className="max-w-5xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="stat-card"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${stat.color}20`, border: `1px solid ${stat.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div
                    className="text-4xl font-black mb-1"
                    style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}60` }}
                  >
                    <Counter value={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="font-mono text-purple-400 text-sm">02.</span>
            <h2 className="section-title">Featured Projects</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm mb-10 font-mono"
          >
          // Hover over a card · Click to flip for details
          </motion.p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="font-mono text-pink-400 text-sm">03.</span>
            <h2 className="section-title">Skills & Tech</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {skillGroups.map((group, i) => (
              <SkillGroup key={group.label} group={group} index={i} />
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="max-w-4xl mx-auto px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="font-mono text-emerald-400 text-sm">04.</span>
            <h2 className="section-title">Let's Connect</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TiltCard className="contact-card glass-strong relative overflow-hidden">
              {/* Holographic shimmer inside */}
              <div className="absolute inset-0 holographic opacity-60 pointer-events-none rounded-2xl" />
              {/* Top decoration */}


              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-6xl mb-6 block"
                >
                  🚀
                </motion.div>

                <h3 className="text-4xl font-black text-white mb-4">
                  Let's Build Something{" "}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}
                  >
                    Amazing
                  </span>
                </h3>

                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                  I'm open to full-time roles, freelance projects, and exciting collaborations.
                  Let's connect and create something extraordinary together.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    {
                      href: "mailto:kartikeyu07@gmail.com",
                      icon: Mail,
                      label: "Say Hello",
                      color: "#06b6d4",
                      gradient: "from-cyan-500 to-blue-500",
                    },
                    {
                      href: "https://github.com/Kartikey116",
                      icon: Github,
                      label: "GitHub",
                      color: "#8b5cf6",
                      gradient: "from-purple-500 to-pink-500",
                    },
                    {
                      href: "https://www.linkedin.com/in/kartikey-upadhyay/",
                      icon: Linkedin,
                      label: "LinkedIn",
                      color: "#0ea5e9",
                      gradient: "from-sky-500 to-cyan-500",
                    },
                  ].map(({ href, icon: Icon, label, gradient }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      whileHover={{ scale: 1.06, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex items-center gap-3 px-7 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r ${gradient} shadow-lg transition-all`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </motion.a>
                  ))}
                </div>

                <p className="mt-10 text-gray-600 text-sm font-mono">
                  kartikeyu07@gmail.com · @Kartikey116
                </p>
              </div>
            </TiltCard>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-10 border-t border-white/5 relative z-10">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <span
              className="font-black text-lg text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #06b6d4, #8b5cf6)" }}
            >
              &lt;K/&gt;
            </span>
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Kartikey Upadhyay · Built with Next.js & Framer Motion
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-700">
              <span>Try</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-gray-500">
                ↑↑↓↓←→←→BA
              </kbd>
              <span>😉</span>
            </div>
          </div>
        </footer>
      </motion.main>
    </>
  );
}
