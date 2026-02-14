"use client"

import { useEffect, useState, useRef } from "react"
import { Code, ChevronRight, Gamepad2 } from "lucide-react"

const typingTexts = [
  "Class 9 Student from Bangladesh",
  "Learning Web Development....",
  "Chess | Photography | Poetry??",
  "Turning curiosity into pixels...",
]

export function HeroSection() {
  const [text, setText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  // Typing effect
  useEffect(() => {
    const currentText = typingTexts[textIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentText.slice(0, charIndex + 1))
          setCharIndex((prev) => prev + 1)
          if (charIndex + 1 === currentText.length) {
            setTimeout(() => setIsDeleting(true), 1200)
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
      isDeleting ? 40 : 70
    )

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex])

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 30,
        y: (e.clientY - rect.top - rect.height / 2) / 30,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-5 pt-20 text-center"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] transition-transform duration-700"
        style={{
          transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
        }}
      />

      {/* Grid pattern background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
          <Code className="h-4 w-4" />
          <span>Student &amp; Developer</span>
        </div>

        {/* Name */}
        <h1 className="mb-4 text-balance font-sans text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Hello, I{"'"}m{" "}
          <span className="gradient-text">Ahnaf Tahsin</span>
        </h1>

        {/* Typing */}
        <div className="mx-auto mb-10 h-8 font-mono text-lg text-accent md:text-xl">
          {text}
          <span className="animate-pulse-glow ml-0.5 text-primary">{"_"}</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            Explore
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://game.ahnaftahsin.ami.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-destructive/50 bg-destructive/10 px-7 py-3.5 font-medium text-destructive transition-all hover:scale-105 hover:bg-destructive/20"
          >
            <Gamepad2 className="h-4 w-4" />
            Tic Tac Khamba
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll down</span>
        <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 p-1">
          <div className="h-2 w-full animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </section>
  )
}
