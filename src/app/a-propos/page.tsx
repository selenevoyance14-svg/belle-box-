import type { Metadata } from "next";
import { Gift, Heart, Search, ShieldCheck } from "lucide-react";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "À propos de Kado-Box",
  description:
    "Kado-Box aide à trouver une idée cadeau utile selon la personne, l’occasion et le budget.",
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
            <div className="static-icon-header">
              <Search size={24} />
              <h2>Comment les idées sont choisies</h2>
            </div>
            <p>
              Nous privilégions les cadeaux compréhensibles, utiles ou plaisants
              à offrir. Les accessoires techniques, consommables et produits sans
              rapport clair avec un cadeau sont écartés de nos sélections.
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
    </>
  );
}
