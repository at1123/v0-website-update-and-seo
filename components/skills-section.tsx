"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Bot, Type, Camera, Crown, PenLine } from "lucide-react"

const skills = [
  {
    icon: Code,
    title: "Web Development",
    description: "HTML, CSS, JavaScript - I build things and then Google why they don't work.",
    color: "primary" as const,
  },
  {
    icon: Bot,
    title: "AI Experiments",
    description: "Chatbot UI, prompt engineering, talking to robots until they make sense.",
    color: "accent" as const,
  },
  {
    icon: Type,
    title: "Typography",
    description: "I care way too much about fonts. Yes, Comic Sans is a crime.",
    color: "primary" as const,
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Moments, light & framing. Also blurry photos I pretend are artistic.",
    color: "destructive" as const,
  },
  {
    icon: Crown,
    title: "Chess",
    description: "I play chess daily. My rating doesn't reflect my confidence though.",
    color: "accent" as const,
  },
  {
    icon: PenLine,
    title: "Poetry",
    description: "I write when feelings overflow. Sometimes it even rhymes.",
    color: "destructive" as const,
  },
]

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
    hoverBorder: "hover:border-primary/40",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/20",
    hoverBorder: "hover:border-accent/40",
  },
  destructive: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    hoverBorder: "hover:border-destructive/40",
  },
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="relative mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <h2 className={`mb-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
        Skills & <span className="gradient-text">Interests</span>
      </h2>
      <p className={`mx-auto mb-14 max-w-md text-center text-sm text-muted-foreground sm:text-base ${visible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
        {"Things I do, things I'm learning, things I'll probably never master"}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, i) => {
          const colors = colorMap[skill.color]
          return (
            <div
              key={skill.title}
              className={`group relative overflow-hidden rounded-2xl border ${colors.border} ${colors.hoverBorder} bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:p-8 ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.08 + 0.2}s` }}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14`}>
                <skill.icon className={`h-5 w-5 ${colors.text} sm:h-6 sm:w-6`} />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">{skill.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{skill.description}</p>

              {/* Subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at center, hsl(var(--${skill.color}) / 0.04) 0%, transparent 70%)` }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
