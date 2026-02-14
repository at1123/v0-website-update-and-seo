"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const GRID_SIZE = 9
const GAME_TIME = 20

export function WhackAMole() {
  const [activeHole, setActiveHole] = useState(-1)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [whacked, setWhacked] = useState(-1)
  const moleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const gameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const showMole = useCallback(() => {
    const hole = Math.floor(Math.random() * GRID_SIZE)
    setActiveHole(hole)
    setWhacked(-1)
    const delay = Math.max(400, 1000 - score * 20)
    moleTimerRef.current = setTimeout(() => {
      setActiveHole(-1)
      moleTimerRef.current = setTimeout(showMole, 200)
    }, delay)
  }, [score])

  const start = useCallback(() => {
    setScore(0)
    setTimeLeft(GAME_TIME)
    setFinished(false)
    setStarted(true)
    setActiveHole(-1)
    setWhacked(-1)

    // Mole timer will be started from useEffect
  }, [])

  useEffect(() => {
    if (!started || finished) return

    // Start mole
    const moleDelay = setTimeout(showMole, 500)

    // Game timer
    gameTimerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setStarted(false)
          setFinished(true)
          setActiveHole(-1)
          if (moleTimerRef.current) clearTimeout(moleTimerRef.current)
          if (gameTimerRef.current) clearInterval(gameTimerRef.current)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      clearTimeout(moleDelay)
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current)
      if (gameTimerRef.current) clearInterval(gameTimerRef.current)
    }
  }, [started, finished, showMole])

  const whack = (index: number) => {
    if (!started || index !== activeHole) return
    setScore((s) => s + 1)
    setWhacked(index)
    setActiveHole(-1)
    if (moleTimerRef.current) clearTimeout(moleTimerRef.current)
    moleTimerRef.current = setTimeout(showMole, 300)
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3 className="mb-1 font-semibold text-foreground">Whack-a-Mole</h3>
      <p className="mb-3 text-xs text-muted-foreground">Whack the mole before it hides. {GAME_TIME}s challenge.</p>

      {!started && !finished && (
        <button onClick={start} className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 active:scale-95">
          Start
        </button>
      )}

      {(started || finished) && (
        <>
          <div className="mb-3 flex items-center gap-4 font-mono text-xs">
            <span className="text-accent">{timeLeft}s</span>
            <span className="text-primary">Score: {score}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: GRID_SIZE }).map((_, i) => (
              <button
                key={i}
                onClick={() => whack(i)}
                className={`flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all duration-150 active:scale-90 sm:h-16 sm:w-16 ${
                  i === activeHole
                    ? "border-accent bg-accent/20 scale-110 text-accent"
                    : i === whacked
                      ? "border-green-400 bg-green-400/20 text-green-400"
                      : "border-border bg-muted/30 text-muted-foreground/30"
                }`}
              >
                {i === activeHole ? (
                  <span className="text-2xl" role="img" aria-label="mole">{">"}</span>
                ) : i === whacked ? (
                  <span className="font-mono text-xs">Hit!</span>
                ) : (
                  <span className="h-3 w-3 rounded-full bg-muted-foreground/10" />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {finished && (
        <div className="mt-4 text-center">
          <p className="mb-2 font-mono text-xl font-bold text-accent">{score} whacks!</p>
          <button onClick={start} className="rounded-full bg-primary/20 px-5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/30">
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
