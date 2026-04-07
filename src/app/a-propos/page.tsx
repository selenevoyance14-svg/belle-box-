/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Heart, Sparkles, Star, Package } from "lucide-react";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "À propos | Kado",
  description:
    "Découvrez Kado, le site de référence pour les avis honnêtes et comparatifs de box beauté en France. Qui sommes-nous et pourquoi nous faire confiance.",
};

export default function AProposPage() {
  return (
    <>
      <Header activePage="/a-propos" />

      <main className="static-page">
        <div className="container" style={{ maxWidth: "720px" }}>
          <h1>À propos de Kado</h1>

          <section className="static-section">
            <div className="static-icon-header">
              <Sparkles size={24} />
              <h2>Notre mission</h2>
            </div>
            <p>
              Kado est né d&apos;un constat simple : choisir sa box beauté, c&apos;est
              un casse-tête. Entre les promesses marketing, les avis sponsorisés
              et les dizaines d&apos;offres disponibles, difficile de s&apos;y retrouver.
            </p>
            <p>
              Notre mission ? Tester, comparer et décrypter chaque box beauté
              avec honnêteté pour t&apos;aider à trouver celle qui te correspond
              vraiment — sans bullshit.
            </p>
          </section>

          <section className="static-section">
            <div className="static-icon-header">
              <Heart size={24} />
              <h2>Qui est derrière Kado ?</h2>
            </div>
            <p>
              Kado, c&apos;est avant tout Nathalie — passionnée de beauté et
              accro aux box depuis des années. Après avoir testé (et regretté)
              un nombre incalculable d&apos;abonnements, elle a décidé de partager
              ses découvertes pour que tu n&apos;aies pas à faire les mêmes erreurs.
            </p>
            <p>
              Chaque mois, elle déballe, teste et note les box avec un seul
              objectif : te donner un avis sincère et utile.
            </p>
          </section>

          <section className="static-section">
            <div className="static-icon-header">
              <Star size={24} />
              <h2>Ce qu&apos;on fait</h2>
            </div>
            <ul className="static-list">
              <li>
                <strong>Tests détaillés</strong> — Chaque box est déballée,
                testée et notée sur des critères objectifs (qualité des
                produits, rapport qualité/prix, originalité).
              </li>
              <li>
                <strong>Comparatifs honnêtes</strong> — On compare les box entre
                elles pour t&apos;aider à choisir celle qui correspond à tes envies
                et ton budget.
              </li>
              <li>
                <strong>Codes promo vérifiés</strong> — On déniche et vérifie
                les meilleurs codes promo pour que tu payes le juste prix.
              </li>
            </ul>
          </section>

          <section className="static-section">
            <div className="static-icon-header">
              <Package size={24} />
              <h2>Transparence</h2>
            </div>
            <p>
              Certains liens présents sur Kado sont des liens affiliés. Cela
              signifie que si tu t&apos;abonnes à une box via notre site, on touche
              une petite commission — sans que ça ne te coûte un centime de plus.
            </p>
            <p>
              Cette commission nous permet de financer nos tests et de garder le
              site 100&nbsp;% gratuit. Elle n&apos;influence jamais nos avis : quand
              une box déçoit, on le dit.
            </p>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <img src="/kado-logo.svg" alt="Kado" className="logo-img" />
              </div>
              <p>
                Unboxing happiness, delivered monthly. Tests honnêtes,
                comparatifs détaillés et codes promo exclusifs sur les box beauté
                depuis 2026.
              </p>
            </div>

            <div>
              <h4>Rubriques</h4>
              <ul className="footer-links">
                <li><a href="/#box-beaute">Box Beauté</a></li>
                <li><a href="/#comparatifs">Comparatifs</a></li>
                <li><a href="/#codes-promo">Codes Promo</a></li>
                <li><a href="/#articles">Derniers Articles</a></li>
              </ul>
            </div>

            <div>
              <h4>Infos</h4>
              <ul className="footer-links">
                <li><a href="/a-propos">À propos</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
              © 2026 Kado — Fait avec <Heart size={14} fill="var(--primary)" color="var(--primary)" /> par Nathalie. Certains liens sont
              des liens affiliés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
