"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LessonGrid } from "@/components/lessons/lesson-grid"
import { LessonFilters } from "@/components/lessons/lesson-filters"
import { getLessons, getLessonProgress } from "@/lib/api-service"
import { getCurrentUser } from "@/lib/auth-utils"
import type { Lesson } from "@/lib/api-service"

export function LessonCatalog() {
  const [level, setLevel] = useState<string>("débutant")
  const [category, setCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true)
      try {
        const user = getCurrentUser()

        // Récupérer toutes les leçons
        const allLessons = await getLessons()

        // Ajouter des niveaux fictifs pour les leçons qui n'en ont pas
        const lessonsWithLevels = allLessons.map((lesson, index) => {
          // Déterminer le niveau en fonction de l'ID de la leçon
          let level = "débutant"
          if (lesson.id > 100 && lesson.id <= 200) {
            level = "intermédiaire"
          } else if (lesson.id > 200) {
            level = "avancé"
          }

          // Déterminer la catégorie en fonction de l'ID de la leçon
          let category = "Grammaire"
          if (lesson.id % 7 === 0) category = "Vocabulaire"
          else if (lesson.id % 6 === 0) category = "Conversation"
          else if (lesson.id % 5 === 0) category = "Lecture"
          else if (lesson.id % 4 === 0) category = "Écriture"
          else if (lesson.id % 3 === 0) category = "Culture"
          else if (lesson.id % 2 === 0) category = "Préparation JLPT"

          return {
            ...lesson,
            level,
            category,
          }
        })

        if (user) {
          // Récupérer la progression des leçons
          const progress = await getLessonProgress(user.id)

          // Combiner les leçons avec leur progression
          const lessonsWithProgress = lessonsWithLevels.map((lesson) => {
            const lessonProgress = progress.find((p) => p.titre === lesson.title)

            let progressValue = 0
            if (lessonProgress) {
              // Vérifier que total_exercices n'est pas zéro pour éviter la division par zéro
              if (lessonProgress.total_exercices && lessonProgress.total_exercices > 0) {
                progressValue = Math.round((lessonProgress.exercices_faits / lessonProgress.total_exercices) * 100)
                // S'assurer que la valeur est un nombre valide
                if (isNaN(progressValue) || !isFinite(progressValue)) {
                  progressValue = 0
                }
              } else if (lessonProgress.completed === 1) {
                // Si la leçon est marquée comme complétée mais total_exercices est 0
                progressValue = 100
              }
            }

            return {
              ...lesson,
              progress: progressValue,
            }
          })

          setLessons(lessonsWithProgress)
        } else {
          setLessons(lessonsWithLevels)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des leçons:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  const filteredLessons = lessons.filter((lesson) => {
    // Filtrer par niveau
    if (level && lesson.level !== level) return false

    // Filtrer par catégorie
    if (category && lesson.category !== category) return false

    // Filtrer par terme de recherche
    if (
      searchTerm &&
      !lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <Tabs defaultValue="débutant" className="w-full" onValueChange={setLevel}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="débutant">Débutant</TabsTrigger>
          <TabsTrigger value="intermédiaire">Intermédiaire</TabsTrigger>
          <TabsTrigger value="avancé">Avancé</TabsTrigger>
        </TabsList>
        <TabsContent value={level} className="space-y-6">
          <LessonFilters
            selectedCategory={category}
            onCategoryChange={setCategory}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          <LessonGrid lessons={filteredLessons} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

