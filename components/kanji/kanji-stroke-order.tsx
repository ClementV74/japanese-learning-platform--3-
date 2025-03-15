"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from "lucide-react"

interface KanjiStrokeOrderProps {
  kanji: string
}

// Fonction pour générer des données de traits génériques pour un kanji
const generateGenericStrokes = (kanji: string) => {
  // Estimer le nombre de traits en fonction de la complexité visuelle du kanji
  // C'est une estimation très approximative
  const estimateStrokeCount = (char: string) => {
    const code = char.charCodeAt(0)
    if (code < 0x4e00 || code > 0x9fff) return 5 // Si ce n'est pas un kanji

    // Estimation basée sur la plage Unicode
    if (code < 0x5000) return 4
    if (code < 0x6000) return 8
    if (code < 0x7000) return 10
    if (code < 0x8000) return 12
    return 15
  }

  const strokeCount = estimateStrokeCount(kanji)
  const strokes = []

  // Créer des traits génériques qui forment une grille
  for (let i = 0; i < strokeCount; i++) {
    switch (i % 8) {
      case 0:
        strokes.push({
          points: [
            [0.2, 0.2],
            [0.8, 0.2],
          ],
        }) // Trait horizontal supérieur
        break
      case 1:
        strokes.push({
          points: [
            [0.2, 0.2],
            [0.2, 0.8],
          ],
        }) // Trait vertical gauche
        break
      case 2:
        strokes.push({
          points: [
            [0.2, 0.5],
            [0.8, 0.5],
          ],
        }) // Trait horizontal central
        break
      case 3:
        strokes.push({
          points: [
            [0.5, 0.2],
            [0.5, 0.8],
          ],
        }) // Trait vertical central
        break
      case 4:
        strokes.push({
          points: [
            [0.8, 0.2],
            [0.8, 0.8],
          ],
        }) // Trait vertical droit
        break
      case 5:
        strokes.push({
          points: [
            [0.2, 0.8],
            [0.8, 0.8],
          ],
        }) // Trait horizontal inférieur
        break
      case 6:
        strokes.push({
          points: [
            [0.2, 0.2],
            [0.8, 0.8],
          ],
        }) // Trait diagonal descendant
        break
      case 7:
        strokes.push({
          points: [
            [0.8, 0.2],
            [0.2, 0.8],
          ],
        }) // Trait diagonal montant
        break
    }
  }

  return strokes
}

export function KanjiStrokeOrder({ kanji }: KanjiStrokeOrderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStroke, setCurrentStroke] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)
  const animationRef = useRef<number>()

  // Générer des traits génériques pour le kanji
  const strokes = generateGenericStrokes(kanji)

  useEffect(() => {
    setCurrentStroke(0)
    setAnimationProgress(0)
    setIsPlaying(false)
    drawStrokes(0, 0)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [kanji])

  useEffect(() => {
    if (isPlaying) {
      let lastTime = 0
      const strokeDuration = 1000 // 1 seconde par trait

      const animate = (time: number) => {
        if (!lastTime) lastTime = time
        const deltaTime = time - lastTime

        let newProgress = animationProgress + deltaTime / strokeDuration

        if (newProgress >= 1) {
          // Passer au trait suivant
          newProgress = 0
          const nextStroke = currentStroke + 1

          if (nextStroke >= strokes.length) {
            setIsPlaying(false)
            setAnimationProgress(1)
            drawStrokes(currentStroke, 1)
            return
          }

          setCurrentStroke(nextStroke)
          lastTime = time
        }

        setAnimationProgress(newProgress)
        drawStrokes(currentStroke, newProgress)

        if (isPlaying) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isPlaying, currentStroke, animationProgress, strokes.length])

  const drawStrokes = (upToStroke: number, progress = 1) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dessiner les traits complets jusqu'au trait actuel
    for (let i = 0; i < upToStroke; i++) {
      drawStroke(ctx, strokes[i], 1, false)
    }

    // Dessiner le trait actuel avec la progression
    if (upToStroke < strokes.length) {
      drawStroke(ctx, strokes[upToStroke], progress, true)
    }
  }

  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: any, progress: number, isActive: boolean) => {
    const { points } = stroke
    if (!points || points.length < 2) return

    ctx.beginPath()
    ctx.strokeStyle = isActive ? "#ec4899" : "#000000"
    ctx.lineWidth = 8
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    // Dessiner le début du trait
    const startPoint = points[0]
    const canvasStartX = startPoint[0] * canvasRef.current!.width
    const canvasStartY = startPoint[1] * canvasRef.current!.height
    ctx.moveTo(canvasStartX, canvasStartY)

    if (progress <= 0) return

    // Si c'est un trait simple avec seulement 2 points
    if (points.length === 2) {
      const endPoint = points[1]
      const canvasEndX = endPoint[0] * canvasRef.current!.width
      const canvasEndY = endPoint[1] * canvasRef.current!.height

      // Calculer le point intermédiaire basé sur la progression
      const currentX = canvasStartX + (canvasEndX - canvasStartX) * progress
      const currentY = canvasStartY + (canvasEndY - canvasStartY) * progress

      ctx.lineTo(currentX, currentY)
      ctx.stroke()
      return
    }

    // Pour les traits courbes avec plus de 2 points
    const totalSegments = points.length - 1
    const progressPerSegment = 1 / totalSegments

    // Déterminer jusqu'à quel segment nous devons dessiner
    const segmentsToRender = Math.min(totalSegments, Math.ceil(progress / progressPerSegment))
    const lastSegmentProgress = (progress % progressPerSegment) / progressPerSegment

    // Dessiner les segments complets
    for (let i = 1; i < segmentsToRender; i++) {
      const point = points[i]
      const canvasX = point[0] * canvasRef.current!.width
      const canvasY = point[1] * canvasRef.current!.height
      ctx.lineTo(canvasX, canvasY)
    }

    // Dessiner le dernier segment partiellement si nécessaire
    if (segmentsToRender < totalSegments) {
      const startPoint = points[segmentsToRender - 1]
      const endPoint = points[segmentsToRender]

      const startX = startPoint[0] * canvasRef.current!.width
      const startY = startPoint[1] * canvasRef.current!.height
      const endX = endPoint[0] * canvasRef.current!.width
      const endY = endPoint[1] * canvasRef.current!.height

      const currentX = startX + (endX - startX) * lastSegmentProgress
      const currentY = startY + (endY - startY) * lastSegmentProgress

      ctx.lineTo(currentX, currentY)
    } else {
      // Si nous dessinons tous les segments, assurons-nous d'inclure le dernier point
      const lastPoint = points[points.length - 1]
      const canvasX = lastPoint[0] * canvasRef.current!.width
      const canvasY = lastPoint[1] * canvasRef.current!.height
      ctx.lineTo(canvasX, canvasY)
    }

    ctx.stroke()
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      if (currentStroke >= strokes.length - 1 && animationProgress >= 1) {
        setCurrentStroke(0)
        setAnimationProgress(0)
      }
      setIsPlaying(true)
    }
  }

  const resetAnimation = () => {
    setIsPlaying(false)
    setCurrentStroke(0)
    setAnimationProgress(0)
    drawStrokes(0, 0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stroke Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-square w-full rounded-lg border bg-background">
          <canvas ref={canvasRef} width={300} height={300} className="h-full w-full" />
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-muted-foreground opacity-10">
            {kanji}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Stroke {currentStroke + 1} of {strokes.length}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={resetAnimation}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={togglePlayPause}
              className={isPlaying ? "bg-purple-600 hover:bg-purple-700" : "bg-pink-600 hover:bg-pink-700"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

