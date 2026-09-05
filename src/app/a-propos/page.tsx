import type { Metadata } from "next";
import { Gift, Heart, Search, ShieldCheck } from "lucide-react";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "À propos de Kado-Box",
  description:
    "Kado-Box aide à trouver une idée cadeau utile selon la personne, l’occasion et le budget.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      <Header />
      <main className="static-page">
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1>À propos de Kado-Box</h1>

          <section className="static-section">
            <div className="static-icon-header">
              <Gift size={24} />
              <h2>Notre mission</h2>
            </div>
            <p>
              Trouver un cadeau devient vite compliqué quand on ne connaît pas
              précisément les goûts de la personne. Kado-Box rassemble des idées
              simples à parcourir, classées par occasion, destinataire et budget.
            </p>
          </section>

          <section className="static-section">
            <h2>Qui édite Kado-Box ?</h2>
            <p>
              Kado-Box est édité par Nathalie Lebrun, entrepreneure indépendante basée à
              Fréjus. Chaque guide est relu avant publication et signé afin que vous sachiez
              qui est responsable des conseils proposés.
            </p>
          </section>

          <section className="static-section">
            <div className="static-icon-header">
              <Search size={24} />
              <h2>Comment les idées sont choisies</h2>
            </div>
            <p>
              Nous privilégions les cadeaux compréhensibles, utiles ou plaisants
              à offrir. Les accessoires techniques, consommables et produits sans
              rapport clair avec un cadeau sont écartés de nos sélections.
            </p>
            <p>
              Nous ne testons pas nécessairement chaque produit. Notre sélection repose sur
              la pertinence comme cadeau, les caractéristiques annoncées par le fabricant,
              le niveau et le volume d’avis disponibles, ainsi que le rapport entre l’usage
              attendu et le prix. Une commission potentielle ne décide jamais du classement.
            </p>
            <p>
              Chaque guide est rédigé pour répondre à une situation précise. Nous
              examinons notamment l&apos;usage, le profil du destinataire, le budget,
              les avis disponibles et les contraintes de livraison. Les contenus
              sont revus lorsque les offres ou les besoins saisonniers évoluent.
            </p>
          </section>

          <section className="static-section">
            <div className="static-icon-header">
              <ShieldCheck size={24} />
              <h2>Prix et disponibilité</h2>
            </div>
            <p>
              Les offres peuvent évoluer. Le prix, le délai de livraison et la
              disponibilité affichés par le marchand au moment de la commande
              sont toujours ceux qui font foi.
            </p>
          </section>

          <section className="static-section">
            <div className="static-icon-header">
              <Heart size={24} />
              <h2>Transparence</h2>
            </div>
            <p>
              Certains liens sont affiliés. Si vous achetez après avoir cliqué,
              Kado-Box peut recevoir une commission, sans coût supplémentaire
              pour vous. Le site reste gratuit.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
