"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserMissions, type Mission } from "@/lib/api-service"
import { useLanguage } from "@/contexts/language-context"
import { Award, Book, CheckCircle, Flame, Lock, PenTool } from "lucide-react"
import { motion } from "framer-motion"
import { getCurrentUser } from "@/lib/auth-utils"

interface AchievementsBadgesProps {
  className?: string
}

export function AchievementsBadges({ className }: AchievementsBadgesProps) {
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
                  type: "badge",
                  value: "first-badge",
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
                type: "badge",
                value: "first-badge",
              },
            },
          ])
        }
      }

      setLoading(false)
    }

    fetchAchievements()
  }, [])

  // Filtrer les achievements qui ont des badges comme récompense
  const badgeAchievements = achievements.filter((a) => a.reward && a.reward.type === "badge")

  const getBadgeIcon = (badgeId: string) => {
    if (badgeId.includes("streak")) {
      return <Flame className="h-6 w-6" />
    } else if (badgeId.includes("hiragana") || badgeId.includes("katakana")) {
      return <PenTool className="h-6 w-6" />
    } else if (badgeId.includes("kanji")) {
      return <Book className="h-6 w-6" />
    } else if (badgeId.includes("beginner")) {
      return <CheckCircle className="h-6 w-6" />
    } else {
      return <Award className="h-6 w-6" />
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{language === "fr" ? "Badges" : "Badges"}</CardTitle>
          <CardDescription>{language === "fr" ? "Chargement des badges..." : "Loading badges..."}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border text-center animate-pulse bg-muted/50"
                >
                  <div className="rounded-full p-4 mb-2 bg-muted"></div>
                  <div className="h-4 w-16 bg-muted rounded mb-1"></div>
                  <div className="h-3 w-12 bg-muted rounded"></div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{language === "fr" ? "Badges" : "Badges"}</CardTitle>
        <CardDescription>
          {language === "fr" ? "Badges débloqués pour vos accomplissements" : "Badges unlocked for your achievements"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {badgeAchievements.map((achievement, index) => {
            const badgeId = achievement.reward?.value as string
            const isUnlocked = achievement.unlocked

            return (
              <motion.div
                key={achievement.id}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center ${
                  isUnlocked
                    ? "bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20"
                    : "bg-muted/30"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`rounded-full p-4 mb-2 ${
                    isUnlocked
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isUnlocked ? getBadgeIcon(badgeId) : <Lock className="h-6 w-6" />}
                </div>
                <h3 className="text-sm font-medium">{achievement.name[language]}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {isUnlocked
                    ? language === "fr"
                      ? "Débloqué"
                      : "Unlocked"
                    : language === "fr"
                      ? "Verrouillé"
                      : "Locked"}
                </p>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

