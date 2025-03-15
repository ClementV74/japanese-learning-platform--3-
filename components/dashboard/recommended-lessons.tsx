import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecommendedLessonsProps {
  className?: string
}

export function RecommendedLessons({ className }: RecommendedLessonsProps) {
  // Mock data for recommended lessons
  const recommendedLessons = [
    {
      id: 5,
      title: "Basic Adjectives",
      level: "Beginner",
      description: "Learn how to describe things in Japanese",
      duration: "20 min",
      category: "Grammar",
    },
    {
      id: 6,
      title: "Days of the Week",
      level: "Beginner",
      description: "Learn the days of the week in Japanese",
      duration: "15 min",
      category: "Vocabulary",
    },
    {
      id: 7,
      title: "Basic Particles: は and が",
      level: "Beginner",
      description: "Understanding the difference between は and が",
      duration: "25 min",
      category: "Grammar",
    },
    {
      id: 8,
      title: "Common Phrases for Restaurants",
      level: "Beginner",
      description: "Essential phrases for ordering food in Japanese",
      duration: "30 min",
      category: "Conversation",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recommended Lessons</CardTitle>
        <CardDescription>Based on your progress and interests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {recommendedLessons.map((lesson) => (
            <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
              <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
                <div className="aspect-video w-full bg-muted">
                  <div className="flex h-full items-center justify-center bg-primary/10">
                    <span className="text-lg font-bold text-primary">日本語</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{lesson.level}</Badge>
                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                  </div>
                  <h3 className="mt-2 font-semibold">{lesson.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{lesson.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    {lesson.category}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

