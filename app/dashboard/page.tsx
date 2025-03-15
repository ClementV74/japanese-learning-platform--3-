import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { LessonProgress } from "@/components/dashboard/lesson-progress"
import { RecentLessons } from "@/components/dashboard/recent-lessons"
import { StudyStats } from "@/components/dashboard/study-stats"
import { RecommendedLessons } from "@/components/dashboard/recommended-lessons"
import { RouteGuard } from "@/components/auth/route-guard"

export default function DashboardPage() {
  return (
    <RouteGuard>
      <DashboardShell>
        <DashboardHeader
          heading="Tableau de bord"
          text="Suivez votre progression et continuez votre apprentissage du japonais."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StudyStats />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <LessonProgress className="col-span-4" />
          <RecentLessons className="col-span-3" />
        </div>
        <RecommendedLessons />
      </DashboardShell>
    </RouteGuard>
  )
}

