"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#fun", label: "Arcade" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/90 shadow-lg shadow-primary/5 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <a href="#" className="font-mono text-base font-semibold text-primary transition-colors hover:text-accent sm:text-lg">
          {"<AhnafTahsin />"}
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden" aria-label="Toggle menu">
          <span className={`h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ${mobileOpen ? "scale-0 opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 rounded-full bg-foreground transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Full-screen mobile menu */}
      <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/98 backdrop-blur-xl transition-all duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <li key={link.href} className={`transition-all duration-300 ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`} style={{ transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms" }}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
