"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ProgressOverview } from "@/components/progress/progress-overview"
import { ProgressCharts } from "@/components/progress/progress-charts"
import { ProgressDetails } from "@/components/progress/progress-details"
import { RouteGuard } from "@/components/auth/route-guard"

export default function ProgressPage() {
  return (
    <RouteGuard>
      <DashboardShell>
        <DashboardHeader heading="Progression" text="Suivez votre progression dans l'apprentissage du japonais" />
        <ProgressOverview />
        <div className="grid gap-6 md:grid-cols-2">
          <ProgressCharts />
          <ProgressDetails />
        </div>
      </DashboardShell>
    </RouteGuard>
  )
}

