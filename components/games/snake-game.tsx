"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const GRID = 15
const CELL = 16
const SPEED = 150

type Pos = { x: number; y: number }

function randomFood(snake: Pos[]): Pos {
  let pos: Pos
  do {
    pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y))
  return pos
}

export function SnakeGame() {
  const [snake, setSnake] = useState<Pos[]>([{ x: 7, y: 7 }])
  const [food, setFood] = useState<Pos>({ x: 3, y: 3 })
  const [dir, setDir] = useState<Pos>({ x: 1, y: 0 })
  const [running, setRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const dirRef = useRef(dir)
  const canvasRef = useRef<HTMLDivElement>(null)

  dirRef.current = dir

  const reset = useCallback(() => {
    const initial = [{ x: 7, y: 7 }]
    setSnake(initial)
    setFood(randomFood(initial))
    setDir({ x: 1, y: 0 })
    setScore(0)
    setGameOver(false)
    setRunning(true)
  }, [])

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = {
          x: prev[0].x + dirRef.current.x,
          y: prev[0].y + dirRef.current.y,
        }

        // Wall collision
        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
          setRunning(false)
          setGameOver(true)
          return prev
        }

        // Self collision
        if (prev.some((s) => s.x === head.x && s.y === head.y)) {
          setRunning(false)
          setGameOver(true)
          return prev
        }

        const newSnake = [head, ...prev]

        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 1)
          setFood(randomFood(newSnake))
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, SPEED)
    return () => clearInterval(interval)
  }, [running, food])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key
      if (key === "ArrowUp" || key === "w") setDir((d) => (d.y !== 1 ? { x: 0, y: -1 } : d))
      if (key === "ArrowDown" || key === "s") setDir((d) => (d.y !== -1 ? { x: 0, y: 1 } : d))
      if (key === "ArrowLeft" || key === "a") setDir((d) => (d.x !== 1 ? { x: -1, y: 0 } : d))
      if (key === "ArrowRight" || key === "d") setDir((d) => (d.x !== -1 ? { x: 1, y: 0 } : d))
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  // Touch controls
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const handleTouchStart = (e: TouchEvent) => {
      touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchRef.current) return
      const dx = e.changedTouches[0].clientX - touchRef.current.x
      const dy = e.changedTouches[0].clientY - touchRef.current.y
      if (Math.abs(dx) > Math.abs(dy)) {
        setDir((d) => (dx > 0 && d.x !== -1 ? { x: 1, y: 0 } : dx < 0 && d.x !== 1 ? { x: -1, y: 0 } : d))
      } else {
        setDir((d) => (dy > 0 && d.y !== -1 ? { x: 0, y: 1 } : dy < 0 && d.y !== 1 ? { x: 0, y: -1 } : d))
      }
    }
    el.addEventListener("touchstart", handleTouchStart, { passive: true })
    el.addEventListener("touchend", handleTouchEnd, { passive: true })
    return () => {
      el.removeEventListener("touchstart", handleTouchStart)
      el.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3 className="mb-1 font-semibold text-foreground">Snake</h3>
      <p className="mb-3 text-xs text-muted-foreground">Arrow keys or swipe to play.</p>
      <div
        ref={canvasRef}
        className="relative overflow-hidden rounded-xl border border-border bg-background/50"
        style={{ width: GRID * CELL, height: GRID * CELL }}
      >
        {snake.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: s.x * CELL,
              top: s.y * CELL,
              width: CELL - 1,
              height: CELL - 1,
              background: i === 0 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.6)",
            }}
          />
        ))}
        <div
          className="absolute rounded-full bg-destructive"
          style={{
            left: food.x * CELL + 2,
            top: food.y * CELL + 2,
            width: CELL - 4,
            height: CELL - 4,
          }}
        />
        {/* Overlay */}
        {(!running || gameOver) && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <button
              onClick={reset}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:scale-105"
            >
              {gameOver ? `Score: ${score} - Retry?` : "Start"}
            </button>
          </div>
        )}
      </div>
      {running && (
        <p className="mt-2 font-mono text-xs text-primary">Score: {score}</p>
      )}
    </div>
  )
}
