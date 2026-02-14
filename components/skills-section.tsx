"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Bot, Type, Camera } from "lucide-react"

const skills = [
  {
    icon: Code,
    title: "Web Basics",
    description: "HTML, CSS, JavaScript",
    color: "primary" as const,
  },
  {
    icon: Bot,
    title: "AI Experiments",
    description: "Chatbot UI & logic experiments",
    color: "accent" as const,
  },
  {
    icon: Type,
    title: "Typography",
    description: "Fonts, spacing & visual rhythm",
    color: "primary" as const,
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Moments, light & framing",
    color: "destructive" as const,
  },
]

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
    glow: "group-hover:shadow-primary/10",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/20",
    glow: "group-hover:shadow-accent/10",
  },
  destructive: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    glow: "group-hover:shadow-destructive/10",
  },
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative mx-auto max-w-6xl px-5 py-28"
    >
      <h2
        className={`mb-16 text-center font-mono text-3xl font-bold md:text-4xl ${
          visible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        Skills &amp; <span className="text-primary">Interests</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, i) => {
          const colors = colorMap[skill.color]
          return (
            <div
              key={skill.title}
              className={`group relative rounded-2xl border ${colors.border} bg-card/60 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${colors.glow} ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
            >
              <div
                className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
              >
                <skill.icon className={`h-7 w-7 ${colors.text}`} />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">{skill.description}</p>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, hsl(var(--${skill.color}) / 0.06) 0%, transparent 70%)`,
                }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
