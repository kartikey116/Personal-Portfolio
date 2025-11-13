"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

const skills = {
  Frontend: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)", "React.js", "Zustand", "ShadCN/UI"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Bcrypt.js"],
  Databases: ["MongoDB", "PostgreSQL", "SQL", "Redis (Upstash)"],
  "DevOps & Cloud": ["AWS (EC2, S3, RDS, IAM)", "Docker", "Vercel", "Neon DB"],
}

const projects = [
  {
    title: "Resume Builder",
    description: "Full-stack resume creation web app with customizable templates and export options",
    features: [
      "Live editing & preview",
      "40% faster exports with html2pdf",
      "PDF/DOCX/TXT export",
      "Secure JWT auth",
      "Mobile responsive",
    ],
    tech: ["MERN Stack", "Tailwind CSS", "html2pdf", "Vercel"],
    link: "https://github.com/kartikey116/ResumeBuilder-Vrttantam",
    highlight: true,
  },
  {
    title: "ShopEase E-Commerce",
    description: "Scalable e-commerce platform with real-time cart management and secure checkout",
    features: [
      "Real-time cart management",
      "JWT + Redis session handling",
      "Responsive design",
      "99.9% uptime",
      "Stripe integration",
    ],
    tech: ["MERN Stack", "Stripe", "Redis", "Vercel"],
    link: "https://github.com/kartikey116/E-commerce",
    highlight: true,
  },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold animate-slide-in-right" style={{ animationDelay: "0s" }}>
            KARTIKEY
          </div>
          <div className="flex items-center gap-6">
            {["About", "Projects", "Skills", "Contact"].map((item, idx) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 animate-slide-in-right"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-32">
          <div className="space-y-6">
            <div className={isLoaded ? "animate-fade-in-up" : "opacity-0"} style={{ animationDelay: "0.1s" }}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                KARTIKEY
              </h1>
              <p className="text-xl text-muted-foreground mt-2">Full Stack Developer & MERN Stack Expert</p>
            </div>
            <p
              className={`text-lg text-muted-foreground max-w-2xl leading-relaxed ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              I build scalable, high-performance web applications using modern technologies. Specialized in MERN stack,
              cloud infrastructure, and creating seamless user experiences.
            </p>
            <div
              className={`flex gap-4 pt-4 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                asChild
                className="gap-2 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href="mailto:Kartikeyu07@gmail.com">
                  <Mail className="w-4 h-4" />
                  Get in touch
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="gap-2 bg-white hover:bg-secondary shadow-md hover:shadow-lg transition-shadow border-border"
              >
                <a href="https://github.com/Kartikey116" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="border-b border-border bg-gradient-to-b from-background via-secondary/20 to-background"
      >
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2
            className={`text-3xl font-bold mb-8 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            About
          </h2>
          <div
            className={`space-y-4 text-muted-foreground ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.5s" }}
          >
            <p className="leading-relaxed">
              I'm a B-Tech student in Computer Science with specialization in Data Science at ABES Engineering College,
              graduating in July 2027. Currently CGPA: 8.25/10. I'm passionate about building full-stack applications
              that solve real problems.
            </p>
            <p className="leading-relaxed">
              My expertise spans frontend development with React and Tailwind CSS, backend systems with Node.js and
              Express, and cloud infrastructure with AWS. I've built projects deployed on Vercel achieving 99.9% uptime
              with optimized performance.
            </p>
            <p className="leading-relaxed">
              Beyond development, I've participated in hackathons including PRAGYAN and Smart India Hackathon (4th
              position), where I developed innovative solutions using AWS services and modern web technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2
            className={`text-3xl font-bold mb-12 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.6s" }}
          >
            Featured Projects
          </h2>
          <div className="space-y-8">
            {projects.map((project, idx) => (
              <Card
                key={idx}
                className={`border-border bg-white hover:shadow-xl transition-all duration-300 hover:border-primary/30 ${isLoaded ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${0.7 + idx * 0.15}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <CardDescription className="text-base mt-2">{project.description}</CardDescription>
                    </div>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors flex-shrink-0 mt-1 hover:scale-110 transform duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-3 text-foreground">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2 group">
                          <span className="text-primary mt-1 group-hover:scale-125 transition-transform">→</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-3 text-foreground">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium hover:bg-primary hover:text-white transition-colors transform hover:scale-105 duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="border-b border-border bg-gradient-to-b from-background via-secondary/20 to-background"
      >
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2
            className={`text-3xl font-bold mb-12 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "1s" }}
          >
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], idx) => (
              <div
                key={category}
                className={`p-6 rounded-lg bg-white border border-border hover:border-primary/30 transition-all duration-300 ${isLoaded ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${1.1 + idx * 0.1}s` }}
              >
                <h3 className="font-semibold text-lg mb-4 text-primary">{category}</h3>
                <ul className="space-y-3">
                  {items.map((skill, skillIdx) => (
                    <li key={skillIdx} className="text-sm text-muted-foreground flex items-center gap-2 group">
                      <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></span>
                      <span className="group-hover:text-foreground transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2
            className={`text-3xl font-bold mb-8 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "1.5s" }}
          >
            Let's Connect
          </h2>
          <p
            className={`text-muted-foreground mb-8 max-w-2xl ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "1.6s" }}
          >
            I'm always open to new opportunities, collaborations, and interesting projects. Feel free to reach out!
          </p>
          <div
            className={`space-y-4 ${isLoaded ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "1.7s" }}
          >
            <div className="flex items-center gap-3 group">
              <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <a href="mailto:Kartikeyu07@gmail.com" className="hover:text-primary transition-colors">
                Kartikeyu07@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 group">
              <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <a
                href="https://www.linkedin.com/in/kartikey-upadhyay/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                linkedin.com/in/kartikey
              </a>
            </div>
            <div className="flex items-center gap-3 group">
              <Github className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <a
                href="https://github.com/Kartikey116"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                github.com/Kartikey
              </a>
            </div>
            <div className="flex items-center gap-3 group">
              <span className="text-primary text-sm group-hover:scale-110 transition-transform origin-left">📱</span>
              <a href="tel:+917302209937" className="hover:text-primary transition-colors">
                +91 7302209937
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-secondary/30 to-background border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 KARTIKEY. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="https://github.com/Kartikey116"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/kartikey-upadhyay/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:Kartikeyu07@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
