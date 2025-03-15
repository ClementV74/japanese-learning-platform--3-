import { KanjiLearningModule } from "@/components/kanji/kanji-learning-module"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { RouteGuard } from "@/components/auth/route-guard"

export default function KanjiPage() {
  return (
    <RouteGuard>
      <DashboardShell>
        <DashboardHeader
          heading="Apprentissage des Kanji"
          text="Maîtrisez les Kanji japonais avec des exercices interactifs et des animations d'ordre des traits"
        />
        <KanjiLearningModule />
      </DashboardShell>
    </RouteGuard>
  )
}

