"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BookOpen, Clock, Flame } from "lucide-react"
import { getCurrentUser } from "@/lib/auth-utils"
import { getUserStats, getLessonProgress, getUserMissions } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"

export function StudyStats() {
  const [stats, setStats] = useState({
    streak: 0,
    totalStudyTime: "0 heures",
    lessonsCompleted: 0,
    achievements: 0,
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const user = getCurrentUser()

      if (user) {
        try {
          // Récupérer les statistiques de l'utilisateur
          const userStats = await getUserStats(user.id)

          // Récupérer la progression des leçons pour compter les leçons complétées
          const lessonProgress = await getLessonProgress(user.id)
          const completedLessons = lessonProgress.filter((lesson) => lesson.completed === 1).length

          // Calculer le nombre d'achievements débloqués
          let achievementsCount = 0
          try {
            const missions = await getUserMissions(user.id)
            achievementsCount = missions.filter((mission) => mission.unlocked).length
          } catch (error) {
            console.error("Erreur lors de la récupération des achievements:", error)
          }

          // Formater le temps d'étude
          const studyHours = userStats.heures_etude || 0
          const formattedTime = studyHours > 0 ? `${studyHours} heure${studyHours > 1 ? "s" : ""}` : "0 heure"

          setStats({
            streak: userStats.serie_actuelle || 0,
            totalStudyTime: formattedTime,
            lessonsCompleted: completedLessons,
            achievements: achievementsCount,
          })
        } catch (error) {
          console.error("Error fetching user stats:", error)
          // En cas d'erreur, afficher un message plus explicite
          toast({
            title: "Erreur de chargement",
            description: "Impossible de charger vos statistiques. Veuillez réessayer plus tard.",
            variant: "destructive",
          })
        }
      }

      setLoading(false)
    }

    fetchStats()
  }, [])

  // Données pour les statistiques
  const statsData = [
    {
      title: "Série d'étude",
      value: loading ? "..." : `${stats.streak} jours`,
      icon: <Flame className="h-4 w-4 text-orange-500" />,
      description: "Continuez !",
    },
    {
      title: "Temps d'étude total",
      value: loading ? "..." : stats.totalStudyTime,
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      description: "Depuis votre inscription",
    },
    {
      title: "Leçons terminées",
      value: loading ? "..." : `${stats.lessonsCompleted}`,
      icon: <BookOpen className="h-4 w-4 text-green-500" />,
      description: "Sur 75 au total",
    },
    {
      title: "Récompenses",
      value: loading ? "..." : `${stats.achievements}`,
      icon: <Award className="h-4 w-4 text-yellow-500" />,
      description: "Débloquées jusqu'à présent",
    },
  ]

  return (
    <>
      {statsData.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

