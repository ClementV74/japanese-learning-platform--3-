import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "À propos de nous",
  description: "Découvrez notre plateforme d'apprentissage du japonais",
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">À propos de nous</h1>

        <div className="mb-12">
          <p className="text-xl mb-6">
            Bienvenue sur notre plateforme d'apprentissage du japonais, conçue pour rendre l'apprentissage de cette
            belle langue accessible, amusant et efficace.
          </p>

          <div className="relative h-80 w-full rounded-lg overflow-hidden mb-8">
            <Image src="/placeholder.svg?height=400&width=800" alt="Notre équipe" fill className="object-cover" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Notre mission</h2>
          <p className="mb-6">
            Notre mission est de démocratiser l'apprentissage du japonais en proposant une méthode structurée,
            interactive et adaptée à tous les niveaux. Nous croyons que l'apprentissage d'une langue doit être une
            expérience enrichissante qui ouvre de nouvelles perspectives culturelles et professionnelles.
          </p>

          <h2 className="text-2xl font-bold mb-4">Notre approche pédagogique</h2>
          <p className="mb-6">Notre approche pédagogique repose sur plusieurs piliers :</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2">Apprentissage progressif</h3>
                <p>
                  Nous proposons un parcours d'apprentissage progressif qui vous permet d'acquérir des compétences de
                  manière structurée, des bases jusqu'à un niveau avancé.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2">Interactivité</h3>
                <p>
                  Nos leçons interactives, quiz et exercices pratiques vous permettent de mettre en application ce que
                  vous apprenez immédiatement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2">Gamification</h3>
                <p>
                  Nous utilisons des éléments de jeu comme les récompenses, les badges et les défis pour rendre
                  l'apprentissage plus engageant et motivant.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2">Immersion culturelle</h3>
                <p>
                  Nous intégrons des éléments culturels japonais dans nos leçons pour vous offrir une compréhension plus
                  profonde de la langue dans son contexte.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Notre équipe</h2>
          <p className="mb-8">
            Notre équipe est composée de passionnés de la langue et de la culture japonaises, d'experts en pédagogie et
            de développeurs talentueux. Ensemble, nous travaillons à créer la meilleure expérience d'apprentissage
            possible pour nos utilisateurs.
          </p>

          <div className="flex justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

