"use client"

import { useState, useCallback } from "react"

const EMOJIS = ["A", "B", "C", "D", "E", "F", "G", "H"]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createBoard() {
  return shuffle([...EMOJIS, ...EMOJIS]).map((symbol, i) => ({
    id: i,
    symbol,
    flipped: false,
    matched: false,
  }))
}

export function MemoryMatch() {
  const [cards, setCards] = useState(createBoard)
  const [selected, setSelected] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)

  const matched = cards.filter((c) => c.matched).length

  const handleClick = useCallback(
    (id: number) => {
      if (locked) return
      const card = cards[id]
      if (card.flipped || card.matched) return

      const newCards = cards.map((c) =>
        c.id === id ? { ...c, flipped: true } : c
      )
      setCards(newCards)

      const newSelected = [...selected, id]
      setSelected(newSelected)

      if (newSelected.length === 2) {
        setMoves((m) => m + 1)
        const [firstId, secondId] = newSelected
        if (newCards[firstId].symbol === newCards[secondId].symbol) {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, matched: true }
                : c
            )
          )
          setSelected([])
        } else {
          setLocked(true)
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId
                  ? { ...c, flipped: false }
                  : c
              )
            )
            setSelected([])
            setLocked(false)
          }, 700)
        }
      }
    },
    [cards, selected, locked]
  )

  const reset = () => {
    setCards(createBoard())
    setSelected([])
    setMoves(0)
    setLocked(false)
  }

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-1 font-semibold text-foreground">Memory Match</h3>
      <p className="mb-3 text-xs text-muted-foreground">Match the pairs. Moves: {moves}</p>
      <div className="grid flex-1 grid-cols-4 gap-1.5">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`flex items-center justify-center rounded-lg font-mono text-sm font-bold transition-all duration-300 ${
              card.flipped || card.matched
                ? card.matched
                  ? "bg-green-500/20 text-green-400 scale-95"
                  : "bg-primary/20 text-primary scale-105"
                : "bg-muted/50 text-transparent hover:bg-muted"
            }`}
            style={{ minHeight: 36 }}
          >
            {card.flipped || card.matched ? card.symbol : "?"}
          </button>
        ))}
      </div>
      {matched === cards.length && (
        <button
          onClick={reset}
          className="mt-3 rounded-lg bg-primary/20 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/30"
        >
          Play Again
        </button>
      )}
    </div>
  )
}
