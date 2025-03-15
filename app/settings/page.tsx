"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { SettingsForm } from "@/components/settings/settings-form"
import { useLanguage } from "@/contexts/language-context"
import { RouteGuard } from "@/components/auth/route-guard"

export default function SettingsPage() {
  const { t } = useLanguage()

  return (
    <RouteGuard>
      <DashboardShell>
        <DashboardHeader heading="Paramètres" text="Personnalisez votre expérience d'apprentissage" />
        <SettingsForm />
      </DashboardShell>
    </RouteGuard>
  )
}

