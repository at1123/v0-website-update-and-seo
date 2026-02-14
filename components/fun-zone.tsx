"use client"

import { useEffect, useRef, useState } from "react"
import { CatchTheBox } from "@/components/games/catch-the-box"
import { UselessButton } from "@/components/games/useless-button"
import { ReactionSpeed } from "@/components/games/reaction-speed"
import { MemoryMatch } from "@/components/games/memory-match"
import { DodgeTheDot } from "@/components/games/dodge-the-dot"
import { ColorGuesser } from "@/components/games/color-guesser"
import { TypingSpeed } from "@/components/games/typing-speed"
import { SnakeGame } from "@/components/games/snake-game"
import { MoodSwitch } from "@/components/games/mood-switch"

export function FunZone() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="fun"
      className="relative mx-auto max-w-6xl px-5 py-28"
    >
      <h2
        className={`mb-16 text-center font-mono text-3xl font-bold md:text-4xl ${
          visible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        Fun <span className="text-destructive">Zone</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          <CatchTheBox key="catch" />,
          <UselessButton key="useless" />,
          <ReactionSpeed key="reaction" />,
          <MemoryMatch key="memory" />,
          <DodgeTheDot key="dodge" />,
          <ColorGuesser key="color" />,
          <TypingSpeed key="typing" />,
          <SnakeGame key="snake" />,
          <MoodSwitch key="mood" />,
        ].map((game, i) => (
          <div
            key={i}
            className={`rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
              visible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 0.08 + 0.2}s`, minHeight: 280 }}
          >
            {game}
          </div>
        ))}
      </div>
    </section>
  )
}
