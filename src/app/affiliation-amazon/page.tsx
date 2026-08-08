import type { Metadata } from "next";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Affiliation Amazon | Kado Box",
  description: "Transparence sur les liens affiliés Amazon présents sur Kado Box.",
};

export default function AffiliationAmazonPage() {
  return (
    <>
      <Header />
      <main className="static-page">
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1>Affiliation Amazon</h1>
          <section className="static-section">
            <p><strong>En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.</strong></p>
            <p>Les liens vers Amazon sont signalés et utilisent l&apos;identifiant partenaire <code>lebrunnathali-21</code>. Un achat éligible peut rémunérer Kado Box sans modifier le prix payé par le lecteur.</p>
          </section>
          <section className="static-section">
            <h2>Prix et disponibilité</h2>
            <p>Les prix sont récupérés automatiquement auprès d&apos;Amazon et affichés uniquement lorsqu&apos;ils ont été actualisés au cours des dernières 24 heures. Ils peuvent changer à tout moment. Le prix applicable et la disponibilité sont ceux affichés sur Amazon au moment de l&apos;achat.</p>
          </section>
          <section className="static-section">
            <h2>Indépendance éditoriale</h2>
            <p>Les sélections sont organisées par Kado Box. Amazon ne rédige pas les guides et ne valide pas les recommandations.</p>
          </section>
        </div>
      </main>
    </>
  );
}
