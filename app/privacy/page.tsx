import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de Confidentialité de la plateforme d'apprentissage du japonais",
}

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>

      <div className="prose max-w-none">
        <p className="text-lg mb-6">Dernière mise à jour : 15 mars 2025</p>

        <h2>1. Introduction</h2>
        <p>
          Nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous
          collectons, utilisons, divulguons, conservons et protégeons vos informations personnelles.
        </p>

        <h2>2. Informations que nous collectons</h2>
        <p>Nous collectons les types d'informations suivants :</p>
        <ul>
          <li>
            <strong>Informations personnelles</strong> : nom, adresse e-mail, et autres informations que vous nous
            fournissez lors de votre inscription.
          </li>
          <li>
            <strong>Données d'utilisation</strong> : informations sur la façon dont vous utilisez notre plateforme, y
            compris les leçons terminées, les quiz effectués, et votre progression d'apprentissage.
          </li>
          <li>
            <strong>Informations techniques</strong> : adresse IP, type de navigateur, appareil utilisé, et autres
            données techniques.
          </li>
        </ul>

        <h2>3. Comment nous utilisons vos informations</h2>
        <p>Nous utilisons vos informations pour :</p>
        <ul>
          <li>Fournir, maintenir et améliorer notre plateforme d'apprentissage</li>
          <li>Personnaliser votre expérience d'apprentissage</li>
          <li>Suivre votre progression et vous fournir des recommandations</li>
          <li>Communiquer avec vous concernant votre compte et les mises à jour de la plateforme</li>
          <li>Analyser l'utilisation de notre plateforme pour améliorer nos services</li>
        </ul>

        <h2>4. Stockage et sécurité des données</h2>
        <p>
          Vos données sont stockées sur des serveurs sécurisés situés en France. Nous mettons en œuvre des mesures de
          sécurité appropriées pour protéger vos informations contre l'accès non autorisé, l'altération, la divulgation
          ou la destruction.
        </p>
        <p>
          Les données sont conservées aussi longtemps que votre compte reste actif. Vous pouvez demander la suppression
          de vos données à tout moment en nous contactant.
        </p>

        <h2>5. Partage de vos informations</h2>
        <p>
          Nous ne vendons pas vos informations personnelles à des tiers. Nous pouvons partager vos informations dans les
          circonstances suivantes :
        </p>
        <ul>
          <li>Avec des fournisseurs de services qui nous aident à exploiter notre plateforme</li>
          <li>Pour se conformer aux obligations légales</li>
          <li>Pour protéger nos droits, notre propriété ou notre sécurité, ou ceux de nos utilisateurs</li>
        </ul>

        <h2>6. Vos droits</h2>
        <p>Vous avez le droit de :</p>
        <ul>
          <li>Accéder aux informations personnelles que nous détenons à votre sujet</li>
          <li>Demander la correction de vos informations personnelles</li>
          <li>Demander la suppression de vos informations personnelles</li>
          <li>Vous opposer au traitement de vos informations personnelles</li>
          <li>Demander la limitation du traitement de vos informations personnelles</li>
          <li>Demander la portabilité de vos informations personnelles</li>
        </ul>

        <h2>7. Cookies et technologies similaires</h2>
        <p>
          Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre
          plateforme, comprendre comment vous utilisez nos services et personnaliser notre contenu.
        </p>

        <h2>8. Modifications de cette politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout
          changement important en publiant la nouvelle politique de confidentialité sur cette page.
        </p>

        <h2>9. Nous contacter</h2>
        <p>Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à :</p>
        <p>
          Email : contact@feegaffe.fr
          <br />
          Adresse : 123 Rue de l'Apprentissage, 75000 Paris, France
        </p>
      </div>
    </div>
  )
}

