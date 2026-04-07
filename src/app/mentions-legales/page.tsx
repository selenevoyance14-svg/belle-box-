import type { Metadata } from "next";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "Mentions légales | Kado",
  description: "Mentions légales du site Kado — informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header activePage="/mentions-legales" />

      <main className="static-page">
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1>Mentions légales</h1>

          <section className="static-section">
            <h2>Éditeur du site</h2>
            <p>
              Le site <strong>kado-box.fr</strong> est édité par un particulier dans le cadre d&apos;une activité de blogging et d&apos;affiliation.
            </p>
            <p>
              Pour nous contacter : <a href="/contact">page de contact</a>.
            </p>
          </section>

          <section className="static-section">
            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.
            </p>
          </section>

          <section className="static-section">
            <h2>Liens affiliés</h2>
            <p>
              Ce site contient des liens affiliés. En cliquant sur ces liens et en effectuant un achat, nous pouvons percevoir une commission, sans frais supplémentaires pour vous. Cela nous permet de financer le site et de continuer à proposer des comparatifs gratuits.
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
