"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock, Play } from "lucide-react"
import { LessonQuiz } from "@/components/lessons/lesson-quiz"
import confetti from "canvas-confetti"

// Importons la nouvelle fonction pour mettre à jour les statistiques globales

// Ajoutons l'import en haut du fichier:
import { updateLessonProgress, updateUserGlobalStats } from "@/lib/api-service"
import { getCurrentUser, setCurrentUser } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"

interface Lesson {
  id: number
  title: string
  description: string
  level: string
  category: string
  duration: string
  progress?: number
  xp?: number
}

interface LessonContentProps {
  lesson: Lesson
}

export function LessonContent({ lesson }: LessonContentProps) {
  const [activeTab, setActiveTab] = useState("content")
  const [progress, setProgress] = useState(lesson.progress || 0)
  const [showCelebration, setShowCelebration] = useState(false)
  const { toast } = useToast()

  // Contenu de leçon fictif - dans une vraie application, cela viendrait d'une base de données ou d'une API
  const lessonContent = {
    introduction: `
      <h2>Introduction à ${lesson.title}</h2>
      <p>Bienvenue dans cette leçon sur ${lesson.title}. Dans cette leçon, vous apprendrez des concepts essentiels qui vous aideront à améliorer vos compétences en langue japonaise.</p>
      <p>À la fin de cette leçon, vous serez capable de :</p>
      <ul>
        <li>Comprendre les concepts clés liés à ${lesson.title}</li>
        <li>Appliquer ce que vous avez appris dans des situations pratiques</li>
        <li>Construire une base pour des sujets plus avancés</li>
      </ul>
    `,
    content: `
      <h2>Contenu principal</h2>
      <p>Ceci est le contenu principal de la leçon. Dans une application réelle, cela contiendrait des explications détaillées, des exemples et des éléments interactifs.</p>
      <div class="my-4 p-4 bg-muted rounded-md">
        <h3>Exemple</h3>
        <p>Voici un exemple de la façon dont ce concept est utilisé en japonais :</p>
        <p class="text-lg font-bold">日本語を勉強しています。</p>
        <p>Nihongo wo benkyou shite imasu.</p>
        <p>J'étudie le japonais.</p>
      </div>
      <p>Analysons cette phrase :</p>
      <ul>
        <li><strong>日本語</strong> (Nihongo) - Langue japonaise</li>
        <li><strong>を</strong> (wo) - Particule d'objet</li>
        <li><strong>勉強しています</strong> (benkyou shite imasu) - suis en train d'étudier</li>
      </ul>
      <p>Ce modèle peut être utilisé avec différents verbes et objets pour créer diverses phrases.</p>
    `,
    practice: `
      <h2>Exercices pratiques</h2>
      <p>Maintenant, pratiquons ce que vous avez appris avec quelques exercices.</p>
      <div class="space-y-6">
        <div class="p-4 border rounded-md">
          <h3 class="font-medium">Exercice 1</h3>
          <p>Complétez les phrases suivantes en utilisant la forme appropriée :</p>
          <div class="mt-2 space-y-2">
            <p>1. わたしは毎日日本語を＿＿＿＿。(étudier)</p>
            <p>2. あなたは何を＿＿＿＿か。(manger)</p>
            <p>3. 彼は今テレビを＿＿＿＿。(regarder)</p>
          </div>
        </div>
        <div class="p-4 border rounded-md">
          <h3 class="font-medium">Exercice 2</h3>
          <p>Traduisez les phrases suivantes en japonais :</p>
          <div class="mt-2 space-y-2">
            <p>1. Je lis des livres tous les jours.</p>
            <p>2. Elle écrit une lettre maintenant.</p>
            <p>3. Nous irons au Japon l'année prochaine.</p>
          </div>
        </div>
      </div>
    `,
    summary: `
      <h2>Résumé</h2>
      <p>Dans cette leçon, vous avez appris à propos de ${lesson.title}. Nous avons couvert :</p>
      <ul>
        <li>Les concepts et modèles de base</li>
        <li>Comment utiliser ces modèles dans des phrases</li>
        <li>Des exemples courants et des scénarios d'utilisation</li>
      </ul>
      <p>Continuez à pratiquer ces concepts pour renforcer votre apprentissage. Dans la prochaine leçon, nous nous appuierons sur ces fondements pour explorer des sujets plus avancés.</p>
    `,
  }

  // Animation de confetti
  const triggerCelebration = () => {
    setShowCelebration(true)

    // Lancer l'animation de confetti
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Lancer des confettis de chaque côté
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    // Masquer la célébration après quelques secondes
    setTimeout(() => {
      setShowCelebration(false)
    }, 5000)
  }

  // Puis modifions à nouveau la fonction handleCompleteLesson pour utiliser cette nouvelle fonction:

  const handleCompleteLesson = async () => {
    setProgress(100)

    // Déclencher l'animation de célébration
    triggerCelebration()

    // Envoyer à l'API que la leçon est terminée
    const user = getCurrentUser()
    if (user) {
      try {
        // Calculer les XP gagnés (utiliser la valeur XP de la leçon ou une valeur par défaut)
        const xpGagne = lesson.xp || 50

        console.log(`Envoi de la complétion de leçon à l'API: ID utilisateur: ${user.id}, ID leçon: ${lesson.id}`)

        // Nombre d'exercices faits (utiliser 10 pour marquer comme complété)
        const exercicesFaits = 10

        // Envoyer la progression à l'API
        const success = await updateLessonProgress(user.id, lesson.id, exercicesFaits, xpGagne)

        if (success) {
          // Mettre à jour les statistiques globales
          await updateUserGlobalStats(user.id, {
            lessonsCompleted: 1,
            xpGained: xpGagne,
            studyTime: 15, // Temps d'étude estimé en minutes
          })

          // Mettre à jour les statistiques locales de l'utilisateur
          const updatedUser = {
            ...user,
            progress: {
              ...user.progress,
              lessonsCompleted: (user.progress.lessonsCompleted || 0) + 1,
              totalXp: (user.progress.totalXp || 0) + xpGagne,
              lastActivity: new Date().toISOString(),
            },
          }

          // Sauvegarder l'utilisateur mis à jour
          setCurrentUser(updatedUser)

          toast({
            title: "Félicitations ! 🎉",
            description: `Vous avez terminé la leçon "${lesson.title}" et gagné ${xpGagne} XP.`,
          })
          console.log("Progression de la leçon mise à jour avec succès")
        } else {
          console.error("Échec de la mise à jour de la progression de la leçon")
          toast({
            title: "Attention",
            description:
              "La leçon est marquée comme terminée, mais nous n'avons pas pu mettre à jour votre progression en ligne.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la progression de la leçon:", error)
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour votre progression.",
          variant: "destructive",
        })
      }
    } else {
      console.error("Aucun utilisateur trouvé, impossible de mettre à jour la progression de la leçon")
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour enregistrer votre progression.",
        variant: "destructive",
      })
    }
  }

  const nextLessonId = lesson.id + 1
  const prevLessonId = lesson.id - 1

  return (
    <div className="space-y-6 relative">
      {/* Overlay de célébration */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md animate-bounce">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Félicitations !
            </h2>
            <p className="text-xl mb-6">
              Vous avez terminé la leçon <strong>{lesson.title}</strong> avec succès !
            </p>
            <Button
              onClick={() => setShowCelebration(false)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Continuer
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="outline">{lesson.level}</Badge>
            <Badge>{lesson.category}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>{lesson.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {prevLessonId > 0 && (
            <Link href={`/lessons/${prevLessonId}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Précédent
              </Button>
            </Link>
          )}
          <Link href={`/lessons/${nextLessonId}`}>
            <Button variant="outline" size="sm">
              Suivant
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progression</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Tabs defaultValue="content" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">
            <BookOpen className="mr-2 h-4 w-4" />
            Leçon
          </TabsTrigger>
          <TabsTrigger value="video">
            <Play className="mr-2 h-4 w-4" />
            Vidéo
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <CheckCircle className="mr-2 h-4 w-4" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lessonContent.introduction }} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lessonContent.content }} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lessonContent.practice }} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lessonContent.summary }} />
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleCompleteLesson}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Marquer comme terminé
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="video">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Play className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-lg font-medium">Leçon vidéo</p>
                    <p className="text-sm text-muted-foreground">
                      Ceci serait une leçon vidéo dans une application réelle
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <LessonQuiz lessonId={lesson.id} onComplete={handleCompleteLesson} />
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardContent className="p-6">
              <div className="min-h-[300px]">
                <h2 className="text-lg font-medium">Vos notes</h2>
                <p className="text-sm text-muted-foreground">
                  Vous pouvez prendre des notes ici pendant l'étude de cette leçon.
                </p>
                <textarea
                  className="mt-4 h-[200px] w-full rounded-md border p-2"
                  placeholder="Tapez vos notes ici..."
                />
                <div className="mt-4 flex justify-end">
                  <Button>Enregistrer les notes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

