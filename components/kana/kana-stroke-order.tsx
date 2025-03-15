"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface KanaStrokeOrderProps {
  kana: string
  type: "hiragana" | "katakana"
}

// Données de traits pour les kana
const strokeData: Record<string, any> = {
  // Hiragana
  あ: [
    {
      points: [
        [0.3, 0.3],
        [0.5, 0.2],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.3, 0.5],
        [0.5, 0.4],
        [0.7, 0.5],
      ],
    },
    {
      points: [
        [0.5, 0.4],
        [0.5, 0.8],
      ],
    },
  ],
  い: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.3, 0.8],
      ],
    },
  ],
  う: [
    {
      points: [
        [0.3, 0.3],
        [0.5, 0.3],
        [0.7, 0.4],
      ],
    },
    {
      points: [
        [0.7, 0.4],
        [0.6, 0.6],
        [0.4, 0.7],
        [0.3, 0.8],
      ],
    },
  ],
  え: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.5, 0.7],
      ],
    },
    {
      points: [
        [0.3, 0.5],
        [0.7, 0.5],
      ],
    },
  ],
  お: [
    {
      points: [
        [0.5, 0.2],
        [0.3, 0.4],
        [0.5, 0.6],
        [0.7, 0.4],
        [0.5, 0.2],
      ],
    },
    {
      points: [
        [0.5, 0.6],
        [0.5, 0.8],
      ],
    },
  ],
  か: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.5, 0.8],
      ],
    },
    {
      points: [
        [0.3, 0.6],
        [0.7, 0.6],
      ],
    },
  ],
  き: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.5, 0.8],
      ],
    },
    {
      points: [
        [0.3, 0.5],
        [0.7, 0.5],
      ],
    },
    {
      points: [
        [0.7, 0.5],
        [0.6, 0.7],
      ],
    },
  ],
  く: [
    {
      points: [
        [0.3, 0.3],
        [0.5, 0.3],
        [0.7, 0.4],
      ],
    },
    {
      points: [
        [0.7, 0.4],
        [0.5, 0.8],
        [0.3, 0.6],
      ],
    },
  ],
  け: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.3, 0.5],
        [0.7, 0.5],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.3, 0.8],
      ],
    },
  ],
  こ: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.3, 0.3],
        [0.3, 0.7],
        [0.7, 0.7],
      ],
    },
  ],
  さ: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.3, 0.5],
        [0.7, 0.5],
      ],
    },
    {
      points: [
        [0.6, 0.5],
        [0.5, 0.8],
      ],
    },
  ],

  // Katakana
  ア: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.3, 0.8],
      ],
    },
  ],
  イ: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.5, 0.8],
      ],
    },
  ],
  ウ: [
    {
      points: [
        [0.3, 0.3],
        [0.3, 0.7],
      ],
    },
    {
      points: [
        [0.3, 0.7],
        [0.5, 0.8],
        [0.7, 0.7],
      ],
    },
  ],
  エ: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.3, 0.3],
        [0.3, 0.7],
        [0.7, 0.7],
      ],
    },
    {
      points: [
        [0.3, 0.5],
        [0.7, 0.5],
      ],
    },
  ],
  オ: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.5, 0.7],
      ],
    },
    {
      points: [
        [0.3, 0.7],
        [0.7, 0.7],
      ],
    },
    {
      points: [
        [0.3, 0.5],
        [0.7, 0.5],
      ],
    },
  ],
  カ: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.5, 0.7],
        [0.7, 0.7],
      ],
    },
    {
      points: [
        [0.6, 0.5],
        [0.8, 0.4],
      ],
    },
  ],
  キ: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.5, 0.3],
        [0.5, 0.7],
      ],
    },
    {
      points: [
        [0.3, 0.5],
        [0.7, 0.5],
      ],
    },
    {
      points: [
        [0.3, 0.7],
        [0.7, 0.7],
      ],
    },
  ],
  ク: [
    {
      points: [
        [0.3, 0.3],
        [0.5, 0.3],
        [0.7, 0.4],
      ],
    },
    {
      points: [
        [0.7, 0.4],
        [0.5, 0.8],
        [0.3, 0.6],
      ],
    },
  ],
  ケ: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.3, 0.3],
        [0.3, 0.7],
      ],
    },
    {
      points: [
        [0.3, 0.5],
        [0.7, 0.5],
      ],
    },
    {
      points: [
        [0.7, 0.3],
        [0.7, 0.7],
      ],
    },
  ],
  コ: [
    {
      points: [
        [0.3, 0.3],
        [0.7, 0.3],
      ],
    },
    {
      points: [
        [0.3, 0.3],
        [0.3, 0.7],
      ],
    },
    {
      points: [
        [0.3, 0.7],
        [0.7, 0.7],
      ],
    },
    {
      points: [
        [0.7, 0.3],
        [0.7, 0.7],
      ],
    },
  ],
}

// Fonction pour obtenir les données de traits pour un kana
const getStrokeData = (kana: string) => {
  // Si nous avons des données spécifiques pour ce kana, les utiliser
  if (strokeData[kana]) {
    return strokeData[kana]
  }

  // Sinon, générer des traits génériques basés sur le nombre de traits typique
  // Ceci est une solution de secours pour les kana qui n'ont pas de données spécifiques
  const genericStrokes = []
  const strokeCount = kana.match(/[あ-ん]/) ? 3 : 2 // Estimation: hiragana ~3 traits, katakana ~2 traits

  for (let i = 0; i < strokeCount; i++) {
    // Créer des traits simples qui forment une grille
    switch (i) {
      case 0:
        genericStrokes.push({
          points: [
            [0.2, 0.2],
            [0.8, 0.2],
          ],
        }) // Trait horizontal supérieur
        break
      case 1:
        genericStrokes.push({
          points: [
            [0.5, 0.2],
            [0.5, 0.8],
          ],
        }) // Trait vertical central
        break
      case 2:
        genericStrokes.push({
          points: [
            [0.2, 0.5],
            [0.8, 0.5],
          ],
        }) // Trait horizontal central
        break
      case 3:
        genericStrokes.push({
          points: [
            [0.2, 0.8],
            [0.8, 0.8],
          ],
        }) // Trait horizontal inférieur
        break
      default:
        genericStrokes.push({
          points: [
            [0.3, 0.3],
            [0.7, 0.7],
          ],
        }) // Trait diagonal
    }
  }

  return genericStrokes
}

export function KanaStrokeOrder({ kana, type }: KanaStrokeOrderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStroke, setCurrentStroke] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)
  const animationRef = useRef<number>()
  const { t } = useLanguage()

  const strokes = getStrokeData(kana)

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
  }, [kana, type])

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
        <CardTitle>{t("strokeOrder")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-square w-full rounded-lg border bg-background">
          <canvas ref={canvasRef} width={300} height={300} className="h-full w-full" />
          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-muted-foreground opacity-10">
            {kana}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t("stroke")} {currentStroke + 1} {t("of")} {strokes.length}
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

