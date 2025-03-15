"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getUserMissions, type Mission } from "@/lib/api-service"
import { useLanguage } from "@/contexts/language-context"
import { Award, Book, CheckCircle, Flame, PenTool } from "lucide-react"
import { motion } from "framer-motion"
import { getCurrentUser } from "@/lib/auth-utils"

export function AchievementsList() {
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

  const getAchievementIcon = (category: string) => {
    switch (category) {
      case "lessons":
        return <Book className="h-5 w-5" />
      case "kana":
        return <PenTool className="h-5 w-5" />
      case "kanji":
        return <Book className="h-5 w-5" />
      case "streak":
        return <Flame className="h-5 w-5" />
      case "quiz":
        return <Award className="h-5 w-5" />
      default:
        return <Award className="h-5 w-5" />
    }
  }

  const getRewardText = (reward: { type: string; value: number | string }) => {
    if (reward.type === "xp") {
      return `+${reward.value} XP`
    } else if (reward.type === "badge") {
      return language === "fr" ? "Badge" : "Badge"
    } else if (reward.type === "theme") {
      return language === "fr" ? "Thème" : "Theme"
    }
    return ""
  }

  if (loading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{language === "fr" ? "Récompenses" : "Achievements"}</CardTitle>
          <CardDescription>
            {language === "fr" ? "Chargement des récompenses..." : "Loading achievements..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="rounded-lg border p-4 animate-pulse bg-muted/50">
                  <div className="h-8 w-1/3 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-muted rounded mb-2"></div>
                  <div className="h-2 w-full bg-muted rounded"></div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{language === "fr" ? "Récompenses" : "Achievements"}</CardTitle>
        <CardDescription>
          {language === "fr"
            ? "Suivez vos accomplissements et débloquez des récompenses"
            : "Track your accomplishments and unlock rewards"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`rounded-lg border p-4 ${achievement.unlocked ? "bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-full p-2 ${achievement.unlocked ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : "bg-muted"}`}
                  >
                    {getAchievementIcon(achievement.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{achievement.name[language]}</h3>
                      {achievement.unlocked && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {language === "fr" ? "Débloqué" : "Unlocked"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description[language]}</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>
                          {achievement.currentValue}/{achievement.requiredValue}
                        </span>
                        {achievement.reward && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          >
                            {getRewardText(achievement.reward)}
                          </Badge>
                        )}
                      </div>
                      <Progress
                        value={
                          isNaN(achievement.currentValue / achievement.requiredValue) ||
                          !isFinite(achievement.currentValue / achievement.requiredValue)
                            ? 0
                            : (achievement.currentValue / achievement.requiredValue) * 100
                        }
                        className="h-2"
                        indicatorClassName={achievement.unlocked ? "bg-gradient-to-r from-pink-500 to-purple-600" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

