"use client"

import { useEffect, useRef, useState } from "react"
import { Gamepad2 } from "lucide-react"
import { SnakeGame } from "@/components/games/snake-game"
import { PongGame } from "@/components/games/pong-game"
import { BreakoutGame } from "@/components/games/breakout-game"
import { MemoryMatch } from "@/components/games/memory-match"
import { ReactionSpeed } from "@/components/games/reaction-speed"
import { TypingSpeed } from "@/components/games/typing-speed"
import { ColorGuesser } from "@/components/games/color-guesser"
import { CatchTheBox } from "@/components/games/catch-the-box"
import { WhackAMole } from "@/components/games/whack-a-mole"

const games = [
  { component: PongGame, label: "Retro Pong", size: "large" },
  { component: BreakoutGame, label: "Breakout", size: "large" },
  { component: SnakeGame, label: "Snake", size: "large" },
  { component: WhackAMole, label: "Whack-a-Mole", size: "normal" },
  { component: MemoryMatch, label: "Memory Match", size: "normal" },
  { component: ReactionSpeed, label: "Reaction Speed", size: "normal" },
  { component: TypingSpeed, label: "Typing Speed", size: "normal" },
  { component: ColorGuesser, label: "Color Guesser", size: "normal" },
  { component: CatchTheBox, label: "Catch the Box", size: "normal" },
]

export function FunZone() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.03 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="fun" className="relative mx-auto max-w-5xl px-5 py-24 sm:py-32">
      {/* Section header */}
      <div className={`mb-14 text-center ${visible ? "animate-fade-in-up" : "opacity-0"}`}>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/5 px-4 py-2 text-sm text-destructive">
          <Gamepad2 className="h-3.5 w-3.5" />
          <span>Retro Arcade</span>
        </div>
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
          The <span className="text-destructive">Fun Zone</span>
        </h2>
        <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base">
          {"Take a break. Play some retro games. Procrastinate responsibly."}
        </p>
      </div>

      {/* Games grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game, i) => {
          const GameComponent = game.component
          return (
            <div
              key={game.label}
              className={`group rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-500 hover:border-destructive/30 hover:shadow-lg hover:shadow-destructive/5 sm:p-6 ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                animationDelay: `${i * 0.06 + 0.2}s`,
                minHeight: game.size === "large" ? 320 : 280,
              }}
            >
              <GameComponent />
            </div>
          )
        })}
      </div>

      {/* External game link */}
      <div className={`mt-8 text-center ${visible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.8s" }}>
        <a
          href="https://game.ahnaftahsin.ami.bd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-6 py-3 text-sm font-semibold text-accent transition-all hover:scale-105 hover:bg-accent/10"
        >
          <Gamepad2 className="h-4 w-4" />
          Play Tic Tac Khamba (Full Game)
        </a>
      </div>
    </section>
  )
}
