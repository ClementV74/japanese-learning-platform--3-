"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AchievementsList } from "@/components/achievements/achievements-list"
import { AchievementsProgress } from "@/components/achievements/achievements-progress"
import { AchievementsBadges } from "@/components/achievements/achievements-badges"
import { useLanguage } from "@/contexts/language-context"
import { RouteGuard } from "@/components/auth/route-guard"

export default function AchievementsPage() {
  const { t } = useLanguage()

  return (
    <RouteGuard>
      <DashboardShell>
        <DashboardHeader heading="Récompenses" text="Suivez vos accomplissements et débloquez des badges" />
        <div className="grid gap-6 md:grid-cols-7">
          <AchievementsProgress className="col-span-3" />
          <AchievementsBadges className="col-span-4" />
        </div>
        <AchievementsList />
      </DashboardShell>
    </RouteGuard>
  )
}

