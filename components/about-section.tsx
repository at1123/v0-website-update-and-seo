"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap, MapPin, Heart } from "lucide-react"

export function AboutSection() {
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
      id="about"
      className="relative mx-auto max-w-6xl px-5 py-28"
    >
      <h2
        className={`mb-16 text-center font-mono text-3xl font-bold md:text-4xl ${
          visible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        About <span className="text-primary">Me</span>
      </h2>

      <div
        className={`mx-auto max-w-3xl ${visible ? "animate-fade-in-up" : "opacity-0"}`}
        style={{ animationDelay: "0.2s" }}
      >
        <div className="relative rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-sm md:p-10">
          {/* Decorative corner accents */}
          <div className="absolute left-0 top-0 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-primary/40" />
          <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-primary/40" />

          <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            I{"'"}m a class nine student from Bogura, Bangladesh. I like building websites, breaking them
            accidentally, fixing them proudly, and repeating the cycle. I study at{" "}
            <strong className="text-foreground">APBN Public School and College</strong>. I play chess like
            every move is a blunder, take photos like the moment might never come back, and write poems when
            my brain refuses to stay silent. This website is not serious. I am serious about learning though.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">School</p>
                <p className="text-sm font-medium text-foreground">APBN PSC</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-foreground">Bogura, BD</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                <Heart className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Passion</p>
                <p className="text-sm font-medium text-foreground">Creating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
