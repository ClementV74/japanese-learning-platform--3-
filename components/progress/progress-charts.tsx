"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/auth-utils"
import { getUserActivity, getUserStats } from "@/lib/api-service"
import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { useToast } from "@/hooks/use-toast"

export function ProgressCharts() {
  const [weeklyActivity, setWeeklyActivity] = useState([
    { day: "Lun", minutes: 0 },
    { day: "Mar", minutes: 0 },
    { day: "Mer", minutes: 0 },
    { day: "Jeu", minutes: 0 },
    { day: "Ven", minutes: 0 },
    { day: "Sam", minutes: 0 },
    { day: "Dim", minutes: 0 },
  ])
  const [monthlyProgress, setMonthlyProgress] = useState([
    { week: 1, xp: 0 },
    { week: 2, xp: 0 },
    { week: 3, xp: 0 },
    { week: 4, xp: 0 },
  ])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const currentUser = getCurrentUser()

      if (currentUser) {
        try {
          // Récupérer les statistiques et l'activité de l'utilisateur
          const userStats = await getUserStats(currentUser.id)
          const userActivity = await getUserActivity(currentUser.id)

          // Si nous avons des données d'activité, les utiliser pour générer des graphiques
          if (userActivity && userActivity.length > 0) {
            // Traiter les données d'activité pour le graphique d'activité hebdomadaire
            // Initialiser avec des valeurs à 0
            const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
            const weeklyData = days.map((day) => ({ day, minutes: 0 }))

            // Remplir avec les données réelles si disponibles
            userActivity.forEach((activity) => {
              const date = new Date(activity.date)
              const dayIndex = date.getDay() // 0 = dimanche, 1 = lundi, etc.
              const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1 // Ajuster pour que 0 = lundi

              if (weeklyData[adjustedIndex]) {
                weeklyData[adjustedIndex].minutes += activity.duree || 0
              }
            })

            setWeeklyActivity(weeklyData)

            // Générer des données d'XP mensuelles basées sur l'activité réelle
            const now = new Date()
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
            const weeksInMonth = 4
            const monthlyData = Array(weeksInMonth)
              .fill(0)
              .map((_, i) => ({
                week: i + 1,
                xp: 0,
              }))

            userActivity.forEach((activity) => {
              const activityDate = new Date(activity.date)
              // Vérifier si l'activité est dans le mois courant
              if (activityDate >= startOfMonth && activityDate <= now) {
                const dayOfMonth = activityDate.getDate()
                const weekIndex = Math.min(Math.floor(dayOfMonth / 7), weeksInMonth - 1)
                monthlyData[weekIndex].xp += activity.xp || 0
              }
            })

            setMonthlyProgress(monthlyData)
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données d'activité:", error)
          toast({
            title: "Erreur de chargement",
            description: "Impossible de charger vos données d'activité. Veuillez réessayer plus tard.",
            variant: "destructive",
          })
        }
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Graphiques d'activité</CardTitle>
        <CardDescription>Visualisez votre activité d'apprentissage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Activité hebdomadaire</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} minutes`, "Temps d'étude"]}
                  labelFormatter={(label) => label}
                />
                <Bar dataKey="minutes" fill="#ec4899" radius={[4, 4, 0, 0]} background={{ fill: "#f3f4f6" }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">XP mensuel</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="week"
                  label={{
                    value: "Semaine",
                    position: "insideBottomRight",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "XP",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip formatter={(value) => [`${value} XP`, "XP"]} labelFormatter={(label) => `Semaine ${label}`} />
                <Line
                  type="monotone"
                  dataKey="xp"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#8b5cf6" }}
                  activeDot={{ r: 6, fill: "#8b5cf6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

