import type { Metadata } from "next";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Kado",
  description: "Politique de confidentialité du site Kado — comment nous collectons et utilisons vos données personnelles.",
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
              Le site <strong>kado-box.fr</strong> ne collecte aucune donnée personnelle directement. Nous n&apos;utilisons pas de formulaire d&apos;inscription ni de compte utilisateur.
            </p>
          </section>

          <section className="static-section">
            <h2>Cookies et analyse d&apos;audience</h2>
            <p>
              Ce site peut utiliser des outils d&apos;analyse d&apos;audience (comme Google Analytics) pour mesurer notre trafic de façon anonyme. Aucune donnée personnellement identifiable n&apos;est collectée à cette fin.
            </p>
          </section>

          <section className="static-section">
            <h2>Liens affiliés et tiers</h2>
            <p>
              Ce site contient des liens vers des sites tiers (Blissim, Biotyfull, Lookfantastic, etc.). Lorsque vous cliquez sur ces liens, vous êtes soumis à la politique de confidentialité de ces sites. Nous vous invitons à la consulter avant tout achat.
            </p>
            <p>
              Nos partenaires affiliés (Awin, Affilae, Kwanko) peuvent déposer des cookies de suivi sur votre navigateur afin d&apos;attribuer les commissions. Ces cookies n&apos;ont aucun impact sur votre expérience de navigation.
            </p>
          </section>

          <section className="static-section">
            <h2>Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous via notre <a href="/contact">page de contact</a>.
            </p>
          </section>

          <section className="static-section">
            <h2>Contact</h2>
            <p>
              Pour toute question relative à cette politique, rendez-vous sur notre <a href="/contact">page de contact</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
