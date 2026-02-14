"use client"

import { useState, useCallback } from "react"

function randomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return { r, g, b, hex: `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}` }
}

function generateOptions(correct: { hex: string }) {
  const options = [correct.hex]
  while (options.length < 3) {
    const c = randomColor().hex
    if (!options.includes(c)) options.push(c)
  }
  // shuffle
  return options.sort(() => Math.random() - 0.5)
}

export function ColorGuesser() {
  const [color, setColor] = useState(randomColor)
  const [options, setOptions] = useState(() => generateOptions(color))
  const [result, setResult] = useState<"correct" | "wrong" | null>(null)
  const [score, setScore] = useState(0)

  const newRound = useCallback(() => {
    const c = randomColor()
    setColor(c)
    setOptions(generateOptions(c))
    setResult(null)
  }, [])

  const handleGuess = (hex: string) => {
    if (result) return
    if (hex === color.hex) {
      setResult("correct")
      setScore((s) => s + 1)
      setTimeout(newRound, 800)
    } else {
      setResult("wrong")
      setTimeout(newRound, 800)
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3 className="mb-1 font-semibold text-foreground">Color Guesser</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        What color is{" "}
        <span className="font-mono font-bold text-foreground">
          rgb({color.r}, {color.g}, {color.b})
        </span>
        ?
      </p>
      <div className="flex gap-3">
        {options.map((hex) => (
          <button
            key={hex}
            onClick={() => handleGuess(hex)}
            className={`h-14 w-14 rounded-xl border-2 transition-all hover:scale-110 ${
              result && hex === color.hex
                ? "border-green-400 ring-2 ring-green-400/50"
                : result === "wrong" && hex !== color.hex
                  ? "border-border opacity-50"
                  : "border-border hover:border-foreground/30"
            }`}
            style={{ backgroundColor: hex }}
            aria-label={`Color option ${hex}`}
          />
        ))}
      </div>
      <p className={`mt-3 text-sm font-medium ${result === "correct" ? "text-green-400" : result === "wrong" ? "text-destructive" : "text-transparent"}`}>
        {result === "correct" ? "Correct!" : result === "wrong" ? "Wrong!" : "."}
      </p>
      <p className="mt-1 font-mono text-xs text-muted-foreground">Score: {score}</p>
    </div>
  )
}
