"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getCurrentUser } from "@/lib/auth-utils"
import { getLessonProgress, getUserStats } from "@/lib/api-service"
import { useState, useEffect } from "react"
import { Award, BookOpen, GraduationCap, Layers } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ProgressOverview() {
  const [progressData, setProgressData] = useState({
    lessons: { completed: 0, total: 30, percent: 0 },
    kana: { completed: 0, total: 92, percent: 0 },
    kanji: { completed: 0, total: 100, percent: 0 },
    quizzes: { completed: 0, total: 20, percent: 0 },
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true)
      const currentUser = getCurrentUser()

      if (currentUser) {
        try {
          // Récupérer les statistiques de l'utilisateur
          const userStats = await getUserStats(currentUser.id)

          // Récupérer la progression des leçons depuis l'API
          const lessonProgress = await getLessonProgress(currentUser.id)

          // Calculer le nombre de leçons complétées
          const completedLessons =
            lessonProgress && lessonProgress.length > 0
              ? lessonProgress.filter((lesson) => lesson.completed === 1).length
              : userStats.lecons_terminees || 0

          // Récupérer les autres statistiques
          const kanaLearned = userStats.kana_appris || 0
          const kanjiLearned = userStats.kanji_appris || 0
          const quizzesTaken = userStats.quiz_completes || 0

          // Calculer les pourcentages de progression en évitant les NaN et Infinity
          const lessonsPercent = Math.min(100, Math.round((completedLessons / 30) * 100)) || 0
          const kanaPercent = Math.min(100, Math.round((kanaLearned / 92) * 100)) || 0
          const kanjiPercent = Math.min(100, Math.round((kanjiLearned / 100) * 100)) || 0
          const quizzesPercent = Math.min(100, Math.round((quizzesTaken / 20) * 100)) || 0

          setProgressData({
            lessons: {
              completed: completedLessons,
              total: 30,
              percent: lessonsPercent,
            },
            kana: {
              completed: kanaLearned,
              total: 92,
              percent: kanaPercent,
            },
            kanji: {
              completed: kanjiLearned,
              total: 100,
              percent: kanjiPercent,
            },
            quizzes: {
              completed: quizzesTaken,
              total: 20,
              percent: quizzesPercent,
            },
          })
        } catch (error) {
          console.error("Erreur lors de la récupération de la progression:", error)
          toast({
            title: "Erreur de chargement",
            description: "Impossible de charger vos statistiques. Veuillez réessayer plus tard.",
            variant: "destructive",
          })
        }
      }

      setLoading(false)
    }

    fetchProgress()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progression d'apprentissage</CardTitle>
        <CardDescription>Votre progression dans les différentes sections</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-pink-500" />
              <span className="font-medium">Leçons</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {progressData.lessons.completed}/{progressData.lessons.total} leçons
            </span>
          </div>
          <Progress
            value={progressData.lessons.percent}
            className="h-2"
            indicatorClassName="bg-gradient-to-r from-pink-500 to-purple-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Layers className="mr-2 h-5 w-5 text-purple-500" />
              <span className="font-medium">Kana</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {progressData.kana.completed}/{progressData.kana.total} caractères
            </span>
          </div>
          <Progress
            value={progressData.kana.percent}
            className="h-2"
            indicatorClassName="bg-gradient-to-r from-purple-500 to-indigo-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-indigo-500" />
              <span className="font-medium">Kanji</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {progressData.kanji.completed}/{progressData.kanji.total} kanji
            </span>
          </div>
          <Progress
            value={progressData.kanji.percent}
            className="h-2"
            indicatorClassName="bg-gradient-to-r from-indigo-500 to-blue-600"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-yellow-500" />
              <span className="font-medium">Quiz</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {progressData.quizzes.completed}/{progressData.quizzes.total} quiz
            </span>
          </div>
          <Progress
            value={progressData.quizzes.percent}
            className="h-2"
            indicatorClassName="bg-gradient-to-r from-yellow-500 to-orange-600"
          />
        </div>
      </CardContent>
    </Card>
  )
}

