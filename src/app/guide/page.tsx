import { GUIDES } from "@/lib/guides";
import { OCCASIONS } from "@/lib/catalog";
import { Menu, ArrowLeft, Clock, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides cadeaux 2026 : nos conseils pour bien offrir | Kado-Box",
  description: "Tous nos guides cadeaux : fête des mères, fête des pères, anniversaire, Noël… Des sélections triées par budget, par âge et par type de personne.",
  alternates: { canonical: "https://kado-box.fr/guide" },
};

export default function GuideIndex() {
  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Kado<span style={{ color: 'var(--primary)' }}>-Box</span>
          </a>
          <nav className="nav">
            {OCCASIONS.slice(0, 4).map((o) => (
              <a key={o.slug} href={`/occasion/${o.slug}`}>{o.name}</a>
            ))}
          </nav>
          <button className="mobile-menu-btn" aria-label="Menu"><Menu size={20} /></button>
        </div>
      </header>

      <section className="static-page">
        <div className="container">
          <a href="/" className="breadcrumb-back">
            <ArrowLeft size={14} /> Retour à l'accueil
          </a>
          <div style={{ maxWidth: "780px", marginBottom: "40px" }}>
            <h1>Nos guides cadeaux</h1>
            <p style={{ fontSize: "1.1rem", color: "var(--muted-text)" }}>
              Choisir un cadeau, ce n'est pas toujours simple. On a écrit des guides courts et concrets pour chaque grande occasion : conseils par âge, par budget, par personnalité.
            </p>
          </div>

          <div className="occasion-grid">
            {GUIDES.map((g) => (
              <a key={g.slug} href={`/guide/${g.slug}`} className="occasion-card">
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.metaDescription}</p>
                  <span className="occasion-count">
                    <Clock size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                    {g.readingMinutes} min de lecture
                  </span>
                </div>
                <ChevronRight size={20} style={{ alignSelf: "center" }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>© 2026 Kado-Box. En tant que Partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
