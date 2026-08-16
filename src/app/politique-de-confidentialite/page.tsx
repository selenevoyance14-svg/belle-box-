import type { Metadata } from "next";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Kado-Box",
  description: "Données, cookies, publicité Google AdSense et liens Amazon utilisés sur Kado-Box.",
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Header />

      <main className="static-page">
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1>Politique de confidentialité</h1>

          <section className="static-section">
            <h2>Données collectées</h2>
            <p>
              Kado-Box ne propose ni compte utilisateur ni inscription. Si vous
              nous écrivez par email, votre adresse et le contenu du message sont
              utilisés uniquement pour vous répondre et conservés le temps
              nécessaire au traitement de votre demande.
            </p>
          </section>

          <section className="static-section">
            <h2>Publicité Google AdSense et cookies</h2>
            <p>
              Kado-Box utilise Google AdSense pour financer ses contenus. Selon
              votre choix de consentement, Google et ses partenaires peuvent
              utiliser des cookies ou des identifiants afin de diffuser, mesurer
              et limiter la répétition des annonces. Vous pouvez refuser les
              finalités non essentielles dans le message de consentement affiché
              lors de votre première visite.
            </p>
            <p>
              Pour en savoir plus ou contrôler la personnalisation des annonces,
              consultez les <a href="https://policies.google.com/technologies/ads">règles de confidentialité publicitaire de Google</a> et la
              page <a href="https://myadcenter.google.com/">Mon centre d&apos;annonces</a>.
            </p>
          </section>

          <section className="static-section">
            <h2>Liens affiliés et tiers</h2>
            <p>
              Le site contient des liens vers Amazon. Lorsque vous cliquez sur
              ces liens, vous êtes soumis à la politique de confidentialité et
              aux conditions d&apos;Amazon.
            </p>
            <p>
              Amazon peut enregistrer les informations nécessaires à
              l&apos;attribution d&apos;une commission. Cette affiliation ne modifie pas
              le prix payé. Notre fonctionnement est détaillé sur la <a href="/affiliation-amazon">page Affiliation Amazon</a>.
            </p>
          </section>

          <section className="static-section">
            <h2>Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez notamment de droits d&apos;accès,
              de rectification, d&apos;effacement, d&apos;opposition et de limitation.
              Pour les exercer, écrivez à <a href="mailto:bonsplansmania@gmail.com">bonsplansmania@gmail.com</a>.
            </p>
          </section>

          <section className="static-section">
            <h2>Contact</h2>
            <p>
              Pour toute question relative à cette politique, consultez notre <a href="/contact">page de contact</a>.
            </p>
          </section>

          <section className="static-section">
            <h2>Mise à jour</h2>
            <p>Dernière mise à jour : 16 août 2026.</p>
          </section>
        </div>
      </main>
    </>
  );
}
