import { KanaLearningModule } from "@/components/kana/kana-learning-module"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { RouteGuard } from "@/components/auth/route-guard"

export default function KanaPage() {
  return (
    <RouteGuard>
      <DashboardShell>
        <DashboardHeader
          heading="Apprentissage des Kana"
          text="Maîtrisez Hiragana et Katakana avec des exercices interactifs"
        />
        <KanaLearningModule />
      </DashboardShell>
    </RouteGuard>
  )
}

