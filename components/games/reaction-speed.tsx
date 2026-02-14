"use client"

import { useState, useRef, useCallback, useEffect } from "react"

type GameState = "waiting" | "ready" | "go" | "result" | "early"

export function ReactionSpeed() {
  const [state, setState] = useState<GameState>("waiting")
  const [reactionTime, setReactionTime] = useState(0)
  const [bestTime, setBestTime] = useState(Infinity)
  const startTimeRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startGame = useCallback(() => {
    setState("ready")
    const delay = Math.random() * 3000 + 1000
    timerRef.current = setTimeout(() => {
      setState("go")
      startTimeRef.current = Date.now()
    }, delay)
  }, [])

  const handleClick = () => {
    if (state === "waiting" || state === "result" || state === "early") {
      startGame()
    } else if (state === "ready") {
      if (timerRef.current) clearTimeout(timerRef.current)
      setState("early")
    } else if (state === "go") {
      const time = Date.now() - startTimeRef.current
      setReactionTime(time)
      if (time < bestTime) setBestTime(time)
      setState("result")
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const bgColor =
    state === "go"
      ? "bg-green-500"
      : state === "ready"
        ? "bg-destructive"
        : state === "early"
          ? "bg-accent"
          : "bg-primary"

  const label =
    state === "waiting"
      ? "Click to start"
      : state === "ready"
        ? "Wait for green..."
        : state === "go"
          ? "CLICK NOW!"
          : state === "early"
            ? "Too early! Click to retry"
            : `${reactionTime}ms - Click to retry`

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3 className="mb-1 font-semibold text-foreground">Reaction Speed</h3>
      <p className="mb-4 text-xs text-muted-foreground">Wait for green, then click fast.</p>
      <button
        onClick={handleClick}
        className={`h-24 w-24 rounded-2xl ${bgColor} font-mono text-xs font-bold text-background transition-all hover:scale-105 active:scale-95`}
      >
        {label}
      </button>
      {bestTime < Infinity && (
        <p className="mt-3 font-mono text-xs text-accent">
          Best: {bestTime}ms
        </p>
      )}
    </div>
  )
}
