"use client"

import { useState, useRef, useEffect, useCallback } from "react"

const words = [
  "code", "pixel", "chess", "light", "web",
  "react", "poem", "click", "type", "fast",
  "build", "learn", "think", "dream", "play",
]

export function TypingSpeed() {
  const [currentWord, setCurrentWord] = useState(() => words[Math.floor(Math.random() * words.length)])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const nextWord = useCallback(() => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)])
    setInput("")
  }, [])

  const start = () => {
    setStarted(true)
    setFinished(false)
    setScore(0)
    setTimeLeft(15)
    nextWord()
    inputRef.current?.focus()
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          setFinished(true)
          setStarted(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleChange = (val: string) => {
    setInput(val)
    if (val.trim().toLowerCase() === currentWord) {
      setScore((s) => s + 1)
      nextWord()
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3 className="mb-1 font-semibold text-foreground">Typing Speed</h3>
      <p className="mb-3 text-xs text-muted-foreground">Type the word as fast as you can.</p>

      {!started && !finished && (
        <button
          onClick={start}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:scale-105"
        >
          Start Game
        </button>
      )}

      {started && (
        <>
          <div className="mb-3 flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground">{timeLeft}s</span>
            <span className="font-mono text-2xl font-bold text-primary">{currentWord}</span>
          </div>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full max-w-[200px] rounded-lg border border-border bg-background/50 px-4 py-2 text-center font-mono text-sm text-foreground outline-none focus:border-primary"
            autoFocus
          />
        </>
      )}

      {finished && (
        <div className="text-center">
          <p className="mb-2 font-mono text-2xl font-bold text-accent">{score} words</p>
          <p className="mb-3 text-xs text-muted-foreground">in 15 seconds</p>
          <button
            onClick={start}
            className="rounded-full bg-primary/20 px-5 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/30"
          >
            Play Again
          </button>
        </div>
      )}

      {started && (
        <p className="mt-3 font-mono text-xs text-muted-foreground">Score: {score}</p>
      )}
    </div>
  )
}
