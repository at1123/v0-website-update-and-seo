"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const W = 240
const H = 180
const PADDLE_H = 36
const PADDLE_W = 6
const BALL_R = 4
const SPEED = 2.5
const AI_SPEED = 1.8

export function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playerScore, setPlayerScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [running, setRunning] = useState(false)
  const stateRef = useRef({
    playerY: H / 2 - PADDLE_H / 2,
    aiY: H / 2 - PADDLE_H / 2,
    ballX: W / 2,
    ballY: H / 2,
    ballVx: SPEED,
    ballVy: SPEED * 0.6,
    mouseY: H / 2,
  })

  const reset = useCallback(() => {
    const s = stateRef.current
    s.ballX = W / 2
    s.ballY = H / 2
    s.ballVx = SPEED * (Math.random() > 0.5 ? 1 : -1)
    s.ballVy = SPEED * 0.6 * (Math.random() > 0.5 ? 1 : -1)
  }, [])

  const start = useCallback(() => {
    setPlayerScore(0)
    setAiScore(0)
    reset()
    setRunning(true)
  }, [reset])

  useEffect(() => {
    if (!running) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number

    const loop = () => {
      const s = stateRef.current

      // AI paddle
      const aiCenter = s.aiY + PADDLE_H / 2
      if (aiCenter < s.ballY - 4) s.aiY += AI_SPEED
      else if (aiCenter > s.ballY + 4) s.aiY -= AI_SPEED
      s.aiY = Math.max(0, Math.min(H - PADDLE_H, s.aiY))

      // Player paddle follows mouse/touch
      s.playerY = Math.max(0, Math.min(H - PADDLE_H, s.mouseY - PADDLE_H / 2))

      // Ball movement
      s.ballX += s.ballVx
      s.ballY += s.ballVy

      // Top/bottom walls
      if (s.ballY <= BALL_R || s.ballY >= H - BALL_R) s.ballVy *= -1

      // Player paddle collision (left side)
      if (s.ballX - BALL_R <= PADDLE_W + 8 && s.ballY >= s.playerY && s.ballY <= s.playerY + PADDLE_H && s.ballVx < 0) {
        s.ballVx = Math.abs(s.ballVx) * 1.05
        s.ballVy += (Math.random() - 0.5) * 0.5
      }

      // AI paddle collision (right side)
      if (s.ballX + BALL_R >= W - PADDLE_W - 8 && s.ballY >= s.aiY && s.ballY <= s.aiY + PADDLE_H && s.ballVx > 0) {
        s.ballVx = -Math.abs(s.ballVx) * 1.05
        s.ballVy += (Math.random() - 0.5) * 0.5
      }

      // Score
      if (s.ballX < 0) {
        setAiScore((sc) => {
          if (sc + 1 >= 5) { setRunning(false) }
          return sc + 1
        })
        reset()
      }
      if (s.ballX > W) {
        setPlayerScore((sc) => {
          if (sc + 1 >= 5) { setRunning(false) }
          return sc + 1
        })
        reset()
      }

      // Draw
      ctx.fillStyle = "hsl(228 50% 6%)"
      ctx.fillRect(0, 0, W, H)

      // Dashed center line
      ctx.setLineDash([4, 4])
      ctx.strokeStyle = "hsl(228 30% 18%)"
      ctx.beginPath()
      ctx.moveTo(W / 2, 0)
      ctx.lineTo(W / 2, H)
      ctx.stroke()
      ctx.setLineDash([])

      // Paddles
      ctx.fillStyle = "hsl(228 94% 67%)"
      ctx.fillRect(8, s.playerY, PADDLE_W, PADDLE_H)
      ctx.fillStyle = "hsl(348 100% 65%)"
      ctx.fillRect(W - 8 - PADDLE_W, s.aiY, PADDLE_W, PADDLE_H)

      // Ball
      ctx.beginPath()
      ctx.arc(s.ballX, s.ballY, BALL_R, 0, Math.PI * 2)
      ctx.fillStyle = "hsl(42 100% 50%)"
      ctx.fill()

      // Ball trail glow
      ctx.beginPath()
      ctx.arc(s.ballX, s.ballY, BALL_R * 3, 0, Math.PI * 2)
      ctx.fillStyle = "hsla(42 100% 50% / 0.08)"
      ctx.fill()

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [running, reset])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      stateRef.current.mouseY = ((e.clientY - rect.top) / rect.height) * H
    }
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      stateRef.current.mouseY = ((e.touches[0].clientY - rect.top) / rect.height) * H
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
      <h3 className="mb-1 font-semibold text-foreground">Retro Pong</h3>
      <p className="mb-3 text-xs text-muted-foreground">Move mouse/finger to control paddle. First to 5 wins.</p>
      <div className="relative">
        <canvas ref={canvasRef} width={W} height={H} className="rounded-lg border border-border" style={{ touchAction: "none" }} />
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
            {(playerScore >= 5 || aiScore >= 5) && (
              <p className={`mb-2 font-mono text-sm font-bold ${playerScore >= 5 ? "text-primary" : "text-destructive"}`}>
                {playerScore >= 5 ? "You Win!" : "AI Wins!"}
              </p>
            )}
            <button onClick={start} className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:scale-105 active:scale-95">
              {playerScore + aiScore > 0 ? "Play Again" : "Start Pong"}
            </button>
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center gap-4 font-mono text-xs">
        <span className="text-primary">You: {playerScore}</span>
        <span className="text-muted-foreground">vs</span>
        <span className="text-destructive">AI: {aiScore}</span>
      </div>
    </div>
  )
}
