"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/auth-utils"
import { getLessonProgress, getLessons } from "@/lib/api-service"

interface RecentLessonsProps {
  className?: string
}

export function RecentLessons({ className }: RecentLessonsProps) {
  // Données initiales à zéro/vides
  const [recentLessons, setRecentLessons] = useState([
    {
      id: 1,
      title: "Aucune leçon récente",
      level: "Débutant",
      lastAccessed: "Jamais",
      progress: 0,
      completed: false,
    },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentLessons = async () => {
      setLoading(true)
      const user = getCurrentUser()

      if (user) {
        try {
          // Récupérer toutes les leçons
          const allLessons = await getLessons()

          // Récupérer la progression des leçons
          const lessonProgress = await getLessonProgress(user.id)

          if (allLessons.length > 0) {
            // Combiner les données des leçons avec leur progression
            const lessonsWithProgress = allLessons.map((lesson) => {
              const progress = lessonProgress.find((p) => p.titre === lesson.title)

              // Déterminer le niveau en fonction de l'ID de la leçon
              let level = "Débutant"
              if (lesson.id > 100 && lesson.id <= 200) {
                level = "Intermédiaire"
              } else if (lesson.id > 200) {
                level = "Avancé"
              }

              return {
                id: lesson.id,
                title: lesson.title,
                level: level,
                lastAccessed: progress ? "Récemment" : "Jamais",
                progress: progress ? Math.round((progress.exercices_faits / (progress.total_exercices || 1)) * 100) : 0,
                completed: progress ? progress.completed === 1 : false,
              }
            })

            // Trier par date d'accès (ici simulé par progression)
            lessonsWithProgress.sort((a, b) => b.progress - a.progress)

            // Prendre les 4 premières leçons
            setRecentLessons(lessonsWithProgress.slice(0, 4))
          } else {
            // Si aucune leçon n'est trouvée
            setRecentLessons([
              {
                id: 1,
                title: "Aucune leçon récente",
                level: "Débutant",
                lastAccessed: "Jamais",
                progress: 0,
                completed: false,
              },
            ])
          }
        } catch (error) {
          console.error("Error fetching recent lessons:", error)
          // En cas d'erreur, afficher un message par défaut
          setRecentLessons([
            {
              id: 1,
              title: "Erreur de chargement",
              level: "Débutant",
              lastAccessed: "Jamais",
              progress: 0,
              completed: false,
            },
          ])
        }
      }

      setLoading(false)
    }

    fetchRecentLessons()
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Leçons récentes</CardTitle>
        <CardDescription>Continuez là où vous vous êtes arrêté</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentLessons.map((lesson) => (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
              <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted">
                <div className="space-y-1">
                  <div className="font-medium">{lesson.title}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{lesson.level}</Badge>
                    <span className="text-xs text-muted-foreground">{lesson.lastAccessed}</span>
                  </div>
                </div>
                <div className="flex h-2 w-16 overflow-hidden rounded-full bg-muted">
                  <div className="bg-primary" style={{ width: `${lesson.progress}%` }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

