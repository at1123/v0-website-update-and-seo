"use client"

import { useEffect, useState, useRef } from "react"
import { Code, ChevronRight, Gamepad2, Sparkles } from "lucide-react"

const typingTexts = [
  "Class 9 Student from Bangladesh",
  "Self-taught Web Developer",
  "Chess enthusiast (mostly blunders)",
  "Photographer of random things",
  "Poet when nobody is looking",
]

export function HeroSection() {
  const [text, setText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const currentText = typingTexts[textIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentText.slice(0, charIndex + 1))
          setCharIndex((prev) => prev + 1)
          if (charIndex + 1 === currentText.length) {
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          setText(currentText.slice(0, charIndex - 1))
          setCharIndex((prev) => prev - 1)
          if (charIndex - 1 === 0) {
            setIsDeleting(false)
            setTextIndex((prev) => (prev + 1) % typingTexts.length)
          }
        }
      },
      isDeleting ? 35 : 65
    )
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 25,
        y: (e.clientY - rect.top - rect.height / 2) / 25,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 pt-20 text-center"
      aria-label="Introduction"
    >
      {/* Ambient glow orbs */}
      <div
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px] transition-transform duration-1000 md:h-[600px] md:w-[600px]"
        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px] transition-transform duration-1000"
        style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        {/* Badge */}
        <div className="mb-8 inline-flex animate-float items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm text-primary backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Student / Developer / Professional Overthinker</span>
        </div>

        {/* Name with enhanced text effect */}
        <h1 className="mb-2 text-balance font-sans text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-8xl">
          <span className="text-foreground">{"I'm "}</span>
          <span className="relative inline-block">
            <span className="gradient-text">Ahnaf Tahsin</span>
            <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-primary/30" />
          </span>
        </h1>

        {/* Fun subtitle */}
        <p className="mb-6 text-base text-muted-foreground sm:text-lg">
          {"and I break websites professionally (then fix them... eventually)"}
        </p>

        {/* Typing animation */}
        <div className="mx-auto mb-10 flex h-8 items-center justify-center gap-2 font-mono text-base text-accent sm:text-lg">
          <span className="text-primary/50">{">"}</span>
          <span>{text}</span>
          <span className="animate-pulse-glow text-primary">{"_"}</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 sm:text-base"
          >
            Who am I?
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#fun"
            className="group inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/5 px-7 py-3.5 text-sm font-semibold text-destructive transition-all hover:scale-105 hover:bg-destructive/10 active:scale-95 sm:text-base"
          >
            <Gamepad2 className="h-4 w-4" />
            Play Games
          </a>
          <a
            href="https://game.ahnaftahsin.ami.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-7 py-3.5 text-sm font-semibold text-accent transition-all hover:scale-105 hover:bg-accent/10 active:scale-95 sm:text-base"
          >
            <Code className="h-4 w-4" />
            Tic Tac Khamba
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">Scroll</span>
        <div className="h-10 w-5 rounded-full border-2 border-muted-foreground/20 p-1">
          <div className="h-2 w-full animate-bounce rounded-full bg-primary/60" />
        </div>
      </div>
    </section>
  )
}
