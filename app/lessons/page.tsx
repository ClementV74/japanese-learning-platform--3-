import { LessonCatalog } from "@/components/lessons/lesson-catalog"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { RouteGuard } from "@/components/auth/route-guard"

export default function LessonsPage() {
  return (
    <RouteGuard>
      <DashboardShell>
        <DashboardHeader
          heading="Leçons"
          text="Parcourez nos leçons complètes de japonais du niveau débutant à avancé"
        />
        <LessonCatalog />
      </DashboardShell>
    </RouteGuard>
  )
}

