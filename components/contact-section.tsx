"use client"

import { useEffect, useRef, useState } from "react"
import { Facebook, Mail, Phone, ExternalLink, MessageCircle } from "lucide-react"

export function ContactSection() {
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
    <section ref={sectionRef} id="contact" className="relative mx-auto max-w-5xl px-5 py-24 sm:py-32">
      <h2 className={`mb-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
        Get in <span className="gradient-text">Touch</span>
      </h2>
      <p className={`mx-auto mb-14 max-w-md text-center text-sm text-muted-foreground sm:text-base ${visible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
        {"Ideas, jokes, chess openings, or just say hi -- everything is welcome"}
      </p>

      <div className={`mx-auto max-w-lg ${visible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
        <div className="relative rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8 md:p-10">
          {/* Fun quote */}
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-xs italic text-accent sm:text-sm">
              {"\"If you found a bug on this website, congratulations -- you're now a beta tester.\""}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="https://www.facebook.com/ahnaftahsin11"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3.5 transition-all hover:border-primary/40 hover:bg-primary/5 sm:gap-4 sm:p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                <Facebook className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Facebook</p>
                <p className="truncate text-xs font-medium text-foreground sm:text-sm">ahnaftahsin11</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>

            <a
              href="mailto:at@ahnaftahsin.ami.bd"
              className="group flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3.5 transition-all hover:border-accent/40 hover:bg-accent/5 sm:gap-4 sm:p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 sm:h-10 sm:w-10">
                <Mail className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="truncate text-xs font-medium text-foreground sm:text-sm">at@ahnaftahsin.ami.bd</p>
              </div>
            </a>

            <div className="group flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3.5 sm:gap-4 sm:p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 sm:h-10 sm:w-10">
                <Phone className="h-4 w-4 text-destructive sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Phone</p>
                <p className="text-xs font-medium text-foreground sm:text-sm">01732004182</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
