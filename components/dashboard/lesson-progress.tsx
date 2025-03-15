"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getCurrentUser } from "@/lib/auth-utils"
import { getLessonProgress } from "@/lib/api-service"

interface LessonProgressProps {
  className?: string
}

export function LessonProgress({ className }: LessonProgressProps) {
  // Données initiales à zéro
  const [progressData, setProgressData] = useState([
    { level: "Débutant", progress: 0, total: 20, completed: 0 },
    { level: "Intermédiaire", progress: 0, total: 25, completed: 0 },
    { level: "Avancé", progress: 0, total: 30, completed: 0 },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true)
      const user = getCurrentUser()

      if (user) {
        try {
          // Récupérer la progression des leçons depuis l'API
          const lessonProgress = await getLessonProgress(user.id)

          if (lessonProgress && lessonProgress.length > 0) {
            // Calculer le nombre total de leçons complétées
            const totalCompleted = lessonProgress.filter((lesson) => lesson.completed === 1).length

            // Définir les totaux pour chaque niveau
            const beginnerTotal = 20
            const intermediateTotal = 25
            const advancedTotal = 30

            // Calculer la répartition des leçons complétées par niveau
            // Pour cet exemple, nous supposons que l'utilisateur progresse dans l'ordre
            let remainingLessons = totalCompleted

            // Débutant
            const beginnerCompleted = Math.min(remainingLessons, beginnerTotal)
            const beginnerProgress = beginnerTotal > 0 ? Math.round((beginnerCompleted / beginnerTotal) * 100) : 0
            remainingLessons -= beginnerCompleted

            // Intermédiaire
            const intermediateCompleted = Math.min(remainingLessons, intermediateTotal)
            const intermediateProgress =
              intermediateTotal > 0 ? Math.round((intermediateCompleted / intermediateTotal) * 100) : 0
            remainingLessons -= intermediateCompleted

            // Avancé
            const advancedCompleted = Math.min(remainingLessons, advancedTotal)
            const advancedProgress = advancedTotal > 0 ? Math.round((advancedCompleted / advancedTotal) * 100) : 0

            setProgressData([
              { level: "Débutant", progress: beginnerProgress, total: beginnerTotal, completed: beginnerCompleted },
              {
                level: "Intermédiaire",
                progress: intermediateProgress,
                total: intermediateTotal,
                completed: intermediateCompleted,
              },
              { level: "Avancé", progress: advancedProgress, total: advancedTotal, completed: advancedCompleted },
            ])
          }
        } catch (error) {
          console.error("Error fetching lesson progress:", error)
        }
      }

      setLoading(false)
    }

    fetchProgress()
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Progression des leçons</CardTitle>
        <CardDescription>Suivez votre progression à travers différents niveaux</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progressData.map((level) => (
            <div key={level.level} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{level.level}</div>
                <div className="text-sm text-muted-foreground">
                  {level.completed}/{level.total} leçons
                </div>
              </div>
              <Progress value={level.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

