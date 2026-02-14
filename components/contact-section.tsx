"use client"

import { useEffect, useRef, useState } from "react"
import { Facebook, Mail, Phone, ExternalLink } from "lucide-react"

export function ContactSection() {
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
      id="contact"
      className="relative mx-auto max-w-6xl px-5 py-28"
    >
      <h2
        className={`mb-16 text-center font-mono text-3xl font-bold md:text-4xl ${
          visible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        Get in <span className="text-primary">Touch</span>
      </h2>

      <div
        className={`mx-auto max-w-lg ${visible ? "animate-fade-in-up" : "opacity-0"}`}
        style={{ animationDelay: "0.2s" }}
      >
        <div className="relative rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur-sm md:p-10">
          <p className="mb-8 text-muted-foreground">
            Ideas, jokes, chess openings -- all welcome.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="https://www.facebook.com/ahnaftahsin11"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-background/50 p-4 transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Facebook className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground">
                facebook.com/ahnaftahsin11
              </span>
              <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>

            <a
              href="mailto:at@ahnaftahsin.ami.bd"
              className="group flex items-center gap-4 rounded-xl border border-border bg-background/50 p-4 transition-all hover:border-accent/40 hover:bg-accent/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground">
                at@ahnaftahsin.ami.bd
              </span>
            </a>

            <div className="group flex items-center gap-4 rounded-xl border border-border bg-background/50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                <Phone className="h-5 w-5 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">01732004182</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
