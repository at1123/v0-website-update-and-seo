"use client"

import { useState } from "react"

const messages = [
  "Do NOT Click",
  "I said don't!",
  "Why are you still clicking?",
  "Seriously stop.",
  "You can't stop, can you?",
  "Fine. Keep going.",
  "I give up.",
  "You win... for now.",
  "Or do you?",
  "Plot twist: the button wins.",
]

export function UselessButton() {
  const [clicks, setClicks] = useState(0)

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3 className="mb-1 font-semibold text-foreground">Useless Button</h3>
      <p className="mb-5 text-xs text-muted-foreground">Do not click this button.</p>
      <button
        onClick={() => setClicks((c) => c + 1)}
        className="rounded-full bg-destructive px-6 py-3 font-medium text-destructive-foreground transition-all hover:scale-110 hover:shadow-lg hover:shadow-destructive/30 active:scale-95"
      >
        {messages[Math.min(clicks, messages.length - 1)]}
      </button>
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        Clicked: <span className="text-destructive">{clicks}</span> times
      </p>
    </div>
  )
}
