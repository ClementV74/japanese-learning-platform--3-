import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions Générales d'Utilisation de la plateforme d'apprentissage du japonais",
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Conditions Générales d'Utilisation</h1>

      <div className="prose max-w-none">
        <p className="text-lg mb-6">Dernière mise à jour : 15 mars 2025</p>

        <h2>1. Acceptation des conditions</h2>
        <p>
          En accédant à cette plateforme d'apprentissage du japonais, vous acceptez d'être lié par ces Conditions
          Générales d'Utilisation, toutes les lois et réglementations applicables, et vous acceptez que vous êtes
          responsable du respect des lois locales applicables. Si vous n'acceptez pas l'une de ces conditions, vous êtes
          interdit d'utiliser ou d'accéder à ce site.
        </p>

        <h2>2. Licence d'utilisation</h2>
        <p>
          L'autorisation est accordée de télécharger temporairement une copie des matériaux (informations ou logiciels)
          sur la plateforme d'apprentissage du japonais pour un usage personnel et non commercial transitoire
          uniquement. Il s'agit de l'octroi d'une licence, et non d'un transfert de titre, et sous cette licence, vous
          ne pouvez pas :
        </p>
        <ul>
          <li>modifier ou copier les matériaux;</li>
          <li>
            utiliser les matériaux à des fins commerciales ou pour toute présentation publique (commerciale ou non
            commerciale);
          </li>
          <li>
            tenter de décompiler ou de désosser tout logiciel contenu sur la plateforme d'apprentissage du japonais;
          </li>
          <li>supprimer tout droit d'auteur ou autres notations de propriété des matériaux; ou</li>
          <li>transférer les matériaux à une autre personne ou "miroir" les matériaux sur tout autre serveur.</li>
        </ul>

        <h2>3. Stockage des données</h2>
        <p>
          Nous stockons vos données personnelles et votre progression d'apprentissage sur nos serveurs sécurisés. Ces
          données comprennent, sans s'y limiter :
        </p>
        <ul>
          <li>Informations de compte (nom, email, mot de passe crypté)</li>
          <li>Progression d'apprentissage (leçons terminées, quiz, exercices)</li>
          <li>Statistiques d'utilisation (temps passé, fréquence d'utilisation)</li>
          <li>Préférences utilisateur (paramètres, thème, langue)</li>
        </ul>
        <p>
          Vos données sont stockées aussi longtemps que votre compte reste actif. Vous pouvez demander la suppression de
          vos données à tout moment en contactant notre service client.
        </p>

        <h2>4. Exactitude des matériaux</h2>
        <p>
          Les matériaux apparaissant sur la plateforme d'apprentissage du japonais pourraient inclure des erreurs
          techniques, typographiques ou photographiques. Nous ne garantissons pas que les matériaux de ce site sont
          exacts, complets ou à jour. Nous pouvons modifier les matériaux contenus sur son site à tout moment sans
          préavis.
        </p>

        <h2>5. Liens</h2>
        <p>
          Nous n'avons pas examiné tous les sites liés à son site Internet et n'est pas responsable du contenu de ces
          sites liés. L'inclusion de tout lien n'implique pas l'approbation par nous du site. L'utilisation de tout site
          Web lié est aux risques et périls de l'utilisateur.
        </p>

        <h2>6. Modifications des conditions d'utilisation du site</h2>
        <p>
          Nous pouvons réviser ces conditions d'utilisation de notre site Web à tout moment sans préavis. En utilisant
          ce site, vous acceptez d'être lié par la version alors actuelle de ces conditions d'utilisation.
        </p>

        <h2>7. Loi applicable</h2>
        <p>
          Ces conditions sont régies et interprétées conformément aux lois françaises, et vous vous soumettez
          irrévocablement à la juridiction exclusive des tribunaux de ce pays.
        </p>
      </div>
    </div>
  )
}

