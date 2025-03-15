"use client"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Award } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Lesson {
  id: number
  title: string
  description: string
  level?: string
  category?: string
  duration?: string
  progress?: number
  image?: string
  xp?: number
}

interface LessonGridProps {
  lessons: Lesson[]
  loading?: boolean
}

export function LessonGrid({ lessons, loading = false }: LessonGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Card key={index} className="h-full overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="mt-2 h-6 w-3/4" />
                <Skeleton className="mt-1 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-full" />
                <div className="mt-4 flex items-center">
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-4">
                <div className="flex w-full items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    )
  }

  if (lessons.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-medium">Aucune leçon trouvée</h3>
          <p className="text-sm text-muted-foreground">Essayez d'ajuster vos filtres</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson) => (
        <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
          <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
            <div className="aspect-video w-full bg-muted">
              {lesson.image ? (
                <img
                  src={lesson.image || "/placeholder.svg"}
                  alt={lesson.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-primary/10">
                  <span className="text-lg font-bold text-primary">日本語</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{lesson.level || "Débutant"}</Badge>
                <Badge>{lesson.category || "Grammaire"}</Badge>
              </div>
              <h3 className="mt-2 text-xl font-semibold">{lesson.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{lesson.duration || "20 min"}</span>
              </div>
              {lesson.progress !== undefined && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progression</span>
                    <span>{isNaN(lesson.progress) || !isFinite(lesson.progress) ? "0" : lesson.progress}%</span>
                  </div>
                  <Progress
                    value={isNaN(lesson.progress) || !isFinite(lesson.progress) ? 0 : lesson.progress}
                    className="h-1"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center text-sm">
                  <BookOpen className="mr-1 h-4 w-4" />
                  <span>5 exercices</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="mr-1 h-4 w-4" />
                  <span>{lesson.xp || 50} XP</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

