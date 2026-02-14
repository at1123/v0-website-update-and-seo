"use client"

import { useState, useRef } from "react"

export function CatchTheBox() {
  const [score, setScore] = useState(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const areaRef = useRef<HTMLDivElement>(null)

  const moveBox = () => {
    setScore((s) => s + 1)
    const area = areaRef.current
    if (!area) return
    const maxX = area.clientWidth - 80
    const maxY = area.clientHeight - 80
    setPos({
      x: Math.random() * Math.max(maxX, 0),
      y: Math.random() * Math.max(maxY, 0),
    })
  }

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-1 font-semibold text-foreground">Catch the Box</h3>
      <p className="mb-3 text-xs text-muted-foreground">Click it. If you can.</p>
      <div
        ref={areaRef}
        className="relative flex-1 overflow-hidden rounded-xl bg-background/50"
        style={{ minHeight: 140 }}
      >
        <button
          onClick={moveBox}
          onMouseEnter={moveBox}
          className="absolute h-16 w-16 rounded-xl bg-primary transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
          }}
          aria-label="Catch the box"
        />
      </div>
      <p className="mt-3 text-center font-mono text-sm text-primary">
        Score: {score}
      </p>
    </div>
  )
}
