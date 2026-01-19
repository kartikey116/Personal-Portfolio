"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import CommandPalette from "../components/command-palette";
import Link from "next/link";

/* =========================
   DATA (FROM YOUR RESUME)
========================= */

const skills = {
  Languages: ["JavaScript (ES6+)", "HTML5", "CSS3", "SQL"],
  Frontend: [
    "React.js",
    "Tailwind CSS",
    "Zustand",
    "ShadCN/UI",
    "Responsive Design",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "RESTful APIs",
    "JWT Authentication",
    "Cookie-based Auth",
    "WebSockets"
  ],
  Databases: ["MongoDB (Mongoose)", "PostgreSQL", "Redis (Upstash)"],
  Tools: [
    "Git",
    "GitHub",
    "Postman",
    "VS Code",
    "Vercel",
    "Render",
    "Cloudinary",
    "AWS (EC2, S3, RDS)",
  ],
};

const projects = [
  {
    title: "Resume Builder",
    description:
      "Full-stack resume builder with live preview, templates, and secure authentication.",
    bullets: [
      "8+ professional resume templates with live preview editing",
      "JWT + Bcrypt authentication with MongoDB Atlas",
      "PDF / DOCX / TXT export using html2pdf",
      "Cloudinary integration for profile image uploads",
      "Fully responsive UI deployed on Vercel",
    ],
    impact: "40% faster document generation & optimized asset delivery",
    tech: ["React", "Node.js", "MongoDB", "Tailwind", "Cloudinary"],
    link: "https://github.com/kartikey116/ResumeBuilder-Vrttantam",
  },
  {
    title: "ShopEase – E-Commerce Platform",
    description:
      "Scalable MERN e-commerce platform with Redis caching and Stripe payments.",
    bullets: [
      "Product catalog, cart management & secure checkout",
      "Redis (Upstash) for session & data caching",
      "Stripe payment gateway integration",
      "Cloudinary image optimization",
      "Environment-based deployment on Vercel",
    ],
    impact: "Reduced DB load & improved response times",
    tech: ["MERN", "Redis", "Stripe", "Cloudinary"],
    link: "https://github.com/kartikey116/E-commerce",
  },
  {
    title: "Motia – Customer Support System",
    description:
      "Real-time customer support system with WebSocket-based live chat.",
    bullets: [
      "Live chat using WebSockets",
      "Ticket management system",
      "Role-based authentication",
    ],
    impact: "Improved support efficiency",
    tech: ["Node.js", "WebSocket", "MongoDB", "Docker"],
    link: "https://github.com/kartikey116/Motia-Customer-Support",
  },

  {
    title: "AI Chatbot",
    description: "Conversational AI chatbot with intelligent response handling.",
    bullets: [
      "Context-aware conversations",
      "AI API integration",
      "Modern React UI",
      "Cloud deployment",
    ],
    impact: "Automated user interaction",
    tech: ["React", "Node.js", "AI"],
    link: "https://github.com/kartikey116/ChatbotAI",
  },

  {
    title: "Blockchain Blue Carbon Registry (SIH)",
    description:
      "Smart India Hackathon project for blockchain-based carbon credit tracking.",
    bullets: [
      "4th position among 100+ teams",
      "REST APIs for carbon credit MRV",
      "Backend lead using Node.js",
      "Agile collaboration in 6-member team",
      "Technical presentation to panel",
    ],
    impact: "National-level hackathon recognition",
    tech: ["Node.js", "Express", "MongoDB", "Blockchain"],
    link: "https://github.com/kartikey116/backendCarbon",
  },
];

/* =========================
   PAGE
========================= */

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) =>
      setMouse({
        x: (e.clientX - window.innerWidth / 2) / 40,
        y: (e.clientY - window.innerHeight / 2) / 40,
      });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="bg-grid min-h-screen">
      <CommandPalette />
      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-96 w-96 bg-cyan-500/30 blur-3xl rounded-full" />
        <div className="absolute top-40 right-0 h-96 w-96 bg-purple-500/30 blur-3xl rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-4 z-50 mx-auto max-w-5xl rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10">
        <div className="flex justify-between px-6 py-4">
          <span className="font-bold text-cyan-400">KARTIKEY</span>
          <div className="flex gap-6 text-sm text-gray-300">
            {["About", "Projects", "Skills", "Contact"].map((i) => (
              <a
                key={i}
                href={`#${i.toLowerCase()}`}
                className="hover:text-cyan-400"
              >
                {i}
              </a>
            ))}
            
          </div>
        </div>
      </nav>

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            const event = new KeyboardEvent("keydown", {
              key: "k",
              ctrlKey: true,
            });
            window.dispatchEvent(event);
          }}
          className="
      px-4 py-2 rounded-xl
      bg-black/60 backdrop-blur
      border border-white/20
      text-sm text-gray-300
      hover:border-cyan-400 hover:text-cyan-400
      transition
    "
        >
          ⌘K / Ctrl+K
        </button>
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-20 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold">KARTIKEY</h1>
            <p className="mt-4 text-xl text-gray-400">
              Full Stack Developer | MERN | Docker | WebSockets | AWS
            </p>

            <div className="mt-8 flex gap-4">
              <a
                className="animate-glow bg-cyan-400 text-black px-6 py-3 rounded-xl"
                href="mailto:kartikeyu07@gmail.com"
              >
                Get in touch
              </a>
              <a
                href="/Kartikey_R_esume.pdf"
                download
                className="
    border border-white/20
    px-6 py-3 rounded-xl
    hover:border-cyan-400
    hover:text-cyan-400
    transition-all
  "
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* FLOATING CARDS */}
          <div className="relative h-[380px] hidden md:block">
            {[
              { t: "Frontend", d: "React · Tailwind · UI", x: 0, y: 0 },
              { t: "Backend", d: "Node · APIs · Auth", x: 80, y: 80 },
              { t: "DevOps", d: "AWS · Docker · CI/CD", x: 20, y: 160 },
            ].map((c, i) => (
              <motion.div
                key={i}
                style={{
                  top: c.y + mouse.y,
                  left: c.x + mouse.x,
                  y: yParallax,
                }}
                className="absolute w-64 p-5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 animate-float"
              >
                <h4 className="font-semibold">{c.t}</h4>
                <p className="text-sm text-gray-400 mt-2">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT (TERMINAL STYLE) */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-6 font-mono text-sm"
        >
          <p className="text-green-400">$ whoami</p>
          <p className="text-gray-300 mt-2">
            Kartikey — Full Stack Developer | MERN | AWS
          </p>

          <p className="text-green-400 mt-4">$ education</p>
          <p className="text-gray-300">
            B.Tech CSE (Data Science), ABES Engineering College <br />
            CGPA: 8.23 / 10 (2023 – 2027)
          </p>

          <p className="text-green-400 mt-4">$ coursework</p>
          <p className="text-gray-300">
            DSA · DBMS · OS · CN · OOP · Web Development
          </p>

          <p className="text-green-400 mt-4">$ achievements</p>
          <p className="text-gray-300">
            Smart India Hackathon – 4th Position (Internal Round)
          </p>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-cyan-400/60 transition-all"
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <Link href={p.link} target="_blank">
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </Link>
              </div>

              <p className="text-gray-400 mt-2">{p.description}</p>

              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {p.bullets.map((b) => (
                  <li key={b}>→ {b}</li>
                ))}
              </ul>

              <p className="text-cyan-400 text-sm mt-4">Impact: {p.impact}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-12">Skills & Technologies</h2>

        <div className="space-y-10">
          {Object.entries(skills).map(([group, items], i) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                {group}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm hover:bg-cyan-400 hover:text-black transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-6">Let’s Connect</h2>
        <div className="space-y-4 text-gray-300">
          <a
            className="flex gap-3 hover:text-cyan-400"
            href="mailto:kartikeyu07@gmail.com"
          >
            <Mail /> Kartikeyu07@gmail.com
          </a>
          <a
            className="flex gap-3 hover:text-cyan-400"
            href="https://github.com/Kartikey116"
          >
            <Github /> GitHub
          </a>
          <a
            className="flex gap-3 hover:text-cyan-400"
            href="https://www.linkedin.com/in/kartikey-upadhyay/"
          >
            <Linkedin /> LinkedIn
          </a>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-500">
        © 2026 Kartikey
      </footer>
    </main>
  );
}
