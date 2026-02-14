"use client"

import { useState } from "react"

const moods = [
  { face: "Neutral", bg: "bg-muted/30", border: "border-muted-foreground/20" },
  { face: "Happy", bg: "bg-green-500/10", border: "border-green-500/30" },
  { face: "Mind Blown", bg: "bg-primary/10", border: "border-primary/30" },
  { face: "Cool", bg: "bg-accent/10", border: "border-accent/30" },
  { face: "Laughing", bg: "bg-destructive/10", border: "border-destructive/30" },
]

export function MoodSwitch() {
  const [index, setIndex] = useState(0)
  const mood = moods[index]

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3 className="mb-1 font-semibold text-foreground">Mood Switch</h3>
      <p className="mb-4 text-xs text-muted-foreground">How are you feeling?</p>
      <button
        onClick={() => setIndex((i) => (i + 1) % moods.length)}
        className={`flex h-20 w-20 items-center justify-center rounded-2xl border ${mood.border} ${mood.bg} text-3xl transition-all duration-300 hover:scale-110 active:scale-95`}
        aria-label="Switch mood"
      >
        <span className="font-mono text-sm font-bold text-foreground">{mood.face}</span>
      </button>
      <p className="mt-3 text-xs text-muted-foreground">Click to change</p>
    </div>
  )
}
