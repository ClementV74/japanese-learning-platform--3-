"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ProfileForm } from "@/components/profile/profile-form"
import { useLanguage } from "@/contexts/language-context"
import { RouteGuard } from "@/components/auth/route-guard"

export default function ProfilePage() {
  const { t } = useLanguage()

  return (
    <RouteGuard>
      <DashboardShell>
        <DashboardHeader heading="Profil" text="Gérez vos informations personnelles" />
        <ProfileForm />
      </DashboardShell>
    </RouteGuard>
  )
}

