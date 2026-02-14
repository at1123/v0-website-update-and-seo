"use client"

import { useState, useRef, useCallback, useEffect } from "react"

export function DodgeTheDot() {
  const [score, setScore] = useState(0)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [size, setSize] = useState(24)
  const areaRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const moveDot = useCallback(() => {
    const area = areaRef.current
    if (!area) return
    const maxX = area.clientWidth - size
    const maxY = area.clientHeight - size
    setPos({
      x: Math.random() * Math.max(maxX, 0),
      y: Math.random() * Math.max(maxY, 0),
    })
  }, [size])

  const handleClick = () => {
    setScore((s) => s + 1)
    // Dot gets smaller as you score more
    setSize(Math.max(12, 24 - Math.floor(score / 3)))
    moveDot()
  }

  // Auto-move the dot every 1.5s
  useEffect(() => {
    intervalRef.current = setInterval(moveDot, 1500)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [moveDot])

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-1 font-semibold text-foreground">Dodge The Dot</h3>
      <p className="mb-3 text-xs text-muted-foreground">Click the dot before it moves.</p>
      <div
        ref={areaRef}
        className="relative flex-1 overflow-hidden rounded-xl bg-background/50"
        style={{ minHeight: 140 }}
      >
        <button
          onClick={handleClick}
          className="absolute rounded-full bg-accent shadow-lg shadow-accent/30 transition-all duration-300"
          style={{
            width: size,
            height: size,
            left: pos.x,
            top: pos.y,
          }}
          aria-label="Click the dot"
        />
      </div>
      <p className="mt-3 text-center font-mono text-sm text-accent">
        Score: {score}
      </p>
    </div>
  )
}
