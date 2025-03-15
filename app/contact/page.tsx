import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez-nous pour toute question concernant notre plateforme d'apprentissage du japonais",
}

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contactez-nous</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">contact@feegaffe.fr</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Téléphone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">+33 1 23 45 67 89</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Adresse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                123 Rue de l'Apprentissage
                <br />
                75000 Paris, France
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Envoyez-nous un message</h2>
            <p className="mb-6">
              Vous avez des questions, des suggestions ou besoin d'assistance ? N'hésitez pas à nous contacter en
              remplissant le formulaire ci-dessous.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input id="subject" placeholder="Sujet de votre message" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Votre message" rows={5} />
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                Envoyer le message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Foire aux questions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold">
                  Comment puis-je commencer à apprendre le japonais sur votre plateforme ?
                </h3>
                <p className="text-muted-foreground">
                  Il vous suffit de créer un compte gratuit et de suivre notre parcours d'apprentissage recommandé, en
                  commençant par les hiragana et katakana.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Proposez-vous des cours pour tous les niveaux ?</h3>
                <p className="text-muted-foreground">
                  Oui, notre plateforme propose des leçons pour tous les niveaux, du débutant complet jusqu'au niveau
                  avancé (JLPT N1).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Combien de temps faut-il pour apprendre le japonais ?</h3>
                <p className="text-muted-foreground">
                  Cela dépend de votre rythme d'apprentissage et de votre régularité. En général, il faut environ 6 mois
                  pour atteindre un niveau de conversation basique, et 2-3 ans pour une maîtrise avancée.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Puis-je accéder à la plateforme sur mobile ?</h3>
                <p className="text-muted-foreground">
                  Oui, notre plateforme est entièrement responsive et fonctionne sur tous les appareils : ordinateurs,
                  tablettes et smartphones.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold">Proposez-vous des cours en direct avec des professeurs ?</h3>
                <p className="text-muted-foreground">
                  Actuellement, nous proposons uniquement des leçons interactives en ligne. Nous prévoyons d'ajouter des
                  sessions en direct avec des professeurs dans le futur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

