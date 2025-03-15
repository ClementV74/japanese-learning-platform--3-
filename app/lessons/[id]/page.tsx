import { LessonContent } from "@/components/lessons/lesson-content"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { lessonsData } from "@/lib/lessons-data"
import { notFound } from "next/navigation"

interface LessonPageProps {
  params: {
    id: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const lessonId = Number.parseInt(params.id)
  const lesson = lessonsData.find((l) => l.id === lessonId)

  if (!lesson) {
    notFound()
  }

  return (
    <DashboardShell>
      <LessonContent lesson={lesson} />
    </DashboardShell>
  )
}

