import type { Metadata } from "next";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Mentions légales | Kado-Box",
  description: "Mentions légales de Kado-Box : éditeur, hébergeur, affiliation et responsabilité.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />

      <main className="static-page">
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1>Mentions légales</h1>

          <section className="static-section">
            <h2>Éditeur du site</h2>
            <p>
              Le site <strong>kado-box.fr</strong> est édité par <strong>Nathalie Lebrun</strong>, entrepreneur individuel.
            </p>
            <p>
              Adresse : 524 rue de la Tourrache, 83600 Fréjus, France.<br />
              SIREN : 101 331 585.<br />
              SIRET : 101 331 585 00014.<br />
              Contact : <a href="mailto:bonsplansmania@gmail.com">bonsplansmania@gmail.com</a>.<br />
              Directrice de la publication : Nathalie Lebrun.
            </p>
          </section>

          <section className="static-section">
            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par <strong>Cloudflare, Inc.</strong>, 101 Townsend Street, San Francisco, CA 94107, États-Unis — <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">cloudflare.com</a>.
            </p>
          </section>

          <section className="static-section">
            <h2>Liens affiliés</h2>
            <p>
              <strong>En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.</strong> Les détails sont disponibles sur notre <a href="/affiliation-amazon">page consacrée à l&apos;affiliation Amazon</a>.
            </p>
          </section>

          <section className="static-section">
            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, comparatifs) est protégé par le droit d&apos;auteur. Toute reproduction sans autorisation est interdite.
            </p>
          </section>

          <section className="static-section">
            <h2>Responsabilité</h2>
            <p>
              Les informations publiées sur ce site sont fournies à titre informatif. Nous ne pouvons garantir l&apos;exactitude des prix et offres affichés, susceptibles de changer à tout moment. Nous vous invitons à vérifier les informations directement auprès des marques.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
