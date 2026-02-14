"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap, MapPin, ExternalLink, BookOpen, Calendar } from "lucide-react"

export function AboutSection() {
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
    <section ref={sectionRef} id="about" className="relative mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <h2 className={`mb-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
        About <span className="gradient-text">Me</span>
      </h2>
      <p className={`mx-auto mb-14 max-w-md text-center text-sm text-muted-foreground sm:text-base ${visible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
        {"The person behind this chaotic website"}
      </p>

      <div className={`mx-auto max-w-3xl ${visible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
        <div className="relative rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8 md:p-10">
          {/* Corner accents */}
          <div className="absolute left-0 top-0 h-12 w-12 rounded-tl-2xl border-l-2 border-t-2 border-primary/30 sm:h-16 sm:w-16" />
          <div className="absolute bottom-0 right-0 h-12 w-12 rounded-br-2xl border-b-2 border-r-2 border-primary/30 sm:h-16 sm:w-16" />

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            {"I'm a class nine student from "}
            <span className="font-semibold text-foreground">Bogura, Bangladesh</span>
            {". I like building websites, breaking them accidentally, fixing them proudly, and repeating the cycle. I study at "}
            <a
              href="https://4apbnpsc.edu.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1 font-semibold text-primary transition-colors hover:text-accent"
            >
              APBN Public School and College
              <ExternalLink className="inline h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {"."}
          </p>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            {"I play chess like every move is a blunder, take photos like the moment might never come back, and write poems when my brain refuses to stay silent. This website is not serious. "}
            <span className="font-semibold text-accent">I am serious about learning though.</span>
          </p>

          {/* Info cards - removed Passion, kept School, Location, added Class and more */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3.5 transition-all hover:border-primary/30 hover:bg-primary/5 sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                <GraduationCap className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">School</p>
                <a href="https://4apbnpsc.edu.bd/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-foreground transition-colors hover:text-primary sm:text-sm">
                  APBN PSC
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3.5 transition-all hover:border-accent/30 hover:bg-accent/5 sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 sm:h-10 sm:w-10">
                <MapPin className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Location</p>
                <p className="text-xs font-semibold text-foreground sm:text-sm">Bogura, BD</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3.5 transition-all hover:border-primary/30 hover:bg-primary/5 sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                <BookOpen className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Class</p>
                <p className="text-xs font-semibold text-foreground sm:text-sm">Nine</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3.5 transition-all hover:border-destructive/30 hover:bg-destructive/5 sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 sm:h-10 sm:w-10">
                <Calendar className="h-4 w-4 text-destructive sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</p>
                <p className="text-xs font-semibold text-foreground sm:text-sm">Learning daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
