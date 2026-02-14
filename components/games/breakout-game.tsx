"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const W = 240
const H = 200
const COLS = 8
const ROWS = 4
const BRICK_W = W / COLS - 2
const BRICK_H = 10
const PADDLE_W = 40
const PADDLE_H = 6
const BALL_R = 3

const ROW_COLORS = [
  "hsl(348 100% 65%)",
  "hsl(42 100% 50%)",
  "hsl(228 94% 67%)",
  "hsl(173 58% 50%)",
]

function createBricks() {
  const bricks: { x: number; y: number; alive: boolean; color: string }[] = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      bricks.push({
        x: c * (BRICK_W + 2) + 1,
        y: r * (BRICK_H + 2) + 20,
        alive: true,
        color: ROW_COLORS[r],
      })
    }
  }
  return bricks
}

export function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const stateRef = useRef({
    paddleX: W / 2 - PADDLE_W / 2,
    ballX: W / 2,
    ballY: H - 30,
    ballVx: 1.8,
    ballVy: -1.8,
    bricks: createBricks(),
    mouseX: W / 2,
  })

  const start = useCallback(() => {
    const s = stateRef.current
    s.paddleX = W / 2 - PADDLE_W / 2
    s.ballX = W / 2
    s.ballY = H - 30
    s.ballVx = 1.8 * (Math.random() > 0.5 ? 1 : -1)
    s.ballVy = -1.8
    s.bricks = createBricks()
    setScore(0)
    setGameOver(false)
    setRunning(true)
  }, [])

  useEffect(() => {
    if (!running) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number

    const loop = () => {
      const s = stateRef.current

      s.paddleX = Math.max(0, Math.min(W - PADDLE_W, s.mouseX - PADDLE_W / 2))

      s.ballX += s.ballVx
      s.ballY += s.ballVy

      // Wall collisions
      if (s.ballX <= BALL_R || s.ballX >= W - BALL_R) s.ballVx *= -1
      if (s.ballY <= BALL_R) s.ballVy *= -1

      // Paddle collision
      if (
        s.ballY + BALL_R >= H - PADDLE_H - 8 &&
        s.ballY + BALL_R <= H - 4 &&
        s.ballX >= s.paddleX &&
        s.ballX <= s.paddleX + PADDLE_W &&
        s.ballVy > 0
      ) {
        s.ballVy *= -1
        const hitPos = (s.ballX - s.paddleX) / PADDLE_W - 0.5
        s.ballVx = hitPos * 4
      }

      // Brick collisions
      let hitBrick = false
      s.bricks.forEach((b) => {
        if (!b.alive) return
        if (
          s.ballX + BALL_R > b.x &&
          s.ballX - BALL_R < b.x + BRICK_W &&
          s.ballY + BALL_R > b.y &&
          s.ballY - BALL_R < b.y + BRICK_H
        ) {
          b.alive = false
          s.ballVy *= -1
          hitBrick = true
        }
      })
      if (hitBrick) {
        setScore((sc) => sc + 1)
      }

      // Check win
      if (s.bricks.every((b) => !b.alive)) {
        setRunning(false)
        setGameOver(true)
      }

      // Ball falls
      if (s.ballY > H + 10) {
        setRunning(false)
        setGameOver(true)
      }

      // Draw
      ctx.fillStyle = "hsl(228 50% 6%)"
      ctx.fillRect(0, 0, W, H)

      // Bricks
      s.bricks.forEach((b) => {
        if (!b.alive) return
        ctx.fillStyle = b.color
        ctx.beginPath()
        ctx.roundRect(b.x, b.y, BRICK_W, BRICK_H, 2)
        ctx.fill()
      })

      // Paddle
      ctx.fillStyle = "hsl(228 94% 67%)"
      ctx.beginPath()
      ctx.roundRect(s.paddleX, H - PADDLE_H - 8, PADDLE_W, PADDLE_H, 3)
      ctx.fill()

      // Ball
      ctx.beginPath()
      ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2)
      ctx.fillStyle = "#ffffff"
      ctx.fill()

      // Ball glow
      ctx.beginPath()
      ctx.arc(s.ballX, s.ballY, BALL_R * 3, 0, Math.PI * 2)
      ctx.fillStyle = "hsla(0 0% 100% / 0.06)"
      ctx.fill()

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [running])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      stateRef.current.mouseX = ((e.clientX - rect.left) / rect.width) * W
    }
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      stateRef.current.mouseX = ((e.touches[0].clientX - rect.left) / rect.width) * W
    }
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true })
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3 className="mb-1 font-semibold text-foreground">Breakout</h3>
      <p className="mb-3 text-xs text-muted-foreground">Move mouse/finger to smash bricks.</p>
      <div className="relative">
        <canvas ref={canvasRef} width={W} height={H} className="rounded-lg border border-border" style={{ touchAction: "none" }} />
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
            {gameOver && (
              <p className={`mb-2 font-mono text-sm font-bold ${score >= COLS * ROWS ? "text-accent" : "text-destructive"}`}>
                {score >= COLS * ROWS ? "You Cleared It!" : `Score: ${score}`}
              </p>
            )}
            <button onClick={start} className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:scale-105 active:scale-95">
              {gameOver ? "Play Again" : "Start Breakout"}
            </button>
          </div>
        )}
      </div>
      {running && <p className="mt-2 font-mono text-xs text-accent">Bricks: {score}/{COLS * ROWS}</p>}
    </div>
  )
}
