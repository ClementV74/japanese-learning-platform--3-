"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserMissions, type Mission } from "@/lib/api-service"
import { useLanguage } from "@/contexts/language-context"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { getCurrentUser } from "@/lib/auth-utils"

interface AchievementsProgressProps {
  className?: string
}

export function AchievementsProgress({ className }: AchievementsProgressProps) {
  const { language } = useLanguage()
  const [achievements, setAchievements] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true)
      const user = getCurrentUser()

      if (user) {
        try {
          const missions = await getUserMissions(user.id)
          if (missions && missions.length > 0) {
            setAchievements(missions)
          } else {
            // Utiliser des récompenses par défaut si aucune n'est disponible
            setAchievements([
              {
                id: "first-lesson",
                name: {
                  fr: "Premier pas",
                  en: "First Step",
                },
                description: {
                  fr: "Terminez votre première leçon",
                  en: "Complete your first lesson",
                },
                icon: "rocket",
                requiredValue: 1,
                currentValue: 0,
                unlocked: false,
                category: "lessons",
                reward: {
                  type: "xp",
                  value: 50,
                },
              },
              {
                id: "lesson-streak-3",
                name: {
                  fr: "Sur la bonne voie",
                  en: "On the Right Track",
                },
                description: {
                  fr: "Complétez des leçons 3 jours de suite",
                  en: "Complete lessons for 3 days in a row",
                },
                icon: "flame",
                requiredValue: 3,
                currentValue: 0,
                unlocked: false,
                category: "streak",
                reward: {
                  type: "badge",
                  value: "streak-3",
                },
              },
            ])
          }
        } catch (error) {
          console.error("Error fetching achievements:", error)
          // Utiliser des récompenses par défaut en cas d'erreur
          setAchievements([
            {
              id: "first-lesson",
              name: {
                fr: "Premier pas",
                en: "First Step",
              },
              description: {
                fr: "Terminez votre première leçon",
                en: "Complete your first lesson",
              },
              icon: "rocket",
              requiredValue: 1,
              currentValue: 0,
              unlocked: false,
              category: "lessons",
              reward: {
                type: "xp",
                value: 50,
              },
            },
          ])
        }
      }

      setLoading(false)
    }

    fetchAchievements()
  }, [])

  // Calculer les statistiques des récompenses
  const totalAchievements = achievements.length || 1 // Éviter la division par zéro
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length
  const inProgressAchievements = achievements.filter((a) => !a.unlocked && a.currentValue > 0).length
  const lockedAchievements = totalAchievements - unlockedAchievements - inProgressAchievements

  const data = [
    { name: language === "fr" ? "Débloqués" : "Unlocked", value: unlockedAchievements || 0 },
    { name: language === "fr" ? "En cours" : "In Progress", value: inProgressAchievements || 0 },
    { name: language === "fr" ? "Verrouillés" : "Locked", value: lockedAchievements || 0 },
  ]

  const COLORS = ["#ec4899", "#8b5cf6", "#94a3b8"]

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{language === "fr" ? "Progression des récompenses" : "Achievement Progress"}</CardTitle>
          <CardDescription>{language === "fr" ? "Chargement..." : "Loading..."}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">
              {language === "fr" ? "Chargement des données..." : "Loading data..."}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{language === "fr" ? "Progression des récompenses" : "Achievement Progress"}</CardTitle>
        <CardDescription>
          {language === "fr"
            ? `${unlockedAchievements} sur ${totalAchievements} récompenses débloquées`
            : `${unlockedAchievements} out of ${totalAchievements} achievements unlocked`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                // Revenir à l'affichage original sans le symbole %
                label={({ name, percent }) => (percent > 0.1 ? `${name} ${(percent * 100).toFixed(0)}` : "")}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} récompenses`, ""]} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

