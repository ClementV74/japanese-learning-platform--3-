"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/auth-utils"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Trophy } from "lucide-react"
import { getUserStats, getUserActivity } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"

export function ProgressDetails() {
  const [stats, setStats] = useState({
    totalStudyTime: "0 heures",
    streak: 0,
    longestStreak: 0,
    totalXp: 0,
    level: 1,
    nextLevelXp: 500,
    achievements: 0,
    lastActivity: new Date().toLocaleDateString(),
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const currentUser = getCurrentUser()

      if (currentUser) {
        try {
          // Récupérer les statistiques de l'utilisateur
          const userStats = await getUserStats(currentUser.id)

          // Récupérer les activités récentes
          const activities = await getUserActivity(currentUser.id)

          // Formater le temps d'étude
          const studyHours = userStats.heures_etude || 0
          const formattedTime = studyHours > 0 ? `${studyHours} heure${studyHours > 1 ? "s" : ""}` : "0 heure"

          setStats({
            totalStudyTime: formattedTime,
            streak: userStats.serie_actuelle || 0,
            longestStreak: userStats.serie_max || userStats.serie_actuelle || 0,
            totalXp: userStats.xp_total || 0,
            level: userStats.niveau || 1,
            nextLevelXp: (userStats.niveau || 1) * 500,
            achievements: 0, // À remplacer par le nombre réel d'achievements débloqués
            lastActivity: new Date().toISOString(),
          })

          setRecentActivities(activities)
        } catch (error) {
          console.error("Erreur lors de la récupération des statistiques:", error)
          toast({
            title: "Erreur de chargement",
            description: "Impossible de charger vos statistiques détaillées. Veuillez réessayer plus tard.",
            variant: "destructive",
          })
        }
      }

      setLoading(false)
    }

    fetchStats()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression détaillée</CardTitle>
        <CardDescription>Statistiques détaillées de votre progression</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Temps d'étude total</span>
            </div>
            <p className="text-2xl font-bold">{loading ? "..." : stats.totalStudyTime}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1 h-4 w-4" />
              <span>Série actuelle</span>
            </div>
            <p className="text-2xl font-bold">{loading ? "..." : `${stats.streak} jours`}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Trophy className="mr-1 h-4 w-4" />
              <span>Niveau</span>
            </div>
            <p className="text-2xl font-bold">{loading ? "..." : stats.level}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Trophy className="mr-1 h-4 w-4" />
              <span>XP total</span>
            </div>
            <p className="text-2xl font-bold">{loading ? "..." : `${stats.totalXp} XP`}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Activité récente</h3>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Chargement des activités...</div>
            ) : recentActivities.length > 0 ? (
              recentActivities.map((activity: any, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="font-medium">{activity.description || "Activité"}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{activity.type_activite || "Leçon"}</Badge>
                      <span className="text-xs text-muted-foreground">{activity.date_activite || "Récemment"}</span>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-pink-500 to-purple-600">+{activity.xp_gagne || 0} XP</Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">Aucune activité récente</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

